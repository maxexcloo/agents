# Global Agent Guidance

## Working Agreements

- Keep it simple. Prefer native features, standard tools, direct code and
  deleting things over adding them. Add a dependency, abstraction, layer or
  automation only for a concrete, current need.
- Project-specific rules override these defaults; skills provide task
  procedures. Project `AGENTS.md` files hold only scope, verification and
  invariants an agent would otherwise get wrong, never copies of these rules.
- An audit or review produces findings; loading a skill authorises nothing.
  Change files, commit, push, merge, deploy or change live infrastructure only
  within existing authorisation and project review requirements. Ask only for
  missing intent or authorisation that materially affects the work.
- Keep going until authorised work is complete and verified; do not stop to ask
  again or hand back partway. Stop only when blocked or when a decision is
  genuinely the user's.
- When asking questions, group them by topic so they fit on one screen, and
  number the options.
- Do not keep legacy compatibility, aliases or migration shims unless asked;
  change producers and consumers together and remove the old path.
- Preserve intended behaviour and unrelated user changes. Fix regressions your
  work causes, and update existing documentation the change affects.
- When other agents work in the same place, keep one owner for each change,
  coordinate edits to shared files and avoid running heavy tests or builds at
  the same time.
- Track work in `todo.md` at the root of the project's main checkout, or
  `todo-<topic>.md` for a separate stream. Git ignores both globally, so
  worktrees have no copy: use the first path from `git worktree list` and never
  create one in a worktree. Use no other names, such as `plan.md`. Keep
  `todo.md` short: one line per item in priority order, with detail in
  `todo-<topic>.md`. Read it before starting, add each request as an unchecked
  item when it arrives and note its owner and state while working. When an item
  is done, tick it, add a one-line outcome and move it under `## Done`; delete
  stale items, and done items once their outcome is merged and reported, as Git
  history is the lasting record.
- Split large independent work across parallel agents when it materially speeds
  things up.
- Do not take control of the desktop or open the user's browser without asking.
- Run commands yourself when permitted. A command for the user to paste must fit
  on one line without wrapping, so move long values into a script you write and
  have them run that; never split it or use backslash continuations, as a
  wrapped paste runs each line as a separate command.

## Audits & Reviews

- Lead with what is broken or risky, then list minor findings (naming, metadata,
  consistency, tidiness) briefly after it. Minor findings are welcome.
- Look for complexity to remove: needless layers, wrappers and indirection,
  duplication, custom code where a native feature fits, and values duplicated
  across files. Every fix should leave less behind.
- Flag things that do the same job differently within a project or across its
  siblings, and converge them on the established pattern.
- Judge everything against the project's established conventions so a fix stays
  fixed. Do not reopen settled choices, invent new conventions or flip earlier
  fixes; say so explicitly if a convention itself should change.
- Do not report hypotheticals or optional hardening as findings, and mark
  uncertain findings as questions. "Nothing needs changing" is a good result.
- Number findings, group them by project, host or topic, give evidence and
  impact, and keep applied fixes distinct from suggestions.
- Never propose new tools, frameworks, layers or process as a fix when a smaller
  change or a deletion would do.
- In a maintenance pass, fix the batch found at the start; later unrelated
  findings belong to the next pass. Do not invent work.

## Verification

- Verify the outcome the user cares about, not a proxy for it: a saved setting,
  a successful API response, a healthy process or passing CI does not show the
  workflow works. Keep validation proportional to the change.
- Add tests only where they protect behaviour that matters; prefer few, simple
  tests over broad suites. Do not add a test per fix, test that removed things
  stay absent or assert exact timing.
- Before removing, renaming or replacing something, trace its consumers and
  verify any replacement first. Absence from one search, age or inactivity does
  not make something unused.
- When tools or views disagree, report the discrepancy instead of acting further
  to make them agree.
- Do not block on slow reconciliations or long builds: verify the changed piece,
  report what is still pending and carry on.
- Run `git diff --check` and review the diff and status after repository edits.
  Use the project's checks, such as `mise run check`; run long suites
  asynchronously. For prose, check formatting, links and instruction
  consistency.
- Run one final review after the last change; repeat checks only for new
  changes, failures or unresolved evidence.
- State what was checked statically, locally, in CI and live, and any path that
  was not exercised.

## Delivery

- For ordinary changes, review the diff, run focused checks and merge to `main`
  without waiting for the full suite or remote CI. Use a PR where the project
  requires one; enable auto-merge when required checks block an immediate merge,
  without bypassing them. Keep image publication gated on its required checks.
  Pause for review before merging a large or complex change.
- Commit as the user, without AI co-author or attribution trailers.
- Finish by returning the checkout to `main`, removing the task's merged
  branches and worktrees and pruning stale remote-tracking references. Check for
  active sessions and uncommitted work first, reconcile the task's own stashes
  and scratch files, and never discard unrelated or unmerged work without
  authorisation.
- When asked for status mid-task, list what is done, what remains, blockers and
  a rough ETA.
- Keep the final report short: status, material changes, verification, blockers
  and delivery state. Report material exceptions once. Use **Done**, **Waiting**
  or **Blocked**; checks that could not run prevent an unqualified Done. End
  with numbered next steps when real ones remain; when nothing is left, say so.
- For site or app work, leave a local preview running and report its URL unless
  impractical. Distinguish sample data from live behaviour.

## Secret Values

- Keep secret values out of model context, tool output, logs, screenshots, diffs
  and reports. Prefer metadata-only discovery.
- Resolve secrets inside the consuming local process with the existing
  credential tools, never in command arguments or shell tracing. If a tool
  cannot keep values out of context, use a local path or ask for the missing
  capability.
- Reference 1Password items and other external records by title, never by
  generated ID.
- Inventory files with `git ls-files`, not shell globs, so ignored secret files
  stay out of context.

## Skills

- Use broad `maintain-*` and `standardise-*` skills only when a pass, audit or
  alignment is requested or the skill is named; never for a targeted fix or
  feature. `maintain-*` finds what is broken; `standardise-*` aligns with the
  standards.
- Use technology-specific skills (Orca, TerraShark and the like)
  only when that technology is requested or already in use, not because a task
  is loosely related. Preserve upstream skill names.

## Standards

Apply these when writing or changing code. In audits, report deviations as minor
findings.

### Structure

- When unsure how to structure something, match the sibling projects in
  `~/Projects` rather than inventing a new pattern.
- Define names, domains, versions and shared settings once, near their owner,
  including across repositories, where consumers use the owner's artefact.
  Derive values duplicated across files; hard-coding a cosmetic or single-use
  value is fine. Add no indirection harder to follow than the duplication it
  removes. Split mixed-concern files and organise directories predictably.
- Read required settings without defaults or fallbacks so a missing value fails
  with its name; a native lookup error is enough. Add no defensive validation
  of trusted inputs, and prefer deleting validation the provider or API already
  performs.
- State each invariant and behaviour once, in project `AGENTS.md`, a local
  comment or the docs, not several.
- Prefer Mise for tasks and npm for package-specific operations. Inherit global
  Mise tools and declare only project-specific ones.
- Keep checks fast and single-layered: run independent jobs in parallel, cancel
  superseded runs, and never run a validator both directly and through a nested
  task.
- Use major tags for GitHub Actions (the default branch where none is
  published), `latest` for CI and Mise tools unless one must be held back (say
  why in a one-line comment), and exact versions for deployed images, charts
  and providers. Never pin digests or Action SHAs, except `latest@sha256:` for
  an image that publishes only `latest`. Pin other fetched source without a
  suitable release to an immutable revision with a `# renovate:` comment,
  without checksums. Keep lockfiles and let Renovate's native managers update
  pins.
- Do not vendor third-party code; consume it as a package or a pinned
  dependency.
- Keep `README.md` to purpose and usage and other docs in the project root,
  using subdirectories only when volume or project convention warrants. Use Git
  history as the work log, with one outcome per imperative commit. Create no
  unsolicited reports, migration notes or placeholders.
- Preserve licences and legal text. New projects without an overriding
  requirement use canonical AGPL-3.0.

### Addresses

- Derive links and hosts from their owning configuration and keep the intended
  private or public boundary. Prefer configured DNS, then Tailscale IP, then
  local hostname, then raw IP, honouring explicitly supplied endpoints and what
  the client can reach. Keep the real scheme, port and path; prefer HTTPS only
  where it is supported. Use absolute URLs where a browser or credential field
  needs them and keep host fields in their required format.

### Style & Sorting

- Use `.yaml`, not `.yml`, unless a tool fixes the filename.
- Use Australian English for prose and new names the owner controls; keep
  upstream names as defined. Use Title Case with `&` for headings, labels and
  actions, and sentence case for prose.
- Comment only non-obvious behaviour, locally.
- In unordered peer groups, put simple values before structured ones and sort
  alphabetically; directories before files. Preserve meaningful order, such as
  document sections, with a comment only where it may look accidental.
