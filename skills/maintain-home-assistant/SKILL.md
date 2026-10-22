---
name: maintain-home-assistant
description: Audit or complete a requested Home Assistant maintenance pass covering configuration correctness, behavioural risk, updates, organisation and cleanup. Exclude individual automation edits, targeted troubleshooting and custom integration development.
---

# Maintain Home Assistant

Load the ha-mcp `home-assistant-best-practices` skill first; it covers native
triggers and helpers, templates, automation modes, `device_id`, backups and the
generic rename workflow. This skill adds the audit and this home's policy.

1. Check correctness first, then behaviour, then organisation, using
   [Audit Checks](references/checks.md). Run every section, including minor
   organisation checks.
2. Before any change, rename or deletion, follow
   [Changes & Verification](references/changes.md).
3. For requested updates, compare installed versions with official release notes
   for core, apps, integrations, HACS, blueprints and firmware in scope, and
   identify reloads and affected automations. ESPHome firmware follows the
   `esphome` repository's `AGENTS.md`.

## Inventory

Tool fields depend on the installed version: discover current schemas, follow
`has_more`/`next_offset` pagination and treat errors or partial results as gaps.
Entity search alone misses stored helpers and consumers. Collect:

- Entities, areas, floors, categories, labels, dashboards and integrations.
- Helpers with `ha_config_list_helpers(helper_type="all", limit=200)` where
  supported, otherwise storage and Config Entry helpers separately: counter,
  input helpers, person, schedule, tag, timer, zone, groups, min/max, templates,
  thresholds, time-of-day, switch-as-X and utility meters.
- Repairs with `ha_get_system_health(include="repairs")`, before and after the
  fix batch.

## Findings

Judge against this home's own policy, discovered from the system, never another
home's taxonomy. A policy choice is not a bug; say so. Classify each finding:

- **Correctness:** broken references, runtime failures, invalid services, missing
  helpers, dead triggers or active Repairs.
- **Behavioural Risk:** working config that can act wrongly or conflict.
- **Maintenance:** duplicated patterns, stale names or hard-to-maintain structure.
- **Cosmetic:** metadata, ordering, redundant defaults, noisy entities.

Grade severity by consequence:

1. **Critical:** safety, security, leak detection, locks, alarms, critical
   presence, backups or critical notifications.
2. **High:** broken room workflows or routines, or conflicts and misleading
   descriptions likely to cause wrong behaviour.
3. **Medium:** non-critical dashboard or optional-target failures, or limited
   maintenance and behavioural risk.
4. **Low:** cosmetic naming, icons, metadata, ordering or redundant config.

An active Repair, missing entity or unusual mode is evidence to investigate, not
a severity. Report Cosmetic and Low items after the rest. Fixes should hold, so
judge each item against the home's established convention: never propose
something that undoes an earlier fix or changes the convention itself without
saying so. Name the entity and cite the config field, trace, state,
Repair or log.
