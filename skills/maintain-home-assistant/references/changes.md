# Changes & Verification

## Before Changes

1. Fetch current config and use `config_hash` where supported. Registry edits
   have no hash: save the inverse and edit narrowly.
2. Note the exact behaviour changing and the affected workflow's trigger,
   conditions, helper state and expected actions, for a before and after
   comparison. Cleanup preserves behaviour unless a change is requested.
3. Search references and check relevant state, trace and log evidence.

## Deletions

Confirm the object and its owner, then check automations, scripts, scenes,
helpers, dashboards, labels, registry metadata, voice exposure, areas, devices
and Config Entry relationships. Also weigh external use: Node-RED, app widgets,
voice assistants, external dashboards, manual use and recorder history.

## Renames

Follow the best-practices safe-refactoring workflow, plus:

- Check areas' explicit `temperature_entity_id` and `humidity_entity_id`.
- Confirm the tools can update every consumer before renaming; a missing tool
  field is a limitation, not proof the reference updates itself.
- Display-name and helper `name` changes can regenerate entity IDs (such as an
  area-prefixed `home_home_*`): treat them as renames and read back the ID.
- A rename passes through `unavailable`, so state triggers without `from:` fire;
  check consumers for non-idempotent actions first.

## After Changes

Read back saved changes. For configuration, check with
`ha_get_system_health(include="config_check")`, then search consumers for old
references using entity boundaries, not substrings. Metadata-only edits need no
restart or unrelated validation. A passing config check or template render does
not exercise a trigger, gesture or delayed reset.

Exercise only the relevant scenarios:

1. **Controller gestures:** single, double, hold and release against traces and
   actions, with no duplicates.
2. **Overrides:** normal operation, activation, bypass and return to automatic.
3. **Resets:** entry and exit, with delay, cancellation and re-entry where they
   matter.
4. **Startup:** helper restoration and recovery when a relevant restart happens;
   never restart only for cosmetic changes.
5. **Triggers & timing:** the real trigger with its sustained states, thresholds
   and delays. Running actions manually does not show the trigger fires.

After deletes or renames, confirm dashboards load, expected entities exist,
removed ones are gone, no Repairs appeared and voice exposure did not change.

If a regression appears, restore or fix it before claiming success, and do not
widen verification to unrelated rooms. Report which scenarios were observed,
checked statically or left unverified, and keep applied changes separate from
proposals.

## Tools

- `ha_config_get_dashboard(mode="search", query=...)` for stored dashboards;
  check scenes, helper options and area sensor references too.
- `ha_get_automation_traces` for runtime behaviour, `ha_get_history` for timing
  and stale state, `ha_get_state` for state and capabilities, `ha_get_entity`
  for registry metadata and `ha_search` for broad discovery.
- `ha_set_entity` for area, hidden, icon, labels, categories, display name,
  entity ID and voice exposure.
