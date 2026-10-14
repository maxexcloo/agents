# Behavioural Risk & Implementation Consistency

## Area & Group Target Risk

Area and group targets are convenient but can hide mixed capabilities. Flag as
behavioural risk when a bulk command can reach entities that should not receive
it.

Check:

- Groups whose members have different capabilities, positions, supported
  features, or operational meaning.
- Scripts that accept an `area`, `group`, or broad target as input.
- `target.area_id` service calls for `light`, `cover`, `media_player`, `fan`,
  `switch`, `climate`, and `lock`.
- Whether exclusions or capability filters are applied before the service call.

Grade the command's actual consequence using
[Finding Classification](00-operating-rules.md#finding-classification).

## Blueprint Consistency

Blueprints may set automation mode internally. If there is no `mode` blueprint
input, top-level automation config may not control runtime mode.

Blueprint inputs have a defined order. Automation configs are easier to audit
when inputs follow the blueprint order. This is maintenance/cosmetic, not
correctness.

Inputs equal to blueprint defaults can be removed for readability. Do not remove
defaults if explicit values communicate local policy.

## Capability-Aware Actions

Before flagging or changing a generic script, verify that targets support the
service data it sends. A valid entity can still ignore unsupported fields.

Common examples:

- Brightness, colour temperature, RGB, or effects sent to `onoff` lights.
- Climate preset, fan mode, or swing mode sent to devices that do not expose
  them.
- Cover position commands sent to covers that only support open/close/stop.
- Fan percentage or preset commands sent to simple on/off fans.
- Media volume, source, or grouping commands sent to players without those
  features.

Generic scripts should either filter by capability or tolerate unsupported
targets deliberately.

## Cross-Entity Writer Conflicts

Build a map:

```text
target_entity_id -> automations/scripts/scenes that write to it
```

Multiple writers are not automatically wrong. Flag as risk when actions can
fight, undo each other, or create timing races.

Examples:

- A routine bulk turns off a room while a media mode is active.
- One automation turns a light on while another turns it off from the same
  trigger family.
- Sensor-light automation and manual override automation write the same helper
  inconsistently.

## Description & Mode Consistency

Compare each description with actual triggers, conditions, actions, and order.
Flag descriptions that claim behaviour that is not implemented:

- Claims a reset happens first/last but order differs.
- Claims cleared notifications but has no clear trigger.
- Claims guest guard but no guest condition.
- Claims startup checks but has no startup trigger.

Group automations by category, blueprint, naming pattern, or behaviour. Compare
`mode`, `max`, and `max_exceeded`. Mode differences are bugs only when they
change behaviour incorrectly.

Common checks:

- Independent notifications can be `parallel`.
- Motion/sensor lights often need `restart`.
- One-shot reminders can be `single`.
- Sequential lock/door workflows often need `queued`.

## Override Lifecycle

For every override helper, trace the lifecycle:

1. Who sets it ON.
2. Who reads it in bypasses or conditions.
3. Who clears it.
4. What happens if the room never empties.
5. What routines reset it globally.

Every ON path needs an OFF path. If an override can persist forever
unexpectedly, flag as behavioural risk.

## Persistent Integration State Pairing

When config enables persistent integration state, verify a disable path:

- Adaptive Lighting manual control.
- Away mode.
- Guest mode.
- Media mode.
- Sleep mode.

Time-based fallbacks are useful for rooms that never empty.

## Recipient & Notification Semantics

Audit notification helpers by intent, not only by service name.

- Automation-local notifications are fine for one-off messages but create drift
  when many automations should notify the same audience.
- Native `notify` groups are simple broadcast targets.
- Scripts can choose recipients dynamically, add per-device data, suppress
  unavailable devices, and centralise retry or priority behaviour.

Flag as maintenance when the implementation does not match the described
recipient intent. Flag as correctness only when an intended recipient cannot
receive the notification or the wrong audience can be notified.

## Routine Ordering & Clobbering

Routine step order matters. Cleanup usually belongs at the end so room
automations do not react to intermediate state.

Check routines for floor/whole-home actions, cover commands, light bulk
commands, reset helpers, and guest/sleep conditions.

## Stuck States & Composite Drift

Entities unchanged since boot may have never reported. Entities stuck in
implausible states may indicate bad sensors or integration state.

Group and composite entities can temporarily disagree with members during
integration delays, partial failures, or mixed commands. Do not assume this is a
bug. Investigate only when there is a symptom, trace error, stale state, or
automation depending on the aggregate state.

Check whether automations read the group/composite state, whether child
entities report different states/positions/availability, and whether history
shows normal convergence after commands.

## Template Appropriateness

Templates are appropriate in `data`, `message`, `title`, `event_data`, and
`variables`.

Avoid templates in logic conditions when native conditions exist, triggers when
native triggers exist, service names, and target entity IDs unless a shared
generic script intentionally needs them.

Flag shared generic scripts separately from ordinary automations. A generic
script may reasonably template target IDs if it validates inputs and traces are
clean.

## Template Sensors vs Built-In Helpers

Review template sensors that duplicate built-in helpers:

- Aggregation -> `min_max` helper.
- Consumption tracking -> `utility_meter`.
- Counting/timing -> `counter` or `timer`.
- Rate of change -> `derivative` helper.
- Threshold checks -> `threshold` helper.
- Time-of-day logic -> `tod` helper.

## `time_pattern` Review

`time_pattern` is not automatically wrong. It is a warning when it polls for an
entity change that could be handled by a state trigger.

It is often acceptable for periodic reminders, watchdogs, rate-limited checks,
and integrations that do not emit useful state changes.

## Trigger & Branch Ordering

Deterministic ordering helps maintenance but is not correctness.

Useful local policy:

1. Group triggers by urgency/duration.
2. Sort same-duration trigger entities alphabetically.
3. Keep `choose` branches in the same order as trigger IDs when branches are
   one-to-one.

## Trigger & Controller Conflicts

For each trigger entity, list all automations that trigger from it. Compare
actions for opposing writes to the same target.

For controller, button, remote, and webhook automations, audit the event stream
as well as the config. Blueprint inputs can look correct while runtime events do
not match blueprint assumptions.

Check:

- Blueprint variables that store previous events or last actions.
- Raw event names and timing from recent traces.
- Single, double, hold, release, and repeat paths for the same physical control.
- Version drift between installed blueprint behaviour and configured inputs.
- Whether one physical gesture can trigger multiple domains, such as light and
  cover actions.

This is a general controller audit. Apply it to covers, lights, media players,
locks, fans, scenes, and any multi-action controller.

## Trigger Parity Across Rooms

Related room automations should usually use the same trigger shape. Differences
may be intentional. Verify before flagging.

Compare trigger entities, `for:` durations, startup triggers, guest/home
conditions, and override helpers.
