---
name: maintain-projects
description: Audit or complete a requested software repository maintenance pass covering issues, PRs, CI and updates. Exclude individual bug fixes, targeted CI repairs and feature development.
---

# Maintain Projects

## Inventory the Work

Read open issues, PRs, recent CI failures and pending dependency updates when
GitHub is in scope. Check existing PRs before duplicating a fix.

Review native dependency previews and selected Updatecli groups during maintenance.
Use `mise run dependencies:mise:check` for tool pins, honouring project compatibility
exclusions. Where configured, `mise run dependencies:check --labels group:actions`
previews one Updatecli group; select other groups for the requested scope rather
than applying every policy together. Apply reviewed groups, refresh affected
lockfiles with the project's native tasks, and run project checks. Review major
upgrades separately.

Inventory dependency and lockfile updates, runtime/tool pins, Actions, images and
versions embedded in scripts or templates. Review compatibility, migrations and
obsolete workarounds before adopting newer stable releases. Update supported
version declarations, CI matrices and runtime setup together.

For requested fork maintenance or upstream contributions, read
[Fork Maintenance](references/forks.md).

## Verify & Deliver

Check affected behaviour. When a pass retires a feature, remove its
configuration, consumers and generated outputs. Use proportional local checks
and existing CI for expensive builds; required CI must pass for the current
revision.

When checks depend on shared configuration or Actions, verify consumers against
the committed provider revision used by CI, rather than only the locally
installed configuration.

Passing CI alone does not prove an issue is resolved. Verify the reported failure
before closing it. After an authorised deployment, check the affected workload or
reconciliation state and refresh requested exports through existing project tasks.
