# Verification, Delivery, & Tool Patterns

## 1. Before Changes

For every proposed edit:

1. Fetch current config and use `config_hash` wherever the API supports it.
   Registry edits have no hash: save the inverse and edit narrowly.
2. Identify exact behaviour being changed.
3. Search references.
4. Check relevant state/trace/log evidence.
5. Record the affected workflow's expected behaviour and current evidence. For
   cleanup, preserve its behaviour unless a change is requested. Identify the
   trigger, conditions, helper state and expected actions needed for a before/after
   comparison.

## 2. After Changes

Read back saved changes. For configuration changes, validate configuration and
references, then verify the affected behavioural scenarios against the baseline.
Metadata-only edits do not require restarts or unrelated validation. A successful
configuration check or template render does not exercise a trigger, controller
gesture or delayed reset.

For changed or removed references, search affected consumers for the old reference
using entity boundaries, not substring matches.

Exercise only relevant scenarios:

1. **Controller Gestures:** Compare the affected single, double, hold and release
   events with their traces and resulting actions. Check for duplicate actions.
2. **Overrides:** Check normal operation, override activation, bypass behaviour
   and the return to automatic operation.
3. **Resets:** Check both entry and exit paths, including delay, cancellation and
   re-entry when those affect the workflow.
4. **Startup:** Verify intended helper restoration and startup recovery when a
   relevant restart occurs. Do not restart solely to validate cosmetic changes.
5. **Triggers & Timing:** Verify the original trigger and its conditions, including
   sustained states or thresholds and delayed actions. Running actions manually
   does not verify that the trigger can fire.

Record which scenarios were observed, checked statically or remain unverified.
If a regression appears, compare with the baseline and restore or fix the
affected behaviour before claiming resolution. Do not expand verification into
unrelated rooms or automations.

## 3. After Deletes or Renames

Verify:

- Dashboards still load.
- Expected entities exist.
- No new or affected active Repairs.
- Removed entity no longer appears.
- Voice exposure did not accidentally change.

## Coverage & Evidence

State what was checked, what was excluded and what remains uncertain. Report
validation, saved configuration and live behaviour separately. Do not claim a
ten-minute trigger was exercised merely because its template rendered. Keep
applied results distinct from historical proposals and prepared diffs.

## Delivery Format

Findings lead, classified and graded per
[Finding Classification](00-operating-rules.md#finding-classification). Name the
entity or configuration and cite the config field, trace, state, repair or log.
Do not bury important findings in a long inventory dump.

## Tool Patterns

- Search stored dashboards separately with `ha_config_get_dashboard(mode="search",
  query="...")`; inspect scenes, helper options and area sensor references too.
- Use `ha_get_automation_traces` for runtime behaviour.
- Use `ha_get_entity` for registry metadata.
- Use `ha_get_history` when behaviour depends on timing or stale state.
- Use `ha_get_state` for runtime state and capabilities.
- Use `ha_get_system_health(include="config_check")` after config changes.
- Use `ha_search` for broad discovery and automation/script references.
- Use `ha_set_entity` for metadata: area, hidden, icon, labels, categories,
  display name, entity ID rename, and voice exposure.
