# Audit Checks

Check in this order and grade with the skill's severity scale.

## Correctness

- **Repairs:** active Repairs about unknown entities or services are correctness
  findings. Repairs older than the latest change may be stale; recheck before
  reporting.
- **References:** every entity, service and field an automation, script, scene,
  helper or dashboard uses must exist. A stale reference matters only if its
  caller can run.
- **Missing helpers:** recreate a helper only once its intended configuration is
  known; if it was renamed, update the reference instead.
- **Runtime errors:** check traces and errors for important workflows. When
  calls succeed but behaviour is wrong, check target capabilities and state.
- **Triggers and startup:** triggers must not depend on entities that are
  persistently unavailable. Automations that recover state at startup need a
  startup trigger that works at startup; others should not claim one.
- **Integrations:** investigate integrations in error or retry states or logging
  repeated errors. Deliberately disabled, ignored or powered-off ones are not
  failures.
- **False positives:** judge freshness from report timestamps and current
  runtime state, not cached values or tool hints. A restart leaves entities
  initialising and clears traces.

## Behaviour

- **Writer conflicts:** map each target to everything that writes it, and flag
  writers that can fight, undo each other or race.
- **Controllers:** for physical controls and webhooks, compare real event names
  and timing with what the automation or blueprint assumes, across every gesture
  path. One gesture should not unintentionally reach several domains.
- **Broad targets:** flag area, group or input targets that can reach entities
  which should not get the command or cannot handle it.
- **Capabilities:** generic scripts must only send data their targets support,
  or tolerate unsupported targets deliberately.
- **State lifecycles:** every mode or override that can be turned on needs a
  reliable way off. Trace who sets, reads, clears and resets it, including when
  the expected clearing event never happens.
- **Descriptions:** descriptions must match what the automation actually does.
- **Siblings:** related automations and rooms should share mode, trigger shape,
  durations and conditions unless a difference is intended; check intent first.
  A blueprint may override top-level settings it does not expose as inputs.
- **Routines:** order steps so other automations do not react to intermediate
  state; cleanup usually comes last.
- **Notifications:** recipients must match the intended audience. Repeated
  per-automation notifications to one audience are maintenance drift; a missed
  or wrong recipient is correctness.
- **Polling and aggregates:** polling is a warning only when an event trigger
  would do. Entities that never changed since boot may never have reported.
  Aggregates can briefly disagree with members; investigate only with a symptom
  or a consumer.

## Organisation

Judge against the home's own established policy, so a fixed item stays fixed.

- **Areas and floors:** assign what the home's area targeting, dashboards and
  floor policy rely on. Functional areas need no floor.
- **Categories and labels:** where the home uses them, look for oversized or
  near-empty groups, same-purpose items split apart and clear uncategorised
  sets. Unused optional features are not findings.
- **Generated dashboards:** visibility depends on registry state, entity
  category, availability and effective area, not just the hidden flag. Prefer
  registry organisation to manual cards, and say whether a check was by filter
  or visual.
- **Visibility and icons:** hiding and icons follow local policy. Flag
  inconsistent siblings, contradictory icons and hiding that blocks intended
  use.
- **Voice exposure:** check exposure directly; registry metadata does not show
  it. Flag stale, duplicate, hidden, sensitive or unexpected exposure.
- **Names:** keep entity IDs stable and descriptive, and do not rename for
  looks. Friendly names should not repeat context the UI already shows. A
  mismatched ID and name may be an incomplete rename; check references and
  intent. Flag integration titles that are random identifiers. Diverging helper
  storage names are cosmetic unless references break.
- **Regenerated IDs:** if the home regenerates entity IDs, hand-set IDs must
  match what regeneration produces. It derives them from the integration-side
  name, so fix names at their source.
- **Ordering:** a maintenance preference, never correctness. Keep a consistent
  order for triggers, branches and blueprint inputs. Values equal to defaults
  can go unless they state local policy.
- **Defaults:** check an option's real effect before calling it redundant; some
  apparent defaults change startup or restore behaviour.
- **Bloat:** flag unused or duplicate entities, sensors, wrappers and
  automations, and disabled automations that are stale or unsafe to enable.
  Intentional per-room patterns and parked alternatives are fine.
- **Duplicates:** compare provider, capabilities and consumers before
  disabling a duplicate; similar entities may offer different capabilities, and
  disabling an entity does not change the physical device.
- **Orphans and removals:** an object with no entity is a deletion candidate,
  not safe to delete. After an authorised removal, remove verified leftovers and
  keep shared resources still in use.
