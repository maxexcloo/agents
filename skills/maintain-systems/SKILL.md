---
name: maintain-systems
description: Audit or complete a requested maintenance pass for live hosts, services, storage, backups and synchronisation. Exclude individual operational commands, targeted troubleshooting and repository or Home Assistant configuration maintenance.
---

# Maintain Systems

## Compare Ownership & Live State

Identify whether configuration belongs to a repository, platform, package or
application, then compare it with the running system. Repair it through its
existing delivery path so the next deployment will not overwrite the fix.

Distinguish expected offline devices and historical errors from current failures.
Check executable paths and runtime ownership before removing software; on macOS,
reconcile Homebrew, Mise, uv, casks and App Store installs without introducing a
second installation owner or polluting system interpreters.

For requested catalogue or profile reconciliation, read
[Model & Runtime Reconciliation](references/model-runtimes.md).

## Reconcile State & Consumers

Trace persistent data, mounts, snapshots, backup jobs and sync consumers before
renaming, migrating or removing components. Age, inactivity, an empty directory
or absence from one catalogue does not establish that state is disposable.

Preserve administrative access through network or authentication changes. Keep
service downtime proportional to the affected workflow. Honour explicit cleanup
and recovery instructions; do not add unsolicited backup layers. Verify a
replacement before retiring its authorised legacy copy, including leftover
configuration, launch jobs, shortcuts and caches.

## Verify the Result

Check affected clients, data or sync results and service recovery. A healthy
process or HTTP response does not prove the application's important workflow
works. Distinguish validated source, saved configuration and observed behaviour.
