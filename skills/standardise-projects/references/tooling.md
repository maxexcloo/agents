# Tooling Standards

## Containers

- Start Dockerfiles with `# syntax=docker/dockerfile:1`.
- Take OCI labels from `docker/metadata-action`.
- Add a `.dockerignore` only where context size or cache busting matters.

## GitHub Actions

- The owner's `maxexcloo/dotfiles` action may use `@main`.
- Scope secrets to the steps that need them and set `persist-credentials: false`
  on checkout.
- Group runs by workflow and ref and cancel superseded runs, except release
  tags. Prefer always building or `paths-ignore` over custom change detection.
- Split jobs or shard suites only when they take more than a few minutes.
- Gate image publication by building with `load` and smoke-testing, then
  pushing from the builder cache; push no candidate tags and add no image
  vulnerability scan.
- Build multi-architecture images without QEMU, by cross-compiling from
  `--platform=$BUILDPLATFORM` or using native runners.
- Add caches only where they measurably shorten runs, keyed on the version that
  determines their contents.
- Add no CodeQL default setup or other per-push scanners unless requested; they
  use runner time without gating merges. Identify required checks before
  enabling auto-merge.

## Hk

- Use Hk for Git hooks in `hk.pkl`, with builtins where they exist; Mise
  provides the tools they run. Skip hooks in small static repositories unless
  they prevent a realistic error.
- Match step file patterns to formatter coverage, checking ignore files first.
- Schema validators and semantic linters complement each other.

## Ignore Rules

- Ignore only generated, secret, cache, state or local-configuration paths the
  project actually produces, with narrow patterns and trailing slashes for
  directories. Skip anything global excludes already cover.
- Do not ignore an artefact the project should not produce; leaving it visible
  exposes the problem. Remove entries when their tool goes.

## Mise

- Inherit global tools and tasks; declare only project-specific tools or real
  compatibility overrides, and prefer a compatible system install (`system`).
- Use Oxfmt with defaults for supported formats, configured only for a real need
  such as ignoring generated files.
- Keep single-command `run` values inline; write several commands as a multiline
  string, one per line, not chained with `&&` or `;`.
- Use a small task vocabulary such as `check`, `fmt` and `setup`. Add a task
  only for several commands or one the shared tasks lack. Sort dependency tasks
  within their lifecycle section.

## Renovate

- Each repository's `renovate.json5` extends
  `github>maxexcloo/dotfiles//renovate/default.json5` and adds only its own
  exceptions.
- Rely on native and shared managers; mark other pins with a
  `# renovate: datasource=… depName=…` comment on the line above, which the
  shared preset reads, and add no local regex managers. Let Renovate
  refresh lockfiles. Group pins that must change together and keep compatibility
  holds and release-age policies.
- The Mend Renovate app runs it on GitHub; the shared preset owns grouping,
  automerge and major approval, so add no local Renovate or Mise update tasks.
- `check:updates` validates the configuration; confirm on the Dependency
  Dashboard that each dependency is detected and resolves the expected version.

## Tests & Dependencies

- Use the smallest test framework the actual tests need; keep a larger one only
  for concrete value such as fixtures or integration tests.
- Trace a vulnerable transitive dependency to the tool that needs it; remove an
  unnecessary tool rather than maintaining its tree.
- When removing a tool, remove its whole footprint: declarations, lockfiles,
  configuration, CI setup and documented commands. Check the resolved graph
  afterwards.
