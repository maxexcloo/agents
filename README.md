# Agents

Shared agent guidance and self-written skills.

## Contents

- [skills/](skills/): task procedures and their supporting references.
- [AGENTS.md](AGENTS.md): personal defaults, audit, verification and delivery rules and standards.

Project-specific invariants and exceptions stay in each project's `AGENTS.md`.
Codex's system skills and vendor plugins stay in their application-managed locations.

## Licence

Guidance and skills use AGPL-3.0.

## Maintenance

Edit the files here, as the application paths are symlinks to them. After prose
changes, check Markdown formatting, relative links and that the instructions
still agree with each other. Validate changed skills with the available skill
validator.

Keep the rules few. Fix a one-off mistake where it happened; add a rule only when
the same mistake recurs, written as the general principle rather than the
incident, and remove or merge an older rule when adding one.

## Setup

[Dotfiles](https://github.com/maxexcloo/dotfiles#shared-agent-guidance) links
this checkout into each agent and enables it as a Claude Code plugin.
