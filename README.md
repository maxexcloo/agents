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
incident, and remove or merge an older rule when adding one. Each rule lives in
one place.

## Setup

[Dotfiles](https://github.com/maxexcloo/dotfiles#shared-agent-guidance) links
this checkout into each agent and enables it as a Claude Code plugin.

## Skills

| Skill                                                                                | Use                                                                                               |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [build-home-assistant-integration](skills/build-home-assistant-integration/SKILL.md) | Develop, test and release HACS custom integrations.                                               |
| [build-mini-app](skills/build-mini-app/SKILL.md)                                     | Build and publish browser tools and apps with optional backends, persistence and access controls. |
| [maintain-home-assistant](skills/maintain-home-assistant/SKILL.md)                   | Audit and maintain Home Assistant configuration, updates and organisation.                        |
| [maintain-projects](skills/maintain-projects/SKILL.md)                               | Audit or complete a maintenance pass covering issues, PRs, CI and updates.                        |
| [maintain-systems](skills/maintain-systems/SKILL.md)                                 | Check and maintain live hosts, services, storage, backups and synchronisation.                    |
| [maintain-unifi](skills/maintain-unifi/SKILL.md)                                     | Review UniFi device health, client naming, network settings and authorised cleanup.               |
| [standardise-1password](skills/standardise-1password/SKILL.md)                       | Reconcile vaults, naming, fields and credential consumers without exposing values.                |
| [standardise-projects](skills/standardise-projects/SKILL.md)                         | Align repositories and GitHub settings with the standards.                                        |
