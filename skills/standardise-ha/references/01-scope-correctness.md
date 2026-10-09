# Scope & Critical Correctness

## 1. Baseline Inventory

Examples depend on the installed tool version. Discover current schemas and inspect
partial results and errors before treating an inventory as complete.

Collect all relevant entities and follow pagination with `has_more` and
`next_offset`; do not assume one page is complete.

```python
ha_search(domain_filter="automation", limit=200)
ha_search(domain_filter="script", limit=200)
ha_config_get_scene(limit=100)
ha_search(domain_filter="counter", limit=200)
ha_search(domain_filter="input_boolean", limit=200)
ha_search(domain_filter="input_button", limit=200)
ha_search(domain_filter="input_datetime", limit=200)
ha_search(domain_filter="input_number", limit=200)
ha_search(domain_filter="input_select", limit=200)
ha_search(domain_filter="input_text", limit=200)
ha_search(domain_filter="schedule", limit=200)
ha_search(domain_filter="timer", limit=200)
```

Prefer `ha_config_list_helpers(helper_type="all", limit=200)` when supported,
following pagination. Otherwise enumerate storage and Config Entry helpers:

```python
ha_config_list_helpers(helper_type="counter")
ha_config_list_helpers(helper_type="input_boolean")
ha_config_list_helpers(helper_type="input_button")
ha_config_list_helpers(helper_type="input_datetime")
ha_config_list_helpers(helper_type="input_number")
ha_config_list_helpers(helper_type="input_select")
ha_config_list_helpers(helper_type="input_text")
ha_config_list_helpers(helper_type="person")
ha_config_list_helpers(helper_type="schedule")
ha_config_list_helpers(helper_type="tag")
ha_config_list_helpers(helper_type="timer")
ha_config_list_helpers(helper_type="zone")

ha_get_integration(domain="group")
ha_get_integration(domain="min_max")
ha_get_integration(domain="switch_as_x")
ha_get_integration(domain="template")
ha_get_integration(domain="threshold")
ha_get_integration(domain="tod")
ha_get_integration(domain="utility_meter")
```

Collect organisation and system health:

```python
ha_config_get_category(scope="automation")
ha_config_get_category(scope="helpers")
ha_config_get_category(scope="scene")
ha_config_get_category(scope="script")
ha_config_get_label()
ha_list_floors_areas()
ha_config_get_dashboard(list_only=True)
ha_get_integration()
ha_get_system_health(include="repairs")
ha_get_overview(detail_level="minimal", fields=["system_info", "repairs", "notifications"])
```

## Active Repairs & Spook Issues

Run before starting and after every fix batch:

```python
ha_get_system_health(include="repairs")
```

Treat active broken-reference repairs as correctness findings:

- `automation_unknown_entity_references`: missing entity in config.
- `automation_unknown_service_references`: invalid service or stale script
  reference.

Repairs created before the latest changes may be stale. Verify with current
config and wait for a rescan when needed.

## Avoid False Positives

- A configured battery reading can be months old. Use report timestamps and
  device availability rather than treating cached data as fresh.
- A restored entity immediately after restart may still be initialising. Recheck
  after startup and confirm its owner before calling it stale or deleting it.
- A script state of off means idle, not disabled. Some trace tool hints get this
  wrong. Missing traces after restart do not prove failed execution.

## Broken References

Search automation, script, scene, helper, and dashboard configs for entity IDs.
Verify referenced entities exist with `ha_get_state` or `ha_get_entity`.

```python
ha_search(query="<entity_id>")
ha_get_state(entity_id="<entity_id>")
```

Severity:

- Critical if the missing entity blocks safety, security, leak, lock, alarm,
  presence, backup, or critical notification behaviour.
- High if it breaks a room workflow or routine.
- Medium if it is cosmetic, dashboard-only, or a duplicated optional target.

Verify unusual services against available services:

```python
ha_list_services(detail_level="summary", domain="<domain>")
```

Invalid service names are correctness findings. Stale script references are
correctness findings if the caller can run.

## Missing Helper Dependencies

Search automation and script configs for helper entity references and verify
existence.

```python
ha_search(query="input_")
```

If a helper is missing:

- Do not create helpers without confirming intended type, area, category, and
  restore semantics.
- Recreate it only if the intended type, name, restore behaviour, area,
  category, and icon are clear.
- Update the automation/script reference if the helper was renamed.

## Runtime Errors & Failed Traces

Check recent traces for important automations and shared scripts:

```python
ha_get_automation_traces(automation_id="automation.example", limit=10)
ha_get_automation_traces(automation_id="script.example", limit=10)
ha_get_logs(level="ERROR", limit=50, search="automation", source="system")
ha_get_logs(level="ERROR", limit=50, search="script", source="system")
```

Prioritise errors over style issues. If traces show service calls succeed but
behaviour is wrong, inspect target capabilities and runtime state.

## Unavailable Triggers & Startup Recovery

For state/numeric triggers and conditions, verify the entity is not
persistently `unavailable` or `unknown`.

```python
ha_get_state(entity_id="<trigger_entity_id>")
ha_get_history(entity_ids="<trigger_entity_id>", limit=100, start_time="24h")
```

Automations that recover state at startup must have a startup trigger and must
not fail during startup. Automations that do not need recovery should not carry
startup triggers or descriptions claiming startup checks.

```python
ha_search(query="homeassistant")
ha_get_logs(limit=20, search="Home Assistant started", source="logbook")
```
