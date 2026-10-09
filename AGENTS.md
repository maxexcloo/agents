# Global Agent Guidance

## Completion

- Complete the agreed scope, verify relevant behaviour and conformance, and finish
  authorised delivery. Fix regressions caused by the work.
- If asked whether there is anything else, check the agreed scope and give an
  honest Done when appropriate. Do not invent more work to prolong the process.
- Keep the final report short: status, material changes, verification, required
  blockers and delivery state. Omit unsolicited next steps and improvement lists.
  Provide suggestions when requested; they do not extend the current required scope.
- Make completion criteria clear from the request. For broad maintenance, use one
  fixed batch of findings established at the start; later unrelated findings
  belong to a subsequent batch.
- Optional improvements, accepted risks and deferred unrelated issues do not
  prevent Done. Report material exceptions once without creating another task,
  issue or document unless requested.
- Run one final review after the last change. Repeat checks only for new changes,
  failures or unresolved evidence; do not restart a full audit to seek perfection.
- Use **Done** when required work and verification are complete, **Waiting** when
  an external result or decision is pending, and **Blocked** when required work
  cannot proceed. Required checks that could not run prevent an unqualified Done.

## Sorting

- GitHub workflow keys start with `name`, `on`, `permissions`, `concurrency`, then
  global configuration and `jobs`. Preserve job-step dependency order.
- Identifiers may lead list-item mappings. Follow project-specific identifier
  order; otherwise use `type`, `name`, `id`. Prek hooks use `id`, then `name`.
- In unordered peer groups, put simple or single-line values before structured or
  multi-line values; sort alphabetically within each group. Apply recursively to
  mappings, metadata, configuration objects, environment blocks and similar data.
- Preserve meaningful order: procedural, chronological, narrative, priority,
  dependency, fallback, routing, interface, UI, schema, hardware and calibration
  order. Add a short comment only when a meaningful order may look accidental.
- Sort Mise tools and tasks within lifecycle sections, Renovate rules by
  `description`, and Prek repositories predictably with hooks by `id`.
- Sort unordered peer headings, lists and table rows alphabetically. When listing
  directories and files together, put directories first and sort each group.

## Structure

- Keep check orchestration single-layered; avoid running a validator both directly
  and through a nested task in the same check path.
- Keep only `AGENTS.md` and `README.md` as root Markdown files. Put other needed
  maintained documentation in `docs/`, unless project rules specify otherwise.
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
- Use Australian English for authored prose and every project-owned name,
  including identifiers, configuration keys, environment variables, paths, CLI
  commands and options. Update producers and consumers together; add compatibility
  aliases only when requested. Preserve externally defined names and terminology,
  protocol and schema fields, standard filenames and legal text.
- Use Title Case for user-facing headings, labels and actions, with `&` instead of
  `And`. Keep explanatory prose in sentence case.

## Verification & Delivery

- Commit, push, merge, deploy or change live infrastructure only within existing
  user authorisation and project-specific review requirements.
- Distinguish static inspection, local checks, remote CI and live verification.
  State any checks that could not run.
- Run `git diff --check` and review the final diff and status after repository
  edits. Keep validation proportional to the change.
- Use the project's verification commands. Where a Mise `check` task exists, run
  `mise run check` after code or configuration changes, unless project rules specify
  narrower verification. For prose-only changes, check formatting, affected links
  and instruction consistency; project-specific requirements still apply.

## Working Agreements

- Ask only for missing intent or authorisation that materially affects the work.
  Complete already authorised work without asking again.
- Follow the current request and existing authorisation. Project-specific rules
  override these defaults; skills provide task procedures.
- Keep instructions layered: personal defaults here, project invariants and
  exceptions in project `AGENTS.md`, task procedures in skills, mechanical rules
  in checks. Do not copy this rulebook into each project.
- Keep it simple. Prefer native features, standard tools and direct code. Add a
  dependency, abstraction or automation only for a concrete need.
- Number audit findings and recommendations, grouped by project, host or topic.
  Give evidence, impact and the proposed change; keep applied fixes distinct from
  suggestions.
- Preserve intended behaviour and unrelated user changes. Define shared settings
  once, near their owner, and derive repeated information where practical.
- When sessions overlap, keep one owner for each change and coordinate edits to
  shared files.
