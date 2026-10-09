---
name: maintain-projects
description: Complete a bounded maintenance pass across software repositories, covering issues, PRs, failed CI, updates and conformance. Use for routine repository maintenance; targeted fixes need only their relevant checks.
---

# Maintain Projects

Finish one maintenance batch with a clear outcome. Follow global completion
rules and project-specific instructions; optional improvements do not keep
maintenance permanently open.

## Establish the Batch

- Distinguish an audit from an authorised fix batch. For audit-only requests,
  report findings without modifying repositories.
- Discover the requested Git roots and exclusions. Read applicable instructions
  and inspect Git status before editing.
- Read current issues, open PRs, recent CI failures and pending dependency updates
  when GitHub is in scope. If access is missing, state the gap.
- Establish the batch from that initial evidence. Reuse existing findings and
  refresh only evidence that may have changed.
- Prioritise broken behaviour, security problems and failed checks, then dependency
  updates and useful cleanup. Distinguish actionable problems from preferences,
  expected outages and accepted risks.
- Include all explicitly requested work. If a broad request has ambiguous
  boundaries, state a practical scope; ask only when that ambiguity matters.

## Complete the Work

- Check existing PRs before implementing a duplicate fix. Review breaking changes
  and obsolete workarounds when updating dependencies.
- Use specialised audit skills only when the work needs them. A routine maintenance
  pass does not require a repository redesign or full infrastructure audit.
- Make small changes and inspect current file contents before edits when other
  sessions may be active.
- Verify affected behaviour and applicable conventions. Fix failures or regressions
  introduced by this batch; use the project's required checks.
- Complete commit, push, merge, issue closure and deployment steps only when
  already authorised. Close issues only when resolution is verified; passing CI
  alone is not evidence that an issue is fixed.
- After deployment, verify the affected workload or reconciliation state. Report
  asynchronous CI or deployment as Waiting until its required result is known.

## Close the Batch

Review the completed batch once against its original scope. Add a newly discovered
problem only when it blocks this work, was caused by it, or is urgent enough to
require immediate attention. New unrelated issues, releases or dependency PRs go
to the next batch; do not chase a continuously changing latest state.

Use the global Done, Waiting or Blocked outcome. A clean no-change pass can be
Done. Optional cleanup and deferred issues are not required blockers.

For multiple repositories, report each repository's outcome briefly and identify
only the decisions or blockers needing attention. Use existing trackers or the
conversation for deferred findings; do not create a new report or issue unless
requested. End without an unsolicited list of further improvements.
