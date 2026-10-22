---
name: maintain-unifi
description: Audit or complete a requested UniFi Network maintenance pass covering device health, client naming and configuration, network settings and cleanup. Exclude individual network changes, targeted troubleshooting and MCP implementation work.
---

# Maintain UniFi

## Inventory

- Discover the controller, site and current tool schemas. Settings managed by a
  repository (names, reservations, interfaces) are changed there, or the next
  deployment reverts them.
- Key every device and client by MAC, never display name, vendor guess or IP.
  Keep explicit device exclusions throughout.
- Inventories differ: adopted and pending devices, active clients, saved clients
  and offline history are separate populations, and a tool may cover only some.
  Follow pagination and time filters, and say what each source covered; an
  `include_offline` option may return only saved clients.

## Review

- Current faults first: adoption, firmware, uplinks, client connectivity and
  active IP conflicts. Sleeping clients, deliberately unused interfaces and
  expected link speeds are not faults. Join history with a fresh active list
  before calling something offline or ongoing.
- Naming against the local inventory and, when asked, Home Assistant's device
  registry. Treat a default hostname, a saved hostname-style name and missing
  fingerprint metadata as different things; resolve ambiguous matches before
  naming. Check wired and wireless interfaces, bridges and private MACs
  separately; duplicate names need not mean duplicate devices.
- WLAN, VLAN and firewall settings against the user's intended access model.
  Read effective settings, not dormant values or single legacy fields. Rules
  limited to established or related traffic are not open inbound access, and
  networks in one zone can still talk freely. Preserve required integrations and
  previously accepted exceptions.

## Clean Up & Verify

- Tie each approved rename or removal to its MAC. Forgetting a client removes
  its configuration and history but does not block it. Do not remove a client
  only because it lacks a fingerprint or looks like a hostname.
- Check which credential each operation needs; inventory access through an API
  key does not imply write or history access. Do not turn device maintenance
  into MCP implementation work.
- Read changes back from the view the user sees, against fresh active, saved and
  offline-history inventories. Do not delete more records to make the UI and API
  agree.
