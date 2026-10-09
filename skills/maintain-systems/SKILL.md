---
name: maintain-systems
description: Audit and maintain live hosts, services, application settings, storage, backups and synchronisation. Use for system health or cleanup passes; repository-only upkeep belongs to maintain-projects and Home Assistant configuration to standardise-ha.
---

# Maintain Systems

Finish a bounded live-system maintenance pass with evidence of the actual result.

## 1. Establish Scope

1. Identify the requested hosts, services and exclusions. Distinguish an audit
   from an authorised fix batch and honour requested groups or pauses.
2. Discover how configuration is owned: repository, platform, package, application
   or manual setup. Compare intended configuration with the running system.
3. Establish one batch from current evidence. Expected offline devices, historical
   errors and accepted risks need not become fixes.

## 2. Inspect the Relevant Layers

- **Data & Storage:** Check mounts, datasets, permissions, capacity, snapshots,
  backup jobs and sync state. Compare real files with manifests or catalogue
  entries when data quality is in scope. Check broken links and duplicates without
  treating every old or unreferenced file as disposable.
- **Hosts & Software:** Check the installed OS, packages, images, firmware,
  failed units and relevant logs. Distinguish upstream defaults from project or
  user additions before removing software or configuration. Inspect executable
  paths and runtime ownership; on macOS, reconcile Homebrew, Mise, uv, casks and
  App Store installs without polluting system interpreters or duplicating owners.
- **Networks & Access:** Check intended names, DNS, routing, certificates and
  service reachability from the relevant client. Preserve working administrative
  access while changing network or authentication settings. Apply global address
  and URL preferences, including the endpoint's actual scheme, port and path.
- **Services & Configuration:** Check health, dependencies, persistent data,
  integration settings and consumers. Trace inventory through generated
  dashboards, monitoring and deployment configuration to find stale links.
- **Updates & Changes:** Compare installed versions with official release notes
  when updates or new capabilities are requested. Consider compatibility,
  migration requirements and whether an upstream feature replaces custom code.

Use targeted reads and relevant time windows. A healthy process or HTTP response
does not establish that the application's important workflow works.

## 3. Complete the Batch

Prioritise confirmed legacy, outdated or superseded components for cleanup.
Inspect dotfiles, launch jobs, shortcuts, broken links, application resources and
service configuration when relevant. Age, low activity or an empty directory
alone does not establish that state is disposable.

Fix configuration near its owner and reconcile it through the existing delivery
path. Avoid live edits that will be overwritten by the next deployment.

Before renames, migrations or removals, trace consumers and identify persistent
state. Establish the requested recovery path; do not create extra backup layers
by default. Preserve working copies until a requested migration is verified.
Delete data, snapshots, volumes or credentials only within explicit authorisation.
Honour explicit no-backup cleanup instructions without adding recovery copies.
Remove the retired component's verified leftovers across its owning layers.

Keep service restarts and downtime proportional to the change. After a change,
check the affected service and its clients; verify data or sync results where
relevant. Protect secret values when using logs and local commands.

## 4. Verify & Finish

Distinguish source validation, saved configuration and live behaviour. Check
service recovery, relevant logs and affected consumers after the last change.

Use the global completion criteria. Report numbered findings grouped by host or
service, then the batch status, verified changes and required gaps.
