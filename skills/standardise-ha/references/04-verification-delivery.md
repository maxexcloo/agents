# Verification, Delivery, & Tool Patterns

## 1. Before Changes

For every proposed edit:

1. Fetch current config and `config_hash`.
2. Identify exact behaviour being changed.
3. Search references.
4. Check relevant state/trace/log evidence.
5. Check existing authorisation for the concrete scope. Ask only when intent
   or authorisation is missing; do not repeat an already answered question.

```python
ha_config_get_automation(identifier="...")
ha_config_get_script(script_id="...")
ha_config_get_scene(query="...")
ha_config_get_dashboard(url_path="...")
```

## 2. After Changes

Run the narrowest validation that proves the change:

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

## 3. After Deletes Or Renames

Verify:

- Dashboards still load.
- Expected entities exist.
- No active Repairs.
- No broken references.
- Removed entity no longer appears.
- Voice exposure did not accidentally change.

## 4. Close the Batch

Review the original scope once after the last change. Use the global completion
criteria and report **Done**, **Waiting** or **Blocked**, including required checks
that could not run. Accepted risks, expected outages and optional cleanup do not
reopen the batch. A clean audit can finish without changes or an inventory dump.

## Coverage & Evidence

State what was checked, what was excluded and what remains uncertain. Report
validation, saved configuration and live behaviour separately. Do not claim a
ten-minute trigger was exercised merely because its template rendered. Keep
applied results distinct from historical proposals and prepared diffs.

## Delivery Format

Findings should lead. Use severity buckets appropriate to actual impact:

1. **Critical**: active Repairs, broken references affecting critical
   services, safety/security failures.
2. **High**: missing entities/helpers in active workflows, descriptions
   that demonstrably mislead consequential behaviour, writer conflicts likely to cause wrong
   behaviour.
3. **Medium**: inconsistent modes, missing reset paths, unsupported capability
   calls, duplicated logic with drift.
4. **Low**: naming, icons, categories, labels, ordering, redundant defaults.
5. **Warnings / questions**: suspicious patterns that need user intent.

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
