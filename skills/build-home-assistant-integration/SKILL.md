---
name: build-home-assistant-integration
description: Develop, test and release custom Home Assistant integrations distributed through HACS, covering config flows, coordinators, entities, recorder statistics, version pins and releases. Exclude operating, auditing or configuring a live Home Assistant instance.
---

# Build Home Assistant Integrations

Read the repository's `AGENTS.md`, `manifest.json`, `hacs.json` and tests first.
Follow current Home Assistant developer documentation for the pinned version;
check deprecations in its release notes before adopting or removing a pattern.

## Setup & Coordinator

- Store per-entry objects in `entry.runtime_data` rather than `hass.data`.
- Pass `config_entry=entry` to `DataUpdateCoordinator`.
- Derive config entry, device and entity unique IDs from stable source
  identifiers through one shared helper. Never use display names, hosts that can
  change or list positions. Changing an ID requires a registry migration in
  code; describe upgrades only in release notes.

## Config Flows

- Set the unique ID with `async_set_unique_id` and abort duplicates with
  `_abort_if_unique_id_configured`. Finish reauthentication and reconfigure
  steps with `async_update_reload_and_abort`, checking
  `_abort_if_unique_id_mismatch` unless the step deliberately changes identity.
- Share connection validation between user, reauthentication, reconfigure and
  options steps.
- Test flow paths that risk data loss or block reauthentication.

## Entities

- Set `_attr_has_entity_name = True` and a `translation_key`. Keep names and
  state labels in `translations/en.json` and icons in `icons.json`, not in code.
- Mark versions, uptime, counts and other supporting values with
  `EntityCategory.DIAGNOSTIC`.
- For `SensorDeviceClass.ENUM`, declare every `options` value with a translated
  state and map unknown source values to `None`; an unlisted state is an error.
- Choose `state_class` by meaning: `MEASUREMENT` for instantaneous values,
  `TOTAL` or `TOTAL_INCREASING` for cumulative ones, none for text, ENUM,
  timestamps or values that should not have long-term statistics. Check the
  device class's allowed state classes and units.

## Recorder Statistics

- Import external statistics with a domain-prefixed `statistic_id` and the
  metadata fields the pinned version requires.
- Continue sums from `get_last_statistics` run through the recorder executor.
  Never replace existing history with incomplete or failed replacement data.
- Meet such invariants with the smallest mechanism; add no recovery path for a
  state the user can fix with an existing action.
- Test rebuilds and partial failures against recorder fixtures.

## Pins & Checks

- Keep the minimum Home Assistant version in `hacs.json` and the README's
  `Requires Home Assistant` line, the `pytest-homeassistant-custom-component` pin
  in test requirements, the Python version used by tests and `manifest.json`
  requirements consistent; update them together. The shared
  `renovate/home-assistant.json5` preset raises the version pins in one grouped
  update.
- Run `mise run check`. CI also runs HACS and Hassfest validation; required CI
  must pass for the release revision.

## Release

1. Bump `version` in `manifest.json` in a release commit.
2. Tag the commit `v<version>` and push the tag.
3. Create the GitHub release with `gh release create v<version>`, stating the
   minimum Home Assistant version, user-visible changes and the verification
   performed, including any live behaviour that was not exercised.
