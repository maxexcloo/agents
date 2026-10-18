---
name: maintain-home-assistant
description: Audit or complete a requested Home Assistant maintenance pass covering configuration correctness, behavioural risk, updates, organisation and cleanup. Exclude individual automation edits and targeted troubleshooting.
---

# Maintain Home Assistant

Read [Operating Rules](references/00-operating-rules.md) for finding classification
and rename/deletion safeguards.

## Load the Relevant Checks

1. [Scope & Correctness](references/01-scope-correctness.md): inventory, Repairs,
   references, helpers, traces and startup recovery. Check correctness first.
2. [Behaviour & Implementation](references/02-behaviour-implementation.md):
   conflicting writers, controllers, overrides, modes, capabilities and timing.
3. [Organisation & Hygiene](references/03-organisation-hygiene.md): local taxonomy,
   metadata, exposure, integration health and bloat.

Discover current schemas, follow pagination and inspect partial results. Entity
search alone does not cover every configuration or consumer. Judge metadata
against this home's policy rather than assuming labels or floors are required.

For requested release reviews or updates, compare installed versions and
compatibility with official notes. Include core, apps/add-ons, integrations,
HACS, blueprints and firmware only within scope; identify necessary reloads and
verify affected automations. ESPHome firmware work follows the `esphome`
repository's `AGENTS.md`.

For changes, read [Verification & Delivery](references/04-verification-delivery.md)
and compare the affected workflow's behaviour before and after. Configuration
validation alone does not establish that its triggers or controller events work.
