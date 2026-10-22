---
name: maintain-systems
description: Audit or complete a requested maintenance pass for live hosts, services, storage, backups and synchronisation. Exclude individual operational commands, targeted troubleshooting and repository or Home Assistant configuration maintenance.
---

# Maintain Systems

## Inventory

1. Current failures: services, storage, backups and sync jobs. Separate them from
   historical errors and devices that are expected to be offline.
2. Requested updates: compare installed versions with release notes for
   migrations and restarts.

## Fix

- Find the owner of each setting (repository, platform, package or application)
  and fix it there, so the next deployment does not undo the fix.
- Keep one installation owner per tool. On macOS, reconcile Homebrew, Mise, uv,
  casks and App Store installs without polluting system interpreters.
- Trace data, mounts, snapshots, backups and sync consumers before moving or
  removing anything. Keep shared model weights, caches and runtime data outside
  repositories, and never let repository defaults overwrite live runtime data.
- Preserve administrative access through network or authentication changes, and
  keep downtime proportional. Do not add unsolicited backup layers or automation.

## Verify

Check the affected workflow from its client: a sync completes, a backup restores,
a model generates. Then remove the authorised legacy copy and its leftovers
(launch jobs, shortcuts, caches).
