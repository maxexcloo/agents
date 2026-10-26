# Changes & Verification

## Before Changes

1. Fetch current config and use `config_hash` where supported. Registry edits
   have no hash: save the inverse and edit narrowly.
2. Note the exact behaviour changing and the affected workflow's trigger,
   conditions, helper state and expected actions, for a before and after
   comparison. Cleanup preserves behaviour unless a change is requested.
3. Search references and check relevant state, trace and log evidence.

## Deletions

Confirm the object and its owner, then check every internal consumer and
relationship, and weigh use Home Assistant cannot see: external tools,
dashboards, voice assistants, manual use and history.

## Renames

Follow the best-practices safe-refactoring workflow, plus:

- Include references held in registry settings, such as an area's chosen
  sensors.
- Confirm the tools can update every consumer before renaming; a missing tool
  field is a limitation, not proof the reference updates itself.
- Any name change can regenerate entity IDs: treat it as a rename and read back
  the ID.
- A rename briefly makes the entity unavailable, which fires loosely written
  state triggers; check consumers for actions that must not repeat.

## After Changes

Read back saved changes. For configuration, check with
`ha_get_system_health(include="config_check")`, then search consumers for old
references using entity boundaries, not substrings. Metadata-only edits need no
restart or unrelated validation. A passing config check or template render does
not exercise a trigger, gesture or delayed reset.

Exercise only the affected scenarios, through their real triggers and timing:
every path into and out of the changed behaviour, with no duplicate actions.
Running actions manually does not show a trigger fires. Never restart only for
cosmetic changes.

After deletes or renames, confirm consumers still load, removed objects are
gone and no new Repairs or exposure changes appeared.

If a regression appears, restore or fix it before claiming success, and do not
widen verification to unrelated rooms. Report which scenarios were observed,
checked statically or left unverified, and keep applied changes separate from
proposals.

## Tools

- `ha_config_get_dashboard(query=...)` for stored dashboards;
  check scenes, helper options and area sensor references too.
- `ha_get_automation_traces` for runtime behaviour, `ha_get_history` for timing
  and stale state, `ha_get_state` for state and capabilities, `ha_get_entity`
  for registry metadata and `ha_search` for broad discovery.
- `ha_set_entity` for area, hidden, icon, labels, categories, display name,
  entity ID and voice exposure.
