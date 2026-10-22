# Global Agent Guidance

## Working Agreements

- Keep it simple. Prefer native features, standard tools, direct code and
  deleting things over adding them. Add a dependency, abstraction, layer or
  automation only for a concrete, current need.
- Project-specific rules override these defaults; skills provide task procedures.
  Project `AGENTS.md` files hold only scope, verification and invariants an agent
  would otherwise get wrong, never copies of these rules.
- An audit or review produces findings; loading a skill authorises nothing.
  Change files, commit, push, merge, deploy or change live infrastructure only
  within existing authorisation and project review requirements. Ask only for
  missing intent or authorisation that materially affects the work.
- Preserve intended behaviour and unrelated user changes. When sessions overlap,
  keep one owner for each change. Fix regressions your work causes, and update
  existing documentation the change affects.

## Audits & Reviews

- Report only problems with a concrete consequence: something broken, a real
  risk, wasted cost or effort, or a requested deviation. "Nothing needs changing"
  is a good result; do not pad it.
- Lead with at most about ten findings, most important first. Number them, give
  evidence and impact, and keep applied fixes distinct from suggestions.
- Do not report style preferences, hypotheticals, optional hardening or "could be
  tidier" items unless asked. Mark uncertain findings as questions.
- Standards below apply when writing or changing code. Report deviations from them
  only in a requested standardise pass, as alignment items, not defects.
- Never propose new tools, frameworks, layers or process as a fix when a smaller
  change or a deletion would do.
- In a maintenance pass, fix the batch found at the start; later unrelated
  findings belong to the next pass. Do not invent work.

## Verification

- Verify the outcome the user cares about, not a proxy for it: a saved setting,
  a successful API response, a healthy process or passing CI does not show the
  workflow works. Keep validation proportional to the change.
- Before removing, renaming or replacing something, trace its consumers and verify
  any replacement first. Absence from one search, age or inactivity does not make
  something unused.
- When tools or views disagree, report the discrepancy instead of acting further
  to make them agree.
- Run `git diff --check` and review the diff and status after repository edits.
  Use the project's checks, such as `mise run check`; run long suites
  asynchronously. For prose, check formatting, links and instruction consistency.
- Run one final review after the last change; repeat checks only for new
  changes, failures or unresolved evidence.
- State what was checked statically, locally, in CI and live, and any path that
  was not exercised.

## Delivery

- For ordinary changes, review the diff, run focused checks and merge to `main`
  without waiting for the full suite or remote CI. Use a PR where the project
  requires one; enable auto-merge when required checks block an immediate merge.
  Pause for review before merging a large or complex change.
- Finish by returning the checkout to `main`, removing the task's merged branches
  and worktrees and pruning stale remote-tracking references. Check for active
  sessions and uncommitted work first, reconcile the task's own stashes and
  scratch files, and never discard unrelated or unmerged work.
- Number recommendations and options so the user can select them.
- Keep the final report short: status, material changes, verification, blockers
  and delivery state. Report material exceptions once; omit unsolicited next
  steps. Use **Done**, **Waiting** or **Blocked**; checks that could
  not run prevent an unqualified Done.
- For site or app work, leave a local preview running and report its URL unless
  impractical. Distinguish sample data from live behaviour.

## Secret Values

- Keep secret values out of model context, tool output, logs, screenshots, diffs
  and reports. Prefer metadata-only discovery.
- Resolve secrets inside the consuming local process with the existing credential
  tools, never in command arguments or shell tracing. If a tool cannot keep values
  out of context, use a local path or ask for the missing capability. Reference 1Password items and other external
  records by title, never by generated ID.

## Skills

- Use broad `maintain-*` and `standardise-*` skills only when a pass, audit or
  alignment is requested or the skill is named; never for a targeted fix or
  feature. `maintain-*` finds what is broken; `standardise-*` aligns with the
  standards.
- Use technology-specific skills (Orca, TerraShark, Web Awesome and the like) only
  when that technology is requested or already in use, not because a task is
  loosely related.

## Standards

### Structure

- Define names, domains, versions and shared settings once, near their owner, and
  derive them elsewhere. Add no indirection harder to follow than the duplication
  it removes. Split mixed-concern files and organise directories predictably.
- Read required settings without defaults or fallbacks so a missing value fails
  with its name.
- Prefer Mise for tasks and npm for package-specific operations. Declare only
  project-specific Mise tools.
- Use major tags for GitHub Actions, `latest` for CI and Mise tools unless one
  must be held back (say why in a one-line comment), and exact versions for deployed images, charts and providers.
  Never pin digests or Action SHAs, except `latest@sha256:` for an image that
  publishes only `latest`. Pin fetched source without a suitable release to an
  immutable revision. Keep lockfiles and let Renovate's native managers update
  pins.
- Keep `README.md` to purpose and usage, other docs in the project root, and Git
  history as the work log, with one outcome per imperative commit. Create no
  unsolicited reports, migration notes or placeholders.
- Preserve licences. New projects use canonical AGPL-3.0.

### Addresses

- Derive links and hosts from their owning configuration and keep the intended
  private or public boundary. Prefer configured DNS, then Tailscale IP, then local
  hostname, then raw IP, honouring explicitly supplied endpoints and what the
  client can reach. Keep the real scheme, port and path; prefer HTTPS only where
  it is supported. Use absolute URLs where a browser or credential field needs
  them and keep host fields in their required format.

### Style & Sorting

- Use `.yaml`, not `.yml`, unless a tool fixes the filename.
- Use Australian English for prose and owned names; keep upstream names as
  defined. Use Title Case with `&` for headings, labels and actions, and
  sentence case for prose.
- Comment only non-obvious behaviour, locally.
- In unordered peer groups, put simple values before structured ones and sort
  alphabetically; directories before files. Preserve meaningful order.
