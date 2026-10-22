# Tooling Standards

## Containers

- Start Dockerfiles with `# syntax=docker/dockerfile:1`.
- Set the standard OCI labels (`org.opencontainers.image.source`, `revision` from
  `github.sha` and `version`) in one place.
- Keep a `.dockerignore` beside each Dockerfile; keep every file the Dockerfile
  copies and exclude development-only file classes by wildcard.

## GitHub Actions

- Use the owner's `maxexcloo/dotfiles` action at `@main`.
- Scope secrets to the steps that need them and set `persist-credentials: false`
  on checkout.
- Group runs by workflow and ref and cancel superseded runs, except release tags.
  Queue instead only when change detection diffs against the previous push.
- Run checks, long suites and image builds as parallel jobs; only publication
  waits for all of them. Shard suites that take more than a few minutes.
- Build multi-architecture images without QEMU, by cross-compiling from
  `--platform=$BUILDPLATFORM` or using native runners.
- Key caches on the version that determines their contents. Save large
  incremental caches only from the default branch.
- Add no CodeQL default setup or other per-push scanners unless requested; they
  use runner time without gating merges. Identify required checks before enabling
  auto-merge.

## Hk

- Use Hk for Git hooks in `hk.pkl`, with builtins where they exist; Mise provides
  the tools they run. Skip hooks in small static repositories.
- Match step file patterns to formatter coverage, checking ignore files first.
- Run each validator once per check path; do not also run it through a nested
  task. Schema validators and semantic linters complement each other.

## Ignore Rules

- Ignore only generated, secret, cache, state or local-configuration paths the
  project actually produces, with narrow patterns and trailing slashes for
  directories. Skip anything global excludes already cover.
- Do not ignore an artefact just to hide it, and remove entries when their tool
  goes.

## Mise

- Inherit global tools and tasks; declare only project-specific tools or real
  compatibility overrides, and prefer a compatible system install (`system`).
- Use Oxfmt with defaults for supported formats, configured only for a real need
  such as ignoring generated files.
- Keep single-command `run` values inline; write several commands as a multiline
  string, one per line, not chained with `&&` or `;`.
- Use a small task vocabulary such as `check`, `fmt` and `setup`, adding others
  only when needed. Sort dependency tasks within their lifecycle section.

## Renovate

- Each repository's `renovate.json5` extends
  `github>maxexcloo/dotfiles//renovate/default.json5` and adds only its own
  exceptions.
- Rely on native and shared managers; mark other pins with a
  `# renovate: datasource=… depName=…` comment on the line above. Let Renovate
  refresh lockfiles. Group pins that must change together and keep compatibility
  holds and release-age policies.
- Run it locally: `dependencies:check` previews and `dependencies:update` opens
  PRs. Configure no hosted app, schedule or automerge unless requested.
- `check:updates` validates the configuration; confirm in the preview that each
  dependency is detected and resolves the expected version.

## Tests & Dependencies

- Use the smallest test framework the actual tests need; keep a larger one only
  for concrete value such as fixtures or integration tests.
- Trace a vulnerable transitive dependency to the tool that needs it; remove an
  unnecessary tool rather than maintaining its tree.
- When removing a tool, remove its whole footprint: declarations, lockfiles,
  configuration, CI setup and documented commands. Check the resolved graph
  afterwards.
