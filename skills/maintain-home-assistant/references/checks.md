# Audit Checks

Check in this order and grade with the skill's severity scale.

## Correctness

- **Repairs:** treat active `automation_unknown_entity_references` and
  `automation_unknown_service_references` as correctness findings. Repairs older
  than the latest changes may be stale; recheck current config or wait for a
  rescan.
- **References:** search automations, scripts, scenes, helpers and dashboards
  for entity IDs and confirm each exists with `ha_get_state` or `ha_get_entity`.
  Verify unusual services and fields with `ha_list_services`. A stale script
  reference matters only if the caller can run.
- **Missing helpers:** recreate one only after confirming its type, name,
  restore behaviour, area, category and icon; if it was renamed, update the
  reference.
- **Runtime errors:** check traces and errors for important automations and
  shared scripts. If calls succeed but behaviour is wrong, check target
  capabilities and state.
- **Triggers and startup:** state and numeric triggers must not rely on entities
  that are persistently `unavailable` or `unknown`. Automations that recover
  state at startup need a startup trigger that cannot fail at startup; others
  should not carry one or claim startup checks.
- **Integrations:** investigate `setup_error`, `setup_retry`, `migration_error`,
  `failed_unload` or repeated log errors. `not_loaded` alone, powered-off
  devices, ignored discovery and deliberately disabled integrations are not
  failures.

Avoid false positives: battery readings can be months old (use report
timestamps), restored entities may still be starting after a restart, a script
state of `off` means idle, and missing traces after a restart do not show a
failure.

## Behaviour

- **Writer conflicts:** map each target to every automation, script and scene
  that writes it. Flag writers that can fight, undo each other or race, such as
  a routine turning off a room in media mode, or sensor-light and override
  automations writing a helper inconsistently.
- **Controllers:** for buttons, remotes and webhooks, compare recent event names
  and timing with blueprint assumptions. Check single, double, hold, release and
  repeat paths, blueprint variables holding previous events, version drift and
  one gesture reaching several domains.
- **Broad targets:** flag area, group or broad-input targets for `light`,
  `cover`, `media_player`, `fan`, `switch`, `climate` and `lock` when they reach
  entities that should not get the command or lack a capability filter.
- **Capabilities:** check generic scripts only send data their targets support,
  such as brightness to on/off lights, positions to open/close covers, presets
  to climate or fans without them, or volume and grouping to simple players.
- **Overrides and persistent modes:** every ON path needs an OFF path. For each
  override, and each Adaptive Lighting manual control, away, guest, media or
  sleep mode, trace who sets, reads and clears it, what happens if the room
  never empties and which routines reset it. Time-based fallbacks suit rooms
  that never empty.
- **Descriptions:** compare each description with its triggers, conditions,
  actions and order, such as claimed resets, clears, guest guards or startup
  checks.
- **Siblings:** compare `mode`, `max` and `max_exceeded` across automations with
  the same blueprint, category or pattern, and compare trigger shape, `for:`
  durations, startup triggers, guest conditions and overrides across related
  rooms. Differences matter only when they change behaviour; check intent first.
- **Blueprints:** a blueprint without a `mode` input may ignore top-level mode.
- **Routines:** cleanup belongs at the end so room automations do not react to
  intermediate state. Check floor and whole-home actions, covers, bulk lights,
  helper resets and guest or sleep conditions.
- **Notifications:** match recipients to intent. Automation-local notify calls
  suit one-off messages, `notify` groups suit simple broadcasts, and scripts
  suit dynamic recipients, per-device data or shared retry and priority. Flag
  maintenance drift when many automations notify one audience separately; flag
  correctness only when an intended recipient misses out or the wrong one is
  notified.
- **Polling and stuck states:** `time_pattern` is a warning only when a state
  trigger would do. Entities unchanged since boot may never have reported.
  Groups can briefly disagree with members; investigate only with a symptom or a
  consumer of the aggregate.

## Organisation

Judge against the home's own established policy, so a fixed item stays fixed.

- **Areas and floors:** room-scoped objects need areas only when the home uses
  area targeting or filtering. Functional areas (Home, Network, Homelab,
  Portable) may have no floor. Whole-home entities may use a functional Home
  area so generated dashboards show them. Flag a missing floor only where the
  home's policy assigns floors to real areas.
- **Categories and labels:** categories are per scope and optional. Where used,
  look at categories with 30+ or one or two members, same-purpose items split up
  and clear uncategorised groups. Zero labels is fine without a label workflow.
- **Generated dashboards:** visibility depends on domain exclusions,
  `entity_category`, `hidden_by`, `disabled_by`, availability, device
  association and effective area (entity, then device). Unhidden is not visible.
  Prefer registry organisation to manual cards when the user wants automatic
  dashboards, and say whether a check was filter-based or visual.
- **Visibility:** hidden is not bad. Usual policy: hide automation-only scripts
  and room controller automations; show manually run scripts and user routines.
  Config and diagnostic entities may already be excluded. Flag only inconsistent
  siblings or hiding that blocks intended use.
- **Icons:** a local polish policy. Flag missing icons on user-facing items only
  if the home wants them, and inconsistent or contradictory icons.
- **Voice exposure:** check with `ha_get_entity_exposure`; registry metadata
  does not show it. Flag stale, duplicate, hidden, sensitive or unexpected
  exposure.
- **Names:** entity IDs are stable lower snake case with the room when useful;
  do not rename for looks. Friendly names avoid room prefixes the UI already
  shows. An ID and name mismatch may be an incomplete rename; check references
  and intent first. Flag integration titles that are GUIDs or hashes, not model
  or firmware suffixes like `P110M` or `v2`. Diverging helper storage IDs or
  names are cosmetic unless references break; fix names with
  `ha_config_set_helper(action="update", ...)`.
- **Recreate entity IDs:** if the home uses it, hand-set IDs must match what it
  would generate. It uses the integration-side device name (Zigbee2MQTT friendly
  name, WLED name, Powercalc name), not the user-set name; device-less entities
  get the area prefix. Put the room in the integration-side name and keep the
  short name user-set. MQTT entities keep their first discovered ID, so rename
  Zigbee2MQTT devices with `homeassistant_rename: true`.
- **Ordering:** a maintenance preference, never correctness. Group triggers by
  urgency or duration and sort same-duration entities alphabetically; keep
  one-to-one `choose` branches in trigger ID order; keep blueprint inputs in the
  blueprint's order. Inputs equal to blueprint defaults can go unless they state
  local policy.
- **Helper defaults:** flag redundant values such as `mode: "slider"`, `restore:
  true` on counters or `step: 1` only after checking the installed defaults.
  `initial: false` on an `input_boolean` is not redundant: it forces the startup
  state.
- **Bloat:** flag high-frequency sensors that are unused or duplicated, buttons
  that duplicate others or belong to removed devices, wrappers with no consumer,
  near-duplicate automations whose differences are accidental, and disabled
  automations with stale references, newer duplicates or unsafe behaviour if
  enabled. Intentional per-room patterns and parked automations are fine.
- **Duplicate cameras and media:** compare provider, `supported_features` and
  consumers. Live and snapshot cameras differ; keep required motion entities.
  Disabling HA audio entities does not mute microphones or stop recording. Do
  not enable parked alternate players wholesale.
- **Orphans and removals:** a helper or config entry with no entity is a
  deletion candidate, not safe to delete. After an authorised removal, check its
  integrations, helpers, automations, blueprints, dashboard resources and
  metadata for leftovers; keep shared resources and parked alternatives in use.
