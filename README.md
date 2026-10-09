# Agents

Shared agent guidance, skills and discovery configuration.

## Choose a Skill

Use `maintain-projects` for routine repository work and `maintain-systems` for live
systems. Use the relevant `standardise-*` skill for deliberate alignment, and
`improve-interfaces` for UI/UX work. Choose by the requested outcome; do not run
every audit because a task touches several technologies.

Ordinary feature development and research use the agent's normal capabilities.
Completion, KISS, prose, naming and sorting remain shared defaults in `AGENTS.md`.

## Contents

- [config/](config/): shared skill discovery, sandbox wrappers and agent launch commands.
- [skills/](skills/): task procedures and their supporting references.
- [AGENTS.md](AGENTS.md): personal defaults, structure, sorting and completion rules.

Project-specific invariants and exceptions stay in each project's `AGENTS.md`.
Codex's system skills and vendor plugins stay in their application-managed locations.

## Launch Modes

| Agent       | Standard      | Infra               | Docker               | Unsafe               |
| ----------- | ------------- | ------------------- | -------------------- | -------------------- |
| AGY         | `agy`         | `agy-infra`         | `agy-docker`         | `agy-unsafe`         |
| Antigravity | `antigravity` | `antigravity-infra` | `antigravity-docker` | `antigravity-unsafe` |
| Codex       | `codex`       | `codex-infra`       | `codex-docker`       | `codex-unsafe`       |
| OpenCode    | `opencode`    | `opencode-infra`    | `opencode-docker`    | `opencode-unsafe`    |
| Pi          | `pi`          | `pi-infra`          | `pi-docker`          | `pi-unsafe`          |

Standard uses the shared sandbox. Infra adds 1Password, Kubernetes and SSH
access plus the infrastructure profile. Docker inherits infra and adds Docker
access. Unsafe bypasses Safehouse. Shared launchers are `safe`, `safe-docker`
and `safe-infra`.

## Licence

Original guidance and skills use AGPL-3.0. Upstream resources retain their licences.

## Maintenance

Edit the files here; the application paths resolve through symlinks. Check
Markdown formatting, relative links and instruction consistency after prose
changes. Validate changed skills with the available skill validator.

TerraShark is an upstream submodule with its own licence and documentation.
Update its pin deliberately; avoid replacing it with an untracked nested clone.

## Setup

Clone with the pinned upstream skill:

```sh
git clone --recurse-submodules https://github.com/maxexcloo/agents.git
cd agents
```

The shared directory is linked as `~/.agents`. Review any existing files before
creating links; these commands are for a fresh setup.

```sh
mkdir -p "$HOME/.codex" "$HOME/.config/fish/conf.d" "$HOME/.config/opencode" "$HOME/.gemini/config" "$HOME/.pi/agent"
ln -s "$PWD" "$HOME/.agents"
ln -s "$HOME/.agents/AGENTS.md" "$HOME/.codex/AGENTS.md"
ln -s "$HOME/.agents/AGENTS.md" "$HOME/.config/opencode/AGENTS.md"
ln -s "$HOME/.agents/AGENTS.md" "$HOME/.gemini/AGENTS.md"
ln -s "$HOME/.agents/config/antigravity/skills.json" "$HOME/.gemini/config/skills.json"
ln -s "$HOME/.agents/AGENTS.md" "$HOME/.pi/agent/AGENTS.md"
for agent_config in "$PWD"/config/fish/conf.d/*; do
    ln -s "$agent_config" "$HOME/.config/fish/conf.d/${agent_config##*/}"
done
```

The guidance links serve Antigravity, Codex, OpenCode and Pi. Shared skills are
available through `~/.agents/skills`; Antigravity uses the linked discovery config.
The shared Fish wrapper grants read access to the resolved guidance checkout,
including when an agent runs from another project. Start a new Fish session to
load updated launch functions.

## Skills

| Skill                                                          | Use                                                                                 |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [improve-interfaces](skills/improve-interfaces/SKILL.md)       | Review and simplify UI, UX, flow and interaction performance.                       |
| [maintain-projects](skills/maintain-projects/SKILL.md)         | Finish a bounded batch of issues, PRs, CI failures, updates and conformance checks. |
| [maintain-systems](skills/maintain-systems/SKILL.md)           | Check and maintain live hosts, services, storage, backups and synchronisation.      |
| [standardise-1password](skills/standardise-1password/SKILL.md) | Reconcile vaults, naming, fields and credential consumers without exposing values.  |
| [standardise-github](skills/standardise-github/SKILL.md)       | Review and align GitHub repository metadata and settings.                           |
| [standardise-ha](skills/standardise-ha/SKILL.md)               | Audit Home Assistant and complete requested fixes.                                  |
| [standardise-projects](skills/standardise-projects/SKILL.md)   | Simplify project structure, tooling, data ownership and instruction layers.         |
| [terrashark](skills/terrashark/SKILL.md)                       | Review Terraform/OpenTofu failure modes using the pinned upstream package.          |

Each task defines its scope and follows the global **Done**, **Waiting** and
**Blocked** criteria. Optional improvements do not extend a completed batch.
