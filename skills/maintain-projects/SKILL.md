---
name: maintain-projects
description: Audit or complete a requested software repository maintenance pass covering issues, PRs, CI and updates. Exclude individual bug fixes, targeted CI repairs and feature development.
---

# Maintain Projects

## Inventory the Work

Read open issues, PRs, recent CI failures and pending dependency updates when
GitHub is in scope. Check existing PRs before duplicating a fix.

Preview dependency updates with `mise run dependencies:check`, which runs Renovate
locally without writing files. Open reviewed updates as pull requests with
`mise run dependencies:update`, honouring project compatibility rules, and run
project checks on each. Review major upgrades separately.

Inventory dependency and lockfile updates, runtime/tool pins, Actions, images and
versions embedded in scripts or templates. Review compatibility, migrations and
obsolete workarounds before adopting newer stable releases. Update supported
version declarations, CI matrices and runtime setup together.

Report literals that duplicate an owner's value, required settings with defaults
or fallbacks, and references to generated IDs as findings.

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
