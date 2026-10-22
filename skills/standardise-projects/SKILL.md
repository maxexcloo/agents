---
name: standardise-projects
description: Audit or align software repositories with the owner's standards for structure, tooling, instruction layers and GitHub settings when a standards review or alignment pass is requested. Exclude ordinary project setup, feature development, targeted fixes, routine maintenance and issue, PR or CI work.
---

# Standardise Projects

Align repositories with the standards in the global `AGENTS.md` and
[Tooling Standards](references/tooling.md). Deviations are alignment items, not
defects: list them briefly, grouped by repository, and leave a deviation alone
when it has a reason or changing it would only churn.

## Repository

- Inventory with `git ls-files --cached --exclude-standard --others`, including
  manifests, CI, generated inputs and documented operations.
- For each change, name the need, the owner and the consumers; keep a tool when
  its use is uncertain. Check the current tree before dismissing an alert about a
  deleted manifest as stale.
- Trace names, endpoints and settings from their owner to their consumers and
  update both sides together. Patches and overrides must fail clearly when
  upstream assumptions stop matching.
- Remove explicit defaults only after checking effective behaviour; keep values
  that state policy or platform differences.
- Read only the tooling sections relevant to the project.

## GitHub Settings

- Cover descriptions and topics, merge and branch policy, security controls and
  hosting within the requested scope.
- Read each repository's detail endpoint, with pagination; skip archives and
  forks unless asked. Null fields, plan limits and missing permissions are
  evidence gaps, not disabled features.
- Check consumers, such as integration manifests, before disabling Issues,
  Discussions, Pages, Projects or Wiki.
- Treat visibility, access and hosting changes as explicit decisions. Reread
  settings before patching; topic updates replace the whole set. Read settings
  back after changing them.
