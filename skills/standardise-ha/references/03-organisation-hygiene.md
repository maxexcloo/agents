# Metadata Organisation, Hygiene, & Bloat

## Area & Floor Assignment

Room-scoped entities, automations, scripts, devices, and helpers should usually
have area assignment if the local policy uses area filtering or area targeting.
Whole-home/system entities may use a functional Home area when needed for
automatically generated dashboards. Discover the local policy first.

Physical rooms should follow the local floor policy. Functional areas such
as Home, Network, Homelab or Portable can intentionally have no floor. An
unassigned floor alone is not a defect.

```python
ha_set_entity(entity_id="...", area_id="living_room")
ha_set_device(device_id="...", area_id="living_room")
ha_list_floors_areas()
```

## Automatically Generated Dashboards

Separate stored Lovelace cards from built-in Home/area strategies. Visibility
depends on domain/platform exclusions, entity_category, hidden_by, disabled_by,
state availability, device association and effective area (entity override,
then device area). Do not equate unhidden with visible. Inspect the installed
frontend behaviour when needed; prefer registry/area organisation to manual cards
when the user wants automatic dashboards. Read back and distinguish filter-based
verification from an actual visual check.

## Category Coverage & Local Taxonomy

Categories are domain-scoped and optional by HA design. If the local system uses
categories, audit consistency.

Checks:

- Categories with 30+ entities.
- Categories with one or two entities.
- Same-purpose entities spread across categories.
- Uncategorised entities with a clear shared purpose.

Do not call missing categories a bug unless the user has adopted category
coverage as policy.

Derive local organisation policy from the system before judging it. Do not
hard-code another home's taxonomy.

Check:

- Whether areas are used for targeting, dashboards, voice, or only organisation.
- Whether categories are used in each scope: automation, script, scene, helpers.
- Whether category names intentionally differ by scope.
- Whether every real area is assigned to a floor.
- Whether labels are unused, lightly used, or central to workflows.

Treat discovered policy as guidance for consistency findings. Missing labels
are not a finding in a system with no label workflow, but missing floor
assignment is a finding in a system where every real area is assigned to a
floor.

```python
ha_config_get_category(scope="automation")
ha_config_get_category(scope="script")
ha_config_get_category(scope="scene")
ha_config_get_category(scope="helpers")
ha_config_get_label()
ha_list_floors_areas()
```

## Cleanup After Removal

When a component's removal is authorised, check its integrations, helpers,
automations, blueprints, stored dashboard resources, entities and metadata for
verified leftovers. Follow the deletion impact workflow before removing objects.
Keep shared resources and intentionally parked alternatives with real consumers.

## Duplicate Camera & Media Entities

Compare provider, supported_features and consumers before disabling duplicates.
A live camera and snapshot camera are different capabilities. Preserve required
motion entities; disabling HA audio entities does not mute physical microphones
or alter external recording. Do not blanket-enable parked alternate players.

## Entity ID, Friendly Name, & Integration Title Noise

A mismatch between entity ID and friendly name can suggest an incomplete rename.
Verify references and user intent before proposing an entity ID rename.

Treat as:

1. High only if references are already broken.
2. Medium if the name causes operational confusion.
3. Low if cosmetic.

Flag integration titles that are pure GUIDs, hex hashes, or random identifiers.
Do not flag meaningful model/firmware suffixes like `P110M`, `v2`, or vendor
model numbers.

## Helper Metadata Bloat

Only flag redundant values after verifying the installed integration’s defaults
and restore behaviour. Prefer stable configuration over cosmetic churn.

Examples:

- `mode: "slider"` on `input_number`.
- `restore: true` on `counter`.
- `step: 1` on `counter` or `input_number`.

**Do not treat `initial: false` as a redundant default.** On an input_boolean,
it forces startup state instead of restoring the previous value. Removing it
is a behaviour change requiring review.

## Helper Orphans & Stale Names

Compare helper registry output against state and entity registry entries. A
helper/config entry with no entity is a deletion candidate, not automatically
safe to delete.

Before deletion, run the deletion impact workflow.

Storage-level helper `id` and `name` can diverge from entity-level name after
renames. This is cosmetic unless it causes repairs or service lookup issues.

```python
ha_config_set_helper(helper_type="<type>", helper_id="<id>", name="<correct name>", action="update")
```

## Hidden, Icon, Label, & Exposure Policy

Hidden entities are not automatically bad.

Common policies:

- Hide automation-only scripts.
- Hide room controller automations.
- Inspect entity_category before changing visibility: config and diagnostic
  entities may already be excluded from generated primary controls.
- Show scripts users run manually.
- Show user-facing routines.

Flag only inconsistent same-purpose siblings or entities hidden in a way that
blocks intended UI use.

Explicit icons are a local polish policy, not HA correctness. Check missing
icons on user-facing scripts/helpers if local policy wants icons, same-purpose
helpers with inconsistent icons, and icons that contradict function.

Labels are optional. Zero labels is fine unless labels are part of the local
workflow.

Voice exposure can be useful or dangerous. Audit exposed entities:

```python
ha_get_entity_exposure()
```

Flag stale, duplicate, hidden, sensitive, or unexpectedly exposed entities.

## Naming Conventions

Entity IDs should be stable, descriptive, lower snake case, and include room
when useful. Do not rename for prettiness if it would create churn.

Friendly names should be human readable, avoid redundant room prefixes when the
UI already shows area context, and match room/function consistently.

For scripts and helpers, storage object IDs that diverge from entity IDs can
matter for maintenance even when runtime behaviour works. Treat as cosmetic
unless references break.

## Recorder & Entity Bloat

High-frequency sensors are not automatically bad. Flag them when they update
often, are unused in automations/dashboards/energy/statistics, or duplicate
another sensor.

```python
ha_get_history(entity_ids="sensor.suspect", start_time="24h", limit=1000, significant_changes_only=False)
ha_search(query="sensor.suspect")
```

Buttons are okay when they trigger real actions, support diagnostics, expose
device capabilities, or are useful in dashboards. Flag only same-purpose
duplicates, stale buttons for removed devices, or never-used generated actions.

Near-duplicate automations are not automatically wrong. Do not flag per-room
remotes or sensor lights as bad if they are an intentional room pattern. Flag
when differences are accidental, descriptions drift, helper names differ
without reason, or a shared script/blueprint would reduce real risk.

Disabled automations may be intentional parking. Flag when disabled forever
with stale references, duplicated by a newer automation, or unsafe if someone
turns it on.

## Zombie Wrappers & Integration Health

Helpers or entities that only mirror another entity may still be useful when
they normalise semantics, hide vendor noise, feed dashboards, or provide stable
IDs. Flag as bloat only when they have no consumer or value.

Use integrations and logs to catch setup problems:

```python
ha_get_integration()
ha_get_system_health(include="repairs")
ha_get_logs(source="system", level="ERROR", limit=100)
```

Investigate integrations in `setup_error`, `setup_retry`, `migration_error`,
`failed_unload`, or repeatedly logging errors. Distinguish powered-off devices,
ignored discovery entries and intentionally disabled integrations from failures.
Do not call not_loaded alone a broken integration.
