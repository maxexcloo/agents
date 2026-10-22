# To Do

## Skills & Guidance Feedback

From the trmnl-builds KISS audit (2026-10-22).

- [ ] standardise-projects: "Patches and overrides must fail clearly when
      upstream assumptions stop matching" led to custom `--check`, reverse-check
      and error wrapping around `git apply`. Say a native failure counts as
      clear.
- [ ] Global guidance: audits must not report optional hardening, but nothing
      stops agents adding it. Add "No defensive validation of trusted inputs".
- [ ] Global guidance: agents add a test with each fix (tests reached 422 lines
      for 328 lines of code). Say not to add a test per fix.
- [ ] Global "Use major tags for GitHub Actions" ignores Actions that publish no
      major tag, such as `astral-sh/setup-uv`. Add "where published" so agents
      do not switch to a tag that does not exist.
- [ ] Move rarely relevant sections to references: maintain-projects fork
      alignment and history rewriting, standardise-projects GitHub Settings,
      tooling.md Containers and Hk.
- [ ] Remove duplication: "look for complexity to remove" appears in global
      Audits, maintain-projects step 4 and the standardise-projects intro; keep
      it in one place.
- [ ] maintain-projects tells agents to open updates with
      `dependencies:update` even in an audit; scope that step to fix passes.
- [ ] Project `AGENTS.md` files drift into requirements specs and repeat code
      comments, and agents follow stale rules (trmnl-builds had a platform-bump
      rule contradicting its Renovate hold). Remind that project rules stay
      minimal and are updated with the code they describe.

From the maxexcloo KISS audit (2026-10-22).

- [ ] standardise-projects has no exit for docs-only repositories, so agents
      read tooling.md and GitHub Settings for a three-file README repo. Add "For
      repositories without tooling, check content and links and stop."
- [ ] maintain-projects opens with "and fix it", which contradicts the global
      "An audit produces findings", and its inventory assumes Mise and CI. Drop
      "and fix it" and add "Skip steps whose tooling is absent."
- [ ] Global "Minor findings are welcome" and "report deviations as minor
      findings" push agents to always find something; maxexcloo has 52 commits
      on three files. Report minor findings only when they prevent churn.
- [ ] Global Verification and Delivery assume code projects (`mise run check`,
      previews, branch cleanup). Keep principles globally and move commands into
      the skills.

From the signtools-builder KISS audit (2026-10-22).

- [ ] Agents record each fix as code, a test, a project `AGENTS.md` rule, a
      README paragraph and an inline comment (signtools-builder stated its
      upstream re-review rule three times). Add "State each invariant once, in
      `AGENTS.md` or a local comment; the README does not repeat it."
- [ ] Shared Mise `check` omits `test:python` and there is no shared `fmt`
      aggregate, so every repository with tests copies the check list and drifts
      (signtools-builder silently dropped `check:shell`). Add `test:python`,
      skipped without `tests/`, and a shared `fmt` so most project
      `.mise.toml` files can go.
- [ ] standardise-projects "name the need, the owner and the consumers" for each
      change pushes toward write-ups over deletions; limit it to removals.

From the tofusort KISS audit (2026-10-22).

- [ ] tooling.md "Run checks, long suites and image builds as parallel jobs;
      only publication waits" would split a two-job, two-minute pipeline into
      three. Limit it to suites slow enough for parallelism to matter.
- [ ] tooling.md "Keep a `.dockerignore` beside each Dockerfile … exclude
      development-only file classes by wildcard" invites churn on multi-stage
      scratch images (tofusort #35 and #36 share one title). Require it only
      where context size or cache busting matters.
- [ ] tooling.md "Set the standard OCI labels … in one place" reads as a to-do
      though `docker/metadata-action` already sets them. Cut it or say the
      action's labels suffice.
- [ ] tooling.md "adding others only when needed" did not stop one-line wrapper
      tasks (`install`, `cleanup`, `lint`). Say "add a task only for more than
      one command or a command the shared tasks lack".
- [ ] Global "update existing documentation the change affects" plus a project
      rule to update the README and `docs/architecture.md` kept the same
      behaviour in three files. Say behaviour is documented once.

From the local-services KISS audit (2026-10-22).

- [ ] Global Audits "hard-coded values that could be derived or discovered"
      invites indirection in tiny repositories, such as variables for a single
      image version. Limit it to values duplicated across files.
- [ ] Project `AGENTS.md` files copy global rules despite the global ban
      (local-services repeated Renovate, image pinning, README and validation
      rules). Have standardise-projects check for and delete such copies.
- [ ] Confirms the minor-findings and duplicated "complexity to remove" items
      above: local-services had about 15 simplify commits in a week on six files.

From the minilab KISS audit (2026-10-22).

- [ ] Confirms the "derived or discovered" item above: minilab derived a port
      and data path through placeholders (`port: 0`, `/placeholder`) and
      replacements, backed by a project rule. Apply the same limit to
      maintain-projects Inventory step 4, which repeats the phrase.
- [ ] build-mini-app's secret-link lines ("carry the link in a URL fragment"
      when logs record paths, "note rotation behaviour beside the app") conflict
      with minilab's accepted Traefik logging, so audits re-raise it. Scope them
      to new apps or cut them.
- [ ] Moving project rules out of global guidance put Kubelab-owned rules (DNS
      targets, wildcard certificate depth) into minilab's `AGENTS.md`. Move
      platform rules to the repository that owns the platform.

From the bluemax KISS audit (2026-10-22).

- [ ] tooling.md "Queue instead only when change detection diffs against the
      previous push; prefer diffing against the last successful run" treats
      custom change detection as normal. bluemax carried 22 lines of diff logic,
      a queue, a skip-list rule and a README paragraph to skip docs builds. Say
      "Cancel superseded runs; prefer always building or `paths-ignore` over
      custom change detection." Once no workflow uses `queue`, drop the
      actionlint ignore in the shared `check:actions`.
- [ ] Global "sort alphabetically" in peer groups put bluemax's README Licence
      section between Installation and Streaming. Exempt document sections and
      other prose order.
- [ ] Confirms the AGENTS.md copy, duplicated "complexity to remove" and
      rarely-relevant-sections items above: bluemax's `AGENTS.md` repeated the
      README and the global check rule, and maintain-projects fork alignment and
      tooling.md Containers, Hk, Mise and Tests did not apply.

From the flylab KISS audit (2026-10-22).

- [ ] Confirms the "derived or discovered" item above: flylab derived route
      node placement from rendered manifests (about 90 lines) only for a
      display suffix Homepage already gets from live pods. Say hard-coding
      cosmetic or rarely changing values is fine.
- [ ] Global "Reference 1Password items by title, never by generated ID" plus
      the vault title `Cluster: SYD` produced flylab's title-to-ID lookup code.
      Add "Keep vault and item titles reference-safe" or allow IDs where titles
      cannot be expressed.
- [ ] Global "Read required settings without defaults so a missing value fails
      with its name" invites hand-written type checks on trusted inputs (flylab
      duplicated Kubelab's metadata validation). Say a native `KeyError`
      satisfies it.
- [ ] standardise-projects GitHub Settings (pagination, plan limits, topic
      replacement) is written for an organisation-wide sweep; for one
      repository a one-line settings check would do.
- [ ] Confirms the tofusort Containers items, the maintain-projects "and fix it"
      and `dependencies:update` items and the rarely-relevant-sections item:
      flylab deploys to Fly without publishing an image, and fork alignment
      did not apply.
- [ ] The secret-guard hook blocks any command that names the secrets env file,
      even when it holds only 1Password references or the command only hashes
      it. Match secret values, not filenames.

From the images KISS audit (2026-10-22).

- [ ] Confirms the bluemax change-detection item: images carried a last-success
      baseline lookup, a "main has advanced" API guard, an ancestry check, their
      tests and two README paragraphs, all following tooling.md's "prefer
      diffing against the last successful run".
- [ ] Confirms the trmnl-builds patch item: "fail clearly" produced a MiniMax
      patch with a hash check, a count check, reverse patching and a legacy
      variant, kept after the patch moved from container start to build time.
- [ ] maintain-projects "When a fix retires a feature, remove its configuration,
      consumers and outputs" misses tests and docs: images kept tests and a
      README paragraph asserting a removed recipe stayed removed. Add "tests and
      documentation".
- [ ] Global "Define … once, near their owner" is read per repository: the GPU
      lease helper and its tests were copied byte-for-byte between ai-control
      and images. Say it applies across repositories; consumers mount or copy
      the owner's artefact.
- [ ] Confirms the fork-alignment, `dependencies:update` and Hk
      rarely-relevant items: none applied to images.

From the esphome KISS audit (2026-10-22).

- [ ] tooling.md "Key caches on the version that determines their contents.
      Save large incremental caches only from the default branch" produced a
      version-reading step, two caches and a main-only save for one compile.
      Limit it to caches that measurably shorten runs.
- [ ] Confirms the `dependencies:update` and fork-alignment items: neither
      applied to esphome.
- [ ] Confirms the project `AGENTS.md` item: esphome's restated global rules
      (meaningful order, omit defaults, verification) and README commands.
- [ ] The shared Mise action runs `jq` in its `project-tools` step, so every
      caller must list `jq` in `tools`. The action should provide its own
      dependency.
- [ ] tooling.md says to mark pins with `# renovate:` comments, but esphome
      grew a local regex manager duplicating the shared `git-refs` comment
      manager. Name the shared managers so agents reuse them.
- [ ] Bulk reads with a shell glob (`cat *.yaml`) pulled a gitignored secrets
      file into context; the secret-guard hook reported a redaction but the
      persisted output kept the values. Say to inventory with `git ls-files`.

From the homeassistant-energy-locals-integration KISS audit (2026-10-22).

- [ ] build-home-assistant-integration "Test every flow step end to end: success,
      each error, duplicate abort, unique ID mismatch …" contradicts the global
      "few, simple tests" (tests had reached 335 and 615 lines). Limit it to
      paths that risk data loss or block reauthentication.
- [ ] Project invariants such as "never overwrite statistics with incomplete
      history" each drew another safety layer (#19, #29, `62a2368`), ending in
      a persisted reset state machine with rollback. Add "Meet an invariant
      with the smallest mechanism; add no recovery path for a state the user
      can fix with an existing action."
- [ ] Confirms the Actions major-tag item above: with no major tag published, a
      session pinned HACS and Hassfest to SHAs, breaking the global no-SHA rule.
- [ ] Confirms the shared `check` item above: both Home Assistant integrations
      copy the shared check list to add `test:python`, and a `check:*` wildcard
      is no substitute because it also runs checks the shared `check` omits.

From the dotfiles KISS audit (2026-10-22).

- [ ] Global "Pin fetched source … to an immutable revision" produced checksums
      and a documented manual update process for the chezmoi skill externals,
      which kept Renovate out. Say a `# renovate:` comment on an immutable
      revision is enough; checksums are not needed.
- [ ] tooling.md Hk "Skip hooks in small static repositories" would drop the
      only ShellCheck coverage of the extensionless secret-guard hook, which
      the shared `check:shell` (`*.sh` only) misses. Note the exception, or let
      `check:shell` find scripts by shebang.
- [ ] Confirms the shared `check` item: the dotfiles audit found the aggregate
      unused and proposed deleting it and its input guards, the opposite of
      extending it. Extending it won (dotfiles `simplify-tooling`); say shared
      task changes go through the dotfiles owner so parallel audits converge.
- [ ] Confirms the rarely-relevant-sections and Verification/Delivery items:
      GitHub Settings, Delivery and Addresses did not apply to the dotfiles
      audit.
- [ ] Global "Use Australian English … keep upstream names" adds noise to every
      session for little effect; fold it into one Style line.

From the homeassistant-beszel-integration KISS audit (2026-10-22).

- [ ] Global "Never pin … Action SHAs" contradicts "Pin fetched source without
      a suitable release to an immutable revision"; the second rule produced
      the HACS and Hassfest SHA pins. Exempt GitHub Actions from it (confirms
      the Actions major-tag item).
- [ ] Global "Do not keep legacy compatibility … or migration shims unless
      asked" pulls against build-home-assistant-integration ("Changing an ID
      requires a registry migration") and project stable-name rules; agents
      resolved it by adding migrations plus README migration notes. Say that
      published integrations migrate in code and describe upgrades only in
      release notes.
- [ ] build-home-assistant-integration pushes beyond what small integrations
      need: "Test every flow step end to end: success, each error, duplicate
      abort, unique ID mismatch…" contradicts "prefer few, simple tests";
      "typed through a `ConfigEntry[...]` alias" invites a typing layer in
      untyped code; `_abort_if_unique_id_mismatch` in reconfigure is wrong
      where reconfigure deliberately changes host or username. Cut or soften.
- [ ] build-home-assistant-integration Pins & Checks repeats what project
      `AGENTS.md` files and the shared Renovate preset say; keep it in the
      skill only (confirms the project `AGENTS.md` item).
- [ ] Confirms the rarely-relevant-sections item: maintain-projects Fix &
      Verify and fork alignment, standardise-projects GitHub Settings and the
      global Addresses, local preview and parallel-agent rules did not apply.

From the homelab KISS audit (2026-10-22).

- [ ] Confirms the flylab required-settings item: homelab's SSH and client sync
      scripts gained hand-written "required and must be a non-empty string"
      checks and a unittest asserting their messages, though `yq -e` already
      fails naming the path.
- [ ] Confirms the "derived or discovered" item: homelab's published host
      address chains five fallbacks for one cluster, and one step could never
      return a value.
- [ ] Global audit rules say not to report optional hardening, but nothing says
      to remove guards that duplicate the provider or API. homelab carries 32
      OpenTofu preconditions and validations (Tailscale tags, CNAME conflicts,
      OCI shape limits, one-time adoption checks). Add "Prefer deleting
      validation the provider or API already performs." The auto mode
      classifier blocked removing them, and even read-only greps for them, as
      "Security Weaken", so these removals need explicit owner approval.
- [ ] homelab `AGENTS.md` "prefer write-only arguments" plus "automatic tracking"
      of 1Password versions produced 20+ timestamp `terraform_data` resources
      and a `pow(2, 61)` offset, though most values are already in state.
      Switching to plain values was blocked as security weakening, so the owner
      must choose: keep the rule, or accept the secrets in state and cut it.
      The TrueNAS adoption paragraph and Control D exception there are change
      history, and the Style ordering rules are cosmetic; trim them.
- [ ] Confirms the `dependencies:update` and rarely-relevant-sections items:
      GitHub Settings and tooling.md Containers did not apply to homelab.
