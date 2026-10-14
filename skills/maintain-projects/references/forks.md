# Fork Maintenance

Use for requested upstream alignment, fork cleanup or preparation of upstream
contributions. Keep unrelated local configuration and user changes intact.

## Establish the Baseline

1. Identify the fork, canonical upstream, target branch and pinned revision from
   Git remotes and owning configuration. Do not infer upstream from a remote name
   or assume the default branch.
2. Inspect working-tree changes, local commits, published branches and existing
   PRs. Compare the fork's delta from the intended upstream baseline, including
   history and final behaviour.
3. Classify changes as portable fixes, intentional product differences or
   environment-specific configuration. Trace downstream consumers before moving
   local settings out of the fork.

## Keep the Delta Reviewable

- Prefer supported upstream settings and extension points when they preserve the
  requested behaviour. Remove a patch only after its replacement is verified.
- Separate independent portable fixes from local configuration so each change
  can be reviewed or proposed upstream on its own. Preserve dependency order.
- Keep required patches and overrides explicit. Check their target assumptions
  against the new upstream revision and fail clearly when those assumptions
  change; do not silently skip a stale patch.
- Discover changes in tracked code, build inputs and packaging. Avoid leaving a
  second checkout, custom image or patch layer after its consumer is retired.

## Align & Verify

Choose merge, rebase or commit restructuring according to the existing review
and delivery requirements. Fork maintenance alone does not authorise rewriting
history or force-pushing. Before an authorised rewrite, identify affected refs,
preserve their original commit IDs and account for collaborators or open PRs.
For an authorised forced update, specify the target ref and use
`--force-with-lease=<ref>:<expected-commit>` against the reviewed remote commit.
Stop if the remote has changed; do not bypass a failed lease. An explicit expected
commit avoids relying on tracking refs that background fetches can advance; see
the [Git push documentation](https://git-scm.com/docs/git-push).

After alignment, compare the resulting delta with the original intended changes.
Check for accidental upstream reverts, duplicated fixes and lost local behaviour.
Run the project's required checks and verify affected downstream builds or
consumers. Report whether changes are prepared, committed, published or proposed
upstream; creating an upstream PR requires existing authorisation.
