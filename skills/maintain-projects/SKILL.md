---
name: maintain-projects
description: Audit or complete a requested software repository maintenance pass covering issues, PRs, CI, updates and conformance. Exclude individual bug fixes, targeted CI repairs and feature development.
---

# Maintain Projects

Finish one maintenance batch with a clear outcome.

## 1. Establish the Batch

1. Distinguish an audit from an authorised fix batch. For audit-only requests,
   report findings without modifying repositories.
2. Discover the requested Git roots and exclusions. Read applicable instructions
   and inspect Git status before editing.
3. Read current issues, open PRs, recent CI failures and pending dependency updates
   when GitHub is in scope. If access is missing, state the gap.
4. Establish the batch from that initial evidence. Reuse existing findings and
   refresh only evidence that may have changed.
5. Prioritise broken behaviour, security problems and failed checks, then dependency
   updates and useful cleanup. Distinguish actionable problems from preferences,
   expected outages and accepted risks.
6. Include a project-wide convention review in the initial batch, covering
   authored text, configuration, tooling and CLI invocations. Follow global
   and project rules; preserve justified exceptions and meaningful order.
7. Include all explicitly requested work. If a broad request has ambiguous
   boundaries, state a practical scope; ask only when that ambiguity matters.

## 2. Complete the Work

Inventory update sources in scope: dependencies and lockfiles, tool/runtime pins,
Actions, images and versions embedded in scripts or templates. Prefer the newest
stable compatible versions; retain justified pins and review migrations.
When minimum supported versions are in scope, update declarations, CI matrices,
runtime setup and documentation together.

For requested fork maintenance, upstream alignment or preparation of upstream
contributions, read [Fork Maintenance](references/forks.md). Ordinary maintenance
does not require a fork comparison or history rewrite.

1. Check existing PRs before implementing a duplicate fix. Review breaking changes
   and obsolete workarounds when updating dependencies. Compare upstream support
   with current targets and configuration; do not preserve a workaround solely
   because it existed before.
2. Use specialised audit skills only when the work needs them. A routine maintenance
   pass does not require a repository redesign or full infrastructure audit.
3. Make small changes and inspect current file contents before edits when other
   sessions may be active. Remove the verified obsolete feature's remaining
   configuration, consumers and generated outputs, not just its main code.
4. Verify affected behaviour and applicable conventions. Fix failures or regressions
   introduced by this batch; use the project's required checks. Prefer existing
   CI for expensive compilation or full target builds, with proportional local
   checks. Required CI must pass for the current revision.
5. Complete commit, push, merge, issue closure and deployment steps only when
   already authorised. Close issues only when resolution is verified; passing CI
   alone is not evidence that an issue is fixed.
6. After deployment, verify the affected workload or reconciliation state.
   Refresh requested exports and derived consumers through existing project tasks.
