# Tooling Review

Read the sections relevant to the tools present in the project.

Preserve required behaviour when replacing tools, and keep related workflows
consistent.

## Ignore Rules

- Avoid copying generic ignore templates when global excludes or project tooling
  already cover the files.
- Do not ignore an undesirable artefact merely to silence it. For example, leave
  `.venv` visible when a project intentionally uses isolated temporary Python
  environments and should not create a repository-local environment.
- Ignore only generated, secret, cache, state, or local-configuration paths the
  project can actually produce.
- Keep entries compact and consistently sorted; add sections only when they
  materially improve comprehension.
- Prefer narrow patterns over broad patterns that could hide future source files.
- Prefer one concise wildcard only when it replaces multiple paths the project
  actually produces. Do not broaden rules for conceivable variants. Keep the
  pattern narrow enough that it cannot hide plausible source files, and use
  trailing slashes for directories.
- Remove obsolete ignore entries when the underlying tool or artefact is removed.
  Do not retain an ignore rule merely as a precaution.
- Review Docker ignore files independently from Git ignore files. Preserve every
  file copied by a Dockerfile and exclude development-only file classes rather
  than enumerating individual filenames when a safe wildcard exists.

## Mise

- Reuse inherited Mise tools and tasks; declare only project-specific tools or
  genuine compatibility overrides.
- Include tools used by development, CI, deployment, or documented operations.
  Check the actual executable and interpreter selected locally and in CI; avoid
  competing package managers for the same installation. For tools not already
  inherited, check for a compatible system installation before adding another copy.
  Use Mise's `system` version when suitable.
- Use Oxfmt and its defaults for supported formats; retain language-specific
  formatters and required project conventions. Add an Oxfmt configuration only
  for a real need, such as ignore patterns for generated or template files.
- Keep a single-command task's `run` value inline. For tasks that run multiple
  commands, use a multiline string with one command per line instead of chaining
  commands with `&&` or `;`.
- Keep pins with the configuration that owns the tool. Use native Mise commands
  to preview and upgrade tool pins, preserving compatibility exclusions. Recheck
  old pins against their original reason.
- Sort dependency tasks with the other tasks in their lifecycle section.
- Prefer a small common task vocabulary such as `check`, `fmt`, and `setup`.
  Add cleanup, deploy, plan, or apply tasks only where the project needs them.

## Hk & Pre-Commit

- Use Hk for Git hooks and declare its steps in `hk.pkl`. Keep a step to an Hk
  builtin where one exists, and add a custom step only for a check Hk does not
  provide. Hk does not install the tools its builtins invoke; Mise provides them.
- Do not add a hook framework to a small static repository unless it prevents a
  realistic error or unifies repeated commands.
- Make step file patterns match formatter coverage; for example, check Markdown
  when `mise run fmt` formats Markdown. Inspect formatter and linter ignore files
  before expanding a step pattern so the new trigger is not a no-op.
- Treat schema validators and semantic linters as complementary, not duplicates.
- Use Mise-managed local tools rather than creating another dependency layer.
- Use repository hygiene steps, schema validation, formatting, and language
  linters only where relevant.

## Updatecli

- Use Updatecli where its discovery or coordination saves concrete maintenance
  work. Prefer compact native crawlers for supported formats; complete coverage
  of every pin is not a requirement.
- Put native Mise upgrades, Python compilation and lockfile refreshes directly in
  Mise tasks rather than shell-based Updatecli policies. Preserve compatibility
  exclusions and review previews before applying upgrades.
- Keep explicit policies for embedded pins, paired revisions and versions that
  must change together. Keep discovery generators only where unsupported metadata
  or compatibility rules justify them; avoid building a general updater framework.
- Read versions, branches and endpoints from their owning configuration where
  possible. Update linked producers, consumers and lockfiles together.
- Preserve compatibility limits, source variants and release-age policies.
  Review major upgrades separately from routine updates.
- Keep workflows local and manual. Configure no SCM commits, pull requests,
  schedules or deployments unless explicitly requested.
- Keep hosted updater integrations disconnected to prevent duplicate changes.
- Resolve credentials inside the Updatecli-consuming process; never print
  authenticated generated manifests or place tokens in configuration files.
- Validate manifests in the existing check path with `updatecli manifest validate`,
  passing `--config .updatecli.d --strict` with placeholder credentials. Keep
  templating enabled: disabling it can skip manifest parsing. Schema validation
  does not prove discovery or update behaviour; verify previews and lockfile
  handling for the affected dependency formats.

## Tests & Dependencies

- Compare related repositories' complete verification stacks: test framework,
  dependency manifests, lockfiles, setup steps, CI commands, and documented local
  commands. Treat the test framework as tooling, not an unquestioned code choice.
- Prefer the smallest test framework that supports the repository's actual tests
  and established workspace conventions. Retain a larger framework when fixtures,
  parametrisation, plugins, or realistic integration testing provide concrete
  value; do not impose one framework on every repository.
- Trace a vulnerable transitive dependency to the tool and workflow that require
  it before trying to upgrade or replace it. If an unnecessary development or test
  tool is its only source, remove that tool instead of maintaining its dependency
  tree.
- When removing a tool, remove its complete footprint: dependency declarations,
  lockfiles, configuration, bootstrap steps, CI setup, maintenance rules, and
  documented commands.
