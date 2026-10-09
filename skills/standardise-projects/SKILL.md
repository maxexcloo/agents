---
name: standardise-projects
description: Audit, create and tidy software repositories for lean, consistent structure, tooling and instruction layering. Use for project setup or alignment; routine upkeep belongs to maintain-projects and GitHub settings to standardise-github.
---

# Standardise Projects

Apply a shared decision framework while preserving justified project differences.

## Establish Scope

1. Discover the Git roots in scope, including nested repositories, and honour
   exclusions. Read applicable instructions and inspect current changes.
2. Establish the requested outcome and one batch of findings. Audit-only requests
   produce findings; requested tidy-up work permits relevant reversible edits.
3. Keep personal defaults in global guidance, project invariants and exceptions in
   project `AGENTS.md`, task procedures in skills and mechanical rules in checks.

## Inventory & Assess

Inventory tracked and relevant untracked files with
`git ls-files --cached --others --exclude-standard`. Inspect manifests, source,
tests, generated inputs, documentation, tooling, CI and operational workflows.

For each file, tool, task or abstraction, ask:

1. What concrete failure, repetition or operational need does it address?
2. Is that value already supplied elsewhere?
3. Is this the narrowest reliable implementation?
4. Would removal harm an important workflow?

Do not declare a tool unused from text search alone. Check indirect use in CI,
deployment, generated artefacts and documented operations. Keep it when use remains
uncertain; an explicit near-term user requirement is also concrete evidence.

For Mise, Prek/pre-commit, tests, dependencies, Renovate or ignore rules, read the
relevant sections of [Tooling Review](references/tooling.md).

## Align the Project

Add only files and workflows justified by current use. Keep documentation accurate
and remove stale commands, configuration and duplicated orchestration. Retain
small checks that cover distinct failures; avoid identical tooling for its own sake.

Make narrow patches. Preserve generated files and meaningful interface order.
For multiple repositories, compare the relevant conventions and explain
intentional differences in the conversation or an existing tracker.

## Verify & Finish

Use global verification requirements and any project-specific checks. Validate
changed tooling and configuration with their native validators where available.

After dependency or test-tool changes, inspect the resolved dependency graph and
confirm removed packages are absent. Check the current tree before treating an
alert about a deleted manifest as stale.

Review the final diff and status for unintended artefacts. Close the agreed batch
using the global completion criteria; distinguish static inspection from builds,
CI and runtime verification.
