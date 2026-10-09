---
name: standardise-projects
description: Audit, create and tidy software repositories for lean, consistent structure, tooling and instruction layering. Use for project setup or alignment; routine upkeep belongs to maintain-projects and GitHub settings to standardise-github.
---

# Standardise Projects

Apply a shared decision framework while preserving justified project differences.

## 1. Establish Scope

1. Discover the Git roots in scope, including nested repositories, and honour
   exclusions. Read applicable instructions and inspect current changes.
2. Establish the requested outcome and one batch of findings. Audit-only requests
   produce findings; requested tidy-up work permits relevant reversible edits.
3. Keep personal defaults in global guidance, project invariants and exceptions in
   project `AGENTS.md`, task procedures in skills and mechanical rules in checks.

## 2. Inventory & Assess

Inventory tracked and relevant untracked files with
`git ls-files --cached --exclude-standard --others`. Inspect manifests, source,
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

## 3. Align the Project

Add only files and workflows justified by current use. Keep documentation accurate
and remove stale commands, configuration and duplicated orchestration. Retain
small checks that cover distinct failures; avoid identical tooling for its own sake.
Remove verified stale files and empty directories after their purpose disappears.
Omit explicit defaults only after checking their effective behaviour; keep values
that encode policy or differ between platforms.

Trace shared data from its owning source through generated outputs to consumers.
For inventories, names, endpoints, secrets and deployment settings, check the
whole path across repositories. Derive duplicated information where practical;
update producers and consumers together instead of adding another manual copy.
Use global address and URL preferences for derived endpoints. Prefer direct,
typed inventory data over repeated names, context prefixes or layers of aliases.

Make narrow patches. Preserve generated files and meaningful interface order.
For multiple repositories, compare the relevant conventions and explain
intentional differences in the conversation or an existing tracker.

Required patches and overrides should fail clearly when upstream assumptions
stop matching. Do not silently skip a stale required change; keep deliberately
optional behaviour optional.

## 4. Verify & Finish

Use global verification requirements and any project-specific checks. Validate
changed tooling and configuration with their native validators where available.

After dependency or test-tool changes, inspect the resolved dependency graph and
confirm removed packages are absent. Check the current tree before treating an
alert about a deleted manifest as stale.

Review the final diff and status for unintended artefacts. Close the agreed batch
using the global completion criteria; distinguish static inspection from builds,
CI and runtime verification.
