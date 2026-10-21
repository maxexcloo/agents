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
- Hold a tool back from `latest` only when it must be, with a one-line comment
  giving the reason, in the configuration that owns it; recheck held-back
  versions against that reason.
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

## Renovate

- Give each repository a `renovate.json5` that extends
  `github>maxexcloo/dotfiles//renovate/default.json5` and adds only its own
  exceptions, such as compatibility holds, ignored paths or datasource overrides.
- Rely on native managers and the shared generic managers. Mark any other pin
  with a `# renovate: datasource=… depName=…` comment on the line above rather
  than adding a per-file manager, generator or script.
- Let Renovate refresh lockfiles and compiled requirements through its native
  managers; do not add refresh hooks.
- Read versions, branches and endpoints from their owning configuration where
  possible. Group producers, consumers and pins that must change together.
- Preserve compatibility limits, source variants and release-age policies.
  Review major upgrades separately from routine updates.
- Run Renovate locally: `dependencies:check` previews through the local platform
  and `dependencies:update` opens pull requests for review. Configure no hosted
  app, schedule, automerge or deployment unless explicitly requested.
- Validate with `check:updates`. Validation does not prove discovery; confirm in
  the preview that each affected dependency is extracted and resolves the
  expected version.

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

## Containers

- Start Dockerfiles with `# syntax=docker/dockerfile:1`.
- Set standard OCI labels (`org.opencontainers.image.source`, `revision` from
  `github.sha` and `version`) in one place.
- Add a `.dockerignore` alongside each Dockerfile.

## GitHub Actions

- The owner-controlled `maxexcloo/dotfiles` action may use `@main`.
- Scope secrets to the steps that need them and set `persist-credentials: false`
  on checkout.
- Group runs by workflow and ref and cancel superseded runs, except release tags.
  Queue instead only when change detection diffs against the previous push; prefer
  diffing against the last successful run so cancelling stays safe.
- Run checks, long test suites and image builds as parallel jobs, and make only the
  publishing job wait for all of them. Shard browser or integration suites across
  a matrix once they take more than a few minutes.
- Build multi-architecture images without QEMU: cross-compile from
  `--platform=$BUILDPLATFORM`, or build each architecture on a native runner.
- Key caches on the version that determines their contents rather than a whole
  configuration file. Save large incremental caches only from the default branch.
- Do not add CodeQL or other scanners that run on every push unless requested; they
  occupy runner slots without gating merges.
