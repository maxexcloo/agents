# Global Agent Guidance

## Addresses & URLs

- Derive service links and host addresses from their owning inventory or provider
  configuration. Preserve the intended private or public access boundary.
- Keep host fields in their required format; construct absolute URLs where a
  browser or credential field needs them.
- Prefer configured service DNS, then Tailscale IP, then local hostname/DNS, then
  raw IP. Honour explicitly supplied endpoints and the client's reachability.
- Preserve the actual scheme, port and path. Prefer HTTPS when supported; use
  HTTP for services that require it rather than inventing an HTTPS endpoint.

## Completion

- Complete the agreed scope, verify it and finish authorised delivery; fix
  regressions the work causes. For broad maintenance, fix one batch of findings at
  the start; later unrelated findings belong to the next batch. Do not invent work.
- Run one final review after the last change. Repeat checks only for new changes,
  failures or unresolved evidence; do not restart a full audit.
- Keep the final report short: status, material changes, verification, blockers
  and delivery state. Report material exceptions once; omit unsolicited next steps.
- Use **Done** when required work and verification are complete, **Waiting** when
  an external result or decision is pending, and **Blocked** when required work
  cannot proceed. Required checks that could not run prevent an unqualified Done.

## Secret Values

- Prefer metadata-only discovery. Keep secret values out of model context, tool
  output, screenshots, logs, diffs and reports.
- Resolve secret values inside credential-consuming local processes using the
  existing credential tools. Do not embed values in command arguments or shell
  tracing. Report item references and redacted results.
- If a tool cannot keep secret values out of context, use a suitable local path
  or request the missing capability.

## Skill Selection

- Choose a skill by the requested outcome. Broad maintenance and standardisation
  skills require a requested pass, audit or reconciliation, or an explicit skill
  mention. A technology mention, individual command, targeted fix or ordinary
  feature request is insufficient.
- Use `maintain-*` for audits and upkeep, `standardise-*` for deliberate alignment
  of organisation, structure or settings. Preserve upstream skill names.
- Use Orca skills for explicit Orca requests or existing Orca-owned state.
  Generic delegation uses the session's native tools; honour the chosen runtime.
- Use TerraShark only for Terraform/OpenTofu work. Generic CI or delivery/testing
  pipeline work does not activate it.
- Use Web Awesome skills when requested or already used by the project. Generic
  UI work does not establish a new component-library choice.

## Sorting

- In unordered peer groups, put simple values before structured or multi-line
  values and sort alphabetically within each group; list directories before files.
- Preserve meaningful order, such as procedural, dependency, precedence, priority,
  schema or UI order. Comment only where it may look accidental.

## Structure

- Prefer Mise for task orchestration; use npm for package-specific operations.
- Inherit globally managed Mise tools; declare only project-specific tools or
  genuine compatibility overrides.
- Keep check orchestration single-layered; avoid running a validator both directly
  and through a nested task in the same check path.
- Prefer maintained Markdown documentation in the project root. Use subdirectories
  when the volume of documentation or established project conventions warrant them.
- Keep `README.md` focused on purpose and actual usage. Use Git history as the
  work log; keep one coherent outcome per commit with an imperative subject.
- Preserve licences and legal text. For a new project without an overriding
  requirement, use canonical AGPL-3.0 text.
- Update existing documentation when necessary. Create no unsolicited reports,
  migration notes, work logs, placeholders or speculative directories.

## Style

- Keep comments local and specific to non-obvious behaviour.
- Use `.yaml`, never `.yml`, for project-owned YAML unless an external tool requires
  a fixed filename.
- Use Australian English for authored prose and new names the owner controls.
  Keep ecosystem names as upstream defines them, such as environment variables,
  CLI options like `color`, protocol and schema fields, standard filenames and
  legal text. Rename owned names in producers and consumers together.
- Use Title Case for user-facing headings, labels and actions, with `&` instead of
  `And`. Keep explanatory prose in sentence case.

## Verification & Delivery

- Distinguish static inspection, local checks, remote CI and live verification.
  State any checks that could not run and any live or externally triggered
  workflow path that was not exercised.
- Run `git diff --check` and review the final diff and status after repository
  edits. Keep validation proportional to the change.
- Use the project's verification commands. Where a Mise `check` task exists, run
  `mise run check` after code or configuration changes, unless project rules specify
  narrower verification. For prose-only changes, check formatting, affected links
  and instruction consistency; project-specific requirements still apply.
- For site or app review, prefer a running local preview that the user can explore.
  Reuse the project's development command and distinguish sample data or simulated
  operations from live behaviour. Screenshots support the preview. Leave it running
  for review and report its reachable URL unless running it is impractical.

## Working Agreements

- An audit or review produces findings; loading a skill authorises nothing.
  Change files, commit, push, merge, deploy or change live infrastructure only
  within existing user authorisation and project review requirements. Ask only for
  missing intent or authorisation that materially affects the work; complete
  already authorised work without asking again.
- Project-specific rules override these defaults; skills provide task procedures.
- Keep instructions layered: personal defaults here, project invariants and
  exceptions in project `AGENTS.md`, task procedures in skills, mechanical rules
  in checks. A project needs an `AGENTS.md` only for invariants an agent would
  otherwise get wrong; keep it to scope, invariants and verification, never copied
  global rules.
- Keep it simple. Prefer native features, standard tools and direct code. Add a
  dependency, abstraction or automation only for a concrete need.
- Number findings, recommendations and options so the user can select them.
  Group audit findings by project, host or topic with evidence, impact and the
  proposed change; keep applied fixes distinct from suggestions.
- Preserve intended behaviour and unrelated user changes. Define shared settings
  once, near their owner, and derive repeated information where practical.
- When sessions overlap, keep one owner for each change and coordinate edits to
  shared files.
