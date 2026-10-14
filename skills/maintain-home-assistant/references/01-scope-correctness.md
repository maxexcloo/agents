# Scope & Critical Correctness

## 1. Baseline Inventory

Tool fields depend on the installed version. Discover current schemas and inspect
partial results and errors before treating an inventory as complete.

Collect all relevant entities and follow pagination with `has_more` and
`next_offset`; do not assume one page is complete.

Prefer `ha_config_list_helpers(helper_type="all", limit=200)` when supported,
following pagination. Otherwise enumerate storage and Config Entry helpers.
Cover counter, input helpers, person, schedule, tag, timer and zone objects, plus
Config Entry helpers such as groups, min/max, templates, thresholds, time-of-day,
switch-as-X and utility meters. State searches alone can miss stored helpers.

Collect relevant areas, floors, categories, labels, dashboards, integrations and
Repairs through their configuration or registry endpoints.

## Active Repairs & Spook Issues

Check Repairs before starting and after the fix batch with
`ha_get_system_health(include="repairs")`.

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

Grade the affected workflow using
[Finding Classification](00-operating-rules.md#finding-classification).

Verify unusual service names and fields against `ha_list_services`.

Invalid service names are correctness findings. Stale script references are
correctness findings if the caller can run.

## Missing Helper Dependencies

Search automation and script configs for helper entity references and verify
existence.

If a helper is missing:

- Do not create helpers without confirming intended type, area, category, and
  restore semantics.
- Recreate it only if the intended type, name, restore behaviour, area,
  category, and icon are clear.
- Update the automation/script reference if the helper was renamed.

## Runtime Errors & Failed Traces

Check recent traces and automation/script errors for important automations and
shared scripts.

Prioritise errors over style issues. If traces show service calls succeed but
behaviour is wrong, inspect target capabilities and runtime state.

## Unavailable Triggers & Startup Recovery

For state/numeric triggers and conditions, verify the entity is not
persistently `unavailable` or `unknown`.

Automations that recover state at startup must have a startup trigger and must
not fail during startup. Automations that do not need recovery should not carry
startup triggers or descriptions claiming startup checks.
