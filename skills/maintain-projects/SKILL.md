---
name: maintain-projects
description: Audit or complete a requested software repository maintenance pass covering issues, PRs, CI and updates. Exclude individual bug fixes, targeted CI repairs and feature development.
---

# Maintain Projects

Find what is broken, pending or needlessly complex. Deliberate alignment with
the standards is `standardise-projects`. Skip steps whose tooling is absent.

## Inventory

1. Open issues and PRs; check existing PRs before duplicating a fix. Pass
   `-R owner/repo` to `gh` in forks, which otherwise resolve to the parent.
2. Recent CI failures on the default branch.
3. Pending updates: preview with `mise run dependencies:check`, including
   versions embedded in scripts or templates. In a fix pass, open them with
   `mise run dependencies:update`; review major upgrades separately, and update
   version declarations, CI matrices and runtime setup together.
4. Complexity to remove, as the global Audits section describes.

## Fix & Verify

- Reproduce the reported failure with the real producer payload and consumer
  path, and verify the fix against it; passing CI alone does not close an issue.
  Use a clean build when cached outputs could hide missing dependencies.
- When checks use shared configuration or Actions, verify against the revision
  CI uses, not only the local copy.
- When a fix retires a feature, remove its configuration, consumers, outputs,
  tests and documentation.
- Align with an upstream only when the project's `AGENTS.md` says it tracks one.
  Keep portable fixes separate from local configuration so each can go upstream,
  and afterwards check for accidental upstream reverts and lost local
  behaviour. Rewriting history needs authorisation; when authorised, note the
  original commit IDs first and push with
  `--force-with-lease=<ref>:<expected-commit>` and stop if it fails.
