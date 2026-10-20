# Operating Rules

## Audit Stance

Do not present local style preferences as bugs. If something is only a policy
choice, say so.

## Deletion Impact Workflow

Before deleting anything:

1. Confirm the object exists and identify its owner/integration.
2. Search automations, scripts, scenes, helpers, dashboards, and labels.
3. Check entity registry metadata, voice exposure, areas, devices, and Config
   Entry relationships.
4. Check external risk: Node-RED, app widgets, voice assistants, external
   dashboards, manual UI use, and recorder/history value.

## Finding Classification

Classify every finding by its nature:

- **Behavioural Risk**: working config that can produce wrong or conflicting
  behaviour.
- **Correctness**: broken references, runtime failures, invalid services,
  missing helpers, dead triggers, or active Repairs.
- **Cosmetic / Bloat**: metadata cleanup, ordering, redundant defaults, noisy
  entities, or recorder clutter.
- **Maintenance**: duplicated patterns, stale names, inconsistent categories,
  or hard-to-maintain structure.

Grade severity separately by the affected workflow and actual consequence:

1. **Critical**: failures or credible behavioural risks affecting safety,
   security, leak detection, locks, alarms, critical presence handling, backups
   or critical notifications.
2. **High**: broken room workflows or routines, or consequential writer conflicts
   and misleading descriptions likely to cause incorrect behaviour.
3. **Medium**: non-critical dashboard or optional-target failures, operational
   confusion, or maintenance and behavioural risks with limited impact.
4. **Low**: cosmetic naming, icons, metadata, ordering or redundant configuration
   without a functional consequence.

An active Repair, missing entity or unusual mode is evidence to investigate,
not a severity by itself. Keep uncertain findings as questions with the missing
evidence identified; do not report a suspected failure as confirmed.

## Rename Impact Workflow

Before any `ha_set_entity(..., new_entity_id=...)`:

1. Search automations, scripts, scenes, helpers, and dashboards for the old ID.
2. Check Config Entry backed helpers and integrations that may store entity IDs.
3. Check groups, thresholds, min/max, generic thermostat, utility meter,
   dashboard cards, voice exposure, and area assignments, including an area’s
   explicit temperature_entity_id and humidity_entity_id references.
4. Confirm the available tools can update every consumer before renaming.
   Save before-values and a rollback plan. Missing tool fields are capability
   limitations, not proof that the reference updates automatically.
5. Rename and update consumers. If a consumer cannot be updated, restore the old
   ID and any already changed references.

After either workflow, use
[Verification & Delivery](04-verification-delivery.md#2-after-changes) to check
the result.
