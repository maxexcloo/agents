# Operating Rules

## Audit Stance

Audit first. Do not change Home Assistant configuration unless the user
explicitly asks for fixes.

Classify every finding:

- **Behavioural Risk**: working config that can produce wrong or conflicting
  behaviour.
- **Correctness**: broken references, runtime failures, invalid services,
  missing helpers, dead triggers, or active Repairs.
- **Cosmetic / Bloat**: metadata cleanup, ordering, redundant defaults, noisy
  entities, or recorder clutter.
- **Maintenance**: duplicated patterns, stale names, inconsistent categories,
  or hard-to-maintain structure.

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
5. Verify explicit deletion authorisation in this conversation. Ask only if it is missing; do not ask again for an already authorised deletion.
6. After deletion, validate config and search the removed concept again.

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
5. Rename, update consumers, validate, and search the old ID again using
   entity boundaries (not substring matches). If a consumer cannot be updated,
   restore the old ID and any already changed references.

## Safety Rules

- Never call a helper/entity orphan "safe to delete" based only on automation
  and script searches.
- Never delete helpers, integrations, devices, entities, dashboards, or
  categories without explicit user approval.
- Never rename entities without impact analysis.
- Preserve user intent. If a pattern is deliberate, record it as policy and do
  not fight it.
- Use `config_hash` wherever the configuration API supports it. Registry edits
  have no hash: read current values, save the inverse, edit narrowly, and read back.
- Use targeted reads before conclusions.
- Verify each batch with the narrowest relevant read-back, state or trace check.
  Run config validation for configuration changes; metadata-only edits do not
  require restarts or unrelated validation.
