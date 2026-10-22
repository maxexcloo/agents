---
name: maintain-projects
description: Audit or complete a requested software repository maintenance pass covering issues, PRs, CI and updates. Exclude individual bug fixes, targeted CI repairs and feature development.
---

# Maintain Projects

Find what is broken or pending and fix it; do not restructure working code or
apply standards here (that is `standardise-projects`).

## Inventory

1. Open issues and PRs; check existing PRs before duplicating a fix.
2. Recent CI failures on the default branch.
3. Pending updates: preview with `mise run dependencies:check` and open them with
   `mise run dependencies:update`. Review major upgrades separately, and update
   version declarations, CI matrices and runtime setup together.

## Fix & Verify

- Reproduce the reported failure and verify the fix against it; passing CI alone
  does not close an issue.
- When checks use shared configuration or Actions, verify against the revision
  CI uses, not only the local copy.
- When a fix retires a feature, remove its configuration, consumers and outputs.
- For fork alignment, identify the upstream and target branch from remotes and
  owning configuration, not a remote name or default branch. Keep portable fixes
  separate from local configuration so each can go upstream, and afterwards check
  for accidental upstream reverts and lost local behaviour. Rewriting history needs authorisation; when authorised,
  push with `--force-with-lease=<ref>:<expected-commit>` and stop if it fails.
