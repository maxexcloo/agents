---
name: maintain-systems
description: Audit or complete a requested maintenance pass for live hosts, services, storage, backups and synchronisation. Exclude individual operational commands, targeted troubleshooting and repository or Home Assistant configuration maintenance.
---

# Maintain Systems

## Inventory

1. Current failures: services, storage, backups and sync jobs. Separate them
   from historical errors and devices that are expected to be offline.
2. Requested updates: compare installed versions with release notes for
   migrations and restarts.

## Fix

- Find the owner of each setting (repository, platform, package or application)
  and fix it there, so the next deployment does not undo the fix.
- Keep one installation owner per tool and leave system interpreters
  untouched.
- Trace data, mounts, snapshots, backups and sync consumers before moving or
  removing anything. Keep large or shared runtime data outside repositories,
  and never let repository defaults overwrite live runtime data.
- Preserve administrative access through network or authentication changes, and
  keep downtime proportional. Do not add unsolicited backup layers, automation
  or shared resources as incidental cleanup.

## Verify

Check the affected workflow from its client. When a legacy copy's removal is
authorised, verify the replacement first, then remove the copy and everything
it left behind.
