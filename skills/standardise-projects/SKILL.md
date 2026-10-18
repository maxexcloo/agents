---
name: standardise-projects
description: Audit or align software repository structure, tooling and instruction layers when a structure review or deliberate alignment is requested. Exclude ordinary project setup, feature development, targeted fixes, routine maintenance and GitHub settings work.
---

# Standardise Projects

## Assess Actual Use

Discover Git roots and inventory tracked and relevant untracked files with
`git ls-files --cached --exclude-standard --others`. Include manifests, tooling,
CI, generated inputs and operational workflows.

For each proposed change, identify the concrete need, existing owner and effect
on consumers. Do not declare a tool unused from text search alone: check indirect
use in CI, deployment, generated artefacts and documented operations. Retain it
when use remains uncertain.

For containers, GitHub Actions, Mise, Hk/pre-commit, tests, dependencies,
Updatecli or ignore rules, read only the relevant sections of
[Tooling Review](references/tooling.md).

## Align Producers & Consumers

Trace inventories, names, endpoints and settings from their owning source through
generated outputs to consumers. Update both sides of a change rather than adding
another manual copy. Before removing a port or changing an endpoint, trace and
update its consumers. Preserve generated inputs and meaningful interface order.

Remove verified stale files after their workflow disappears. Omit explicit
configuration defaults only after checking effective behaviour; retain values
that communicate policy or encode platform differences.

Required patches and overrides must fail clearly when upstream assumptions stop
matching. Keep deliberately optional behaviour optional.

After dependency or test-tool changes, inspect the resolved graph to verify that
removed packages are absent. Check the current tree before dismissing an alert
about a deleted manifest as stale.
