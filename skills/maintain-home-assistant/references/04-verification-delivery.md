# Verification, Delivery, & Tool Patterns

## 1. Before Changes

For every proposed edit:

1. Fetch current config and `config_hash`.
2. Identify exact behaviour being changed.
3. Search references.
4. Check relevant state/trace/log evidence.
5. Check existing authorisation for the concrete scope. Ask only when intent
   or authorisation is missing; do not repeat an already answered question.
6. Record the affected workflow's expected behaviour and current evidence. For
   cleanup, preserve its behaviour unless a change is requested. Identify the
   trigger, conditions, helper state and expected actions needed for a before/after
   comparison.

```python
ha_config_get_automation(identifier="...")
ha_config_get_script(script_id="...")
ha_config_get_scene(query="...")
ha_config_get_dashboard(url_path="...")
```

## 2. After Changes

Validate configuration and references, then verify the affected behavioural
scenarios against the baseline. A successful configuration check or template
render does not exercise a trigger, controller gesture or delayed reset.

```python
ha_get_system_health(include="config_check")
ha_get_system_health(include="repairs")
ha_get_automation_traces(automation_id="automation.example", limit=5)
ha_get_state(entity_id="<target_entity>")
```

For automations/scripts with changed references, search for the old reference:

```python
ha_search(query="<old_name_or_id>")
```

Exercise only relevant scenarios within the existing authorisation:

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
- No broken references in affected consumers.
- Removed entity no longer appears.
- Voice exposure did not accidentally change.

## Coverage & Evidence

State what was checked, what was excluded and what remains uncertain. Report
validation, saved configuration and live behaviour separately. Do not claim a
ten-minute trigger was exercised merely because its template rendered. Keep
applied results distinct from historical proposals and prepared diffs.

## Delivery Format

Findings should lead. Use the classes and severity defined in
[Finding Classification](00-operating-rules.md#finding-classification).

For every finding include:

- Entity/config name.
- Evidence: config line/field, trace, state, repair, or log.
- Practical impact.
- Proposed fix.
- Whether it is correctness, risk, maintenance, or cosmetic.

Do not bury important findings in a long inventory dump.

## Tool Patterns

- Prefer native triggers, conditions, helpers, and service calls over
  templates.
- Search stored dashboards separately with `ha_config_get_dashboard(mode="search",
query="...")`; inspect scenes, helper options and area sensor references too.
- Use `ha_config_get_*` before editing config.
- Use `ha_config_set_*` with `config_hash` for edits.
- Use `ha_get_automation_traces` for runtime behaviour.
- Use `ha_get_entity` for registry metadata.
- Use `ha_get_history` when behaviour depends on timing or stale state.
- Use `ha_get_state` for runtime state and capabilities.
- Use `ha_get_system_health(include="config_check")` after config changes.
- Use `ha_search` for broad discovery and automation/script references.
- Use `ha_set_entity` for metadata: area, hidden, icon, labels, categories,
  display name, entity ID rename, and voice exposure.
- Use templates deliberately in shared generic scripts, message text, and
  dynamic service data.
