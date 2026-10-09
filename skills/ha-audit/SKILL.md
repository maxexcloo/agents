---
name: ha-audit
description: Audit Home Assistant configuration for correctness, behavioural risk, consistency, organisation and bloat. Use for HA audits, targeted diagnosis and requested cleanup.
---

# HA Audit

Separate broken behaviour from risk, maintenance and local preferences. Audit
first; change configuration only within the user's explicit fix authorisation.

## Establish the Batch

1. Identify the requested objects and outcome. Reuse current evidence and respect
   accepted risks, exclusions and deferred items.
2. Read [Operating Rules](references/00-operating-rules.md) for finding classes
   and the safeguards for edits, renames and deletions.
3. For broad maintenance, establish one batch from the initial findings.
   Include regressions caused by the work; defer unrelated later discoveries.

## Audit the Relevant Layers

Load only the references needed for the request, in this order:

1. [Scope & Correctness](references/01-scope-correctness.md): inventory, Repairs,
   references, helpers, traces and recovery. Check correctness before cleanup.
2. [Behaviour & Implementation](references/02-behaviour-implementation.md):
   conflicting writers, controllers, targets, overrides, routines, modes,
   blueprints, capabilities, notifications, templates and timing.
3. [Organisation & Hygiene](references/03-organisation-hygiene.md): local
   taxonomy, areas, metadata, exposure, naming, integration health and bloat.

Discover current tool schemas before using reference examples. Follow pagination
and inspect partial results and errors. Entity search does not cover every stored
configuration or consumer; use the reference checks before declaring an orphan.

Discover this home's policies before judging consistency. Missing labels, floors
or other metadata are findings only when the system's intended policy needs them.

## Verify & Finish

Read [Verification & Delivery](references/04-verification-delivery.md) for
before/after checks, finding severity, evidence and reporting.

For fixes, verify each changed object and its consumers with relevant read-back,
configuration, state or trace checks. Review the original batch once after the
last change. Distinguish saved configuration from observed live behaviour.

Use the global completion criteria and a concise **Done**, **Waiting** or
**Blocked** report. Optional cleanup does not keep a completed batch open.
