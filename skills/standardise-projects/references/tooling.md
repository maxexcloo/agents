# Tooling Review

Read the sections relevant to the tools present in the project.

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

- Include tools used by development, CI, deployment, or documented operations.
  Check the actual executable and interpreter selected locally and in CI; avoid
  competing package managers for the same installation.
- Keep a single-command task's `run` value inline. For tasks that run multiple
  commands, use a multiline string with one command per line instead of chaining
  commands with `&&` or `;`.
- Pin current stable compatible tools where reproducibility is useful; let
  Renovate propose updates. Recheck old pins against their original reason.
- Prefer a small common task vocabulary such as `check`, `fmt`, and `setup`.
  Add cleanup, deploy, plan, or apply tasks only where the project needs them.

## Prek & Pre-Commit

- Do not add a hook framework to a small static repository unless it prevents a
  realistic error or unifies repeated commands.
- Make check filters match formatter coverage; for example, check Markdown when
  `mise run fmt` formats Markdown. Inspect formatter and linter ignore files before
  expanding a hook filter so the new trigger is not a no-op.
- Treat schema validators and semantic linters as complementary, not duplicates.
- Use Mise-managed local tools rather than creating another dependency layer.
- Use repository hygiene hooks, schema validation, formatting, and language
  linters only where relevant.

## Renovate

- Add a custom manager only when no native manager can discover the dependency.
  Document opaque regular expressions and keep their scope narrow.
- Enable managers or presets only for dependency formats present in the project.
- Keep automerge disabled unless the user explicitly requests unattended merges
  and required CI/branch protections have been verified.
- Keep major updates separate. Group minor updates and patch/pin updates when the
  reduced PR noise is worth the coupling.
- Look for pinned versions embedded in action inputs, scripts, and templates, not
  only standard manifests. Add maintenance rules only when the pin is intentionally
  reproducible and the update path justifies the extra configuration.
- Start with `config:recommended`.
- Use `:enablePreCommit` when a Prek/pre-commit config exists.
- Validate every Renovate configuration.

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
