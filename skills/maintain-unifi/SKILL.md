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
  Follow pagination and time filters, check what each tool option actually
  returns, and say what each source covered.

## Review

- Current faults first, separated from expected states such as idle clients
  or deliberately unused ports. Join history with a fresh active list before
  calling anything offline or ongoing.
- Naming against the local inventory and, when asked, Home Assistant's device
  registry. Distinguish missing configuration from default or sparse metadata,
  and resolve ambiguous matches before naming. One device can appear under
  several interfaces or MACs, so duplicate names need not mean duplicate
  devices.
- WLAN, VLAN and firewall settings against the user's intended access model.
  Read effective settings, not dormant or legacy fields, and judge rules by the
  traffic they actually allow. Network separation is not isolation unless
  routing rules enforce it. Preserve required integrations and previously
  accepted exceptions.

## Clean Up & Verify

- Tie each approved rename or removal to its MAC, and know what the operation
  removes and what it does not. Sparse metadata alone is no reason to remove a
  client.
- Check which credential each operation needs; read access does not imply write
  or history access. Do not turn device maintenance
  into MCP implementation work.
- Read changes back from the view the user sees, against fresh active, saved and
  offline-history inventories. Do not delete more records to make the UI and API
  agree.
