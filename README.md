# Agents

Shared agent guidance and self-written skills.

## Choose a Skill

Follow [Skill Selection](AGENTS.md#skill-selection) for shared activation boundaries
across Codex, OpenCode and Pi. The skills below support requested maintenance,
alignment and mini app development.
Ordinary feature development, targeted fixes and research do not require a broad
audit skill. Specialised tool skills retain their own domain-specific triggers.

## Contents

- [skills/](skills/): task procedures and their supporting references.
- [AGENTS.md](AGENTS.md): personal defaults, structure, sorting and completion rules.

Project-specific invariants and exceptions stay in each project's `AGENTS.md`.
Codex's system skills and vendor plugins stay in their application-managed locations.

## Licence

Guidance and skills use AGPL-3.0.

## Maintenance

Edit the files here; the application paths resolve through symlinks. Check
Markdown formatting, relative links and instruction consistency after prose
changes. Validate changed skills with the available skill validator.

## Setup

Workstation setup, application links, skill discovery and pinned upstream skill
installation are managed in
[Dotfiles](https://github.com/maxexcloo/dotfiles). Keep those definitions there;
this repository owns shared guidance and self-written task procedures. Personal
rules stay here so installed upstream packages can remain unmodified.

## Skills

| Skill                                                              | Use                                                                                               |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [build-mini-app](skills/build-mini-app/SKILL.md)                   | Build and publish browser tools and apps with optional backends, persistence and access controls. |
| [maintain-home-assistant](skills/maintain-home-assistant/SKILL.md) | Audit and maintain Home Assistant configuration, updates and organisation.                        |
| [maintain-projects](skills/maintain-projects/SKILL.md)             | Finish a bounded batch of issues, PRs, CI failures, updates and conformance checks.               |
| [maintain-systems](skills/maintain-systems/SKILL.md)               | Check and maintain live hosts, services, storage, backups and synchronisation.                    |
| [maintain-unifi](skills/maintain-unifi/SKILL.md)                   | Review UniFi device health, client naming, network settings and authorised cleanup.               |
| [standardise-1password](skills/standardise-1password/SKILL.md)     | Reconcile vaults, naming, fields and credential consumers without exposing values.                |
| [standardise-github](skills/standardise-github/SKILL.md)           | Review and align GitHub repository metadata and settings.                                         |
| [standardise-projects](skills/standardise-projects/SKILL.md)       | Simplify project structure, tooling, data ownership and instruction layers.                       |
