---
name: maintain-unifi
description: Audit or complete a requested UniFi Network maintenance pass covering device health, client naming and configuration, network settings and cleanup. Exclude individual network changes, targeted troubleshooting and MCP implementation work.
---

# Maintain UniFi

## Establish Ownership & Coverage

Discover the controller, site and current tool schemas from their configured
owners. Identify repository-managed settings before proposing manual changes:
renames, reservations and secondary interfaces can be recreated by the next
deployment. Keep explicit device exclusions across inventory, findings and fixes.

Distinguish UniFi infrastructure from client devices. Reconcile adopted and
pending devices, active clients, saved clients and retained offline history;
follow pagination and time filters. An `include_offline` option may expose only
saved clients. Record which populations each tool actually covers rather than
treating one inventory as complete.

For reports of default or non-configured devices, establish the exact UI view
and match examples by MAC. Separate missing saved configuration, a default
hostname, a deliberately saved hostname-style name and missing fingerprint
metadata. None establishes the others. Prefer stable MACs and configuration
records over display names, vendor guesses or transient IP addresses.

## Review Devices & Settings

Compare naming with the local inventory and, when requested, Home Assistant's
device registry, user names, areas and MAC connections. Resolve ambiguous
matches before suggesting a name. Check wired and wireless interfaces, bridges
and private MACs separately; duplicate names need not mean duplicate devices.

Review adoption, firmware status, uplinks, port names, VLAN assignments, DHCP
reservations, DNS and client connectivity. Distinguish current failures from
historical events, sleeping clients, deliberately unused interfaces and expected
link speeds. Join history with a fresh active inventory to establish online
status. For an IP-conflict event, check the timestamp and current assignments
before describing it as ongoing.

Compare WLAN security and band settings, radio utilisation and client signal
with actual capabilities and intended use. Read combined security flags rather
than inferring the protocol from a single legacy field. Identify effective
settings separately from dormant values under disabled options.

Review firewall zones, rule order, source and destination scope, ports, protocols
and connection states. A return rule restricted to established or related
traffic is not unrestricted inbound access. Separate VLAN membership from routed
isolation; networks sharing a zone may still communicate freely. Propose changes
against the user's intended access model, preserving required integrations and
previously accepted exceptions.

## Apply Authorised Cleanup

Treat an audit as findings until changes are requested or already authorised.
For each approved rename or removal, retain the matched MAC and ownership so
the action remains tied to the reviewed record. Forgetting a client removes
configuration and history; it does not block reconnection. Do not remove a
client solely because its fingerprint is absent or its name resembles a hostname.

Discover authentication requirements for the installed connector and each
operation. API-key inventory access does not prove support for historical reads
or writes through that connector. If a requested operation needs a session,
resolve credentials within the consuming process and verify that operation.
Keep connector configuration changes distinct from MCP source changes; do not
expand device maintenance into implementation work without authorisation.

## Verify the Result

Reread changed settings and reconcile affected MACs against fresh active, saved
and complete offline-history inventories. A successful forget response or absence
from the saved list alone does not establish that the UI's non-saved list is
clear. Check the controller's current history query schema and time filters.
If the UI and API disagree, obtain refreshed examples and report the discrepancy
without asserting that the UI is stale or deleting additional records to chase
its count.

Verify affected connectivity, integrations and repository ownership after
changes. Report inventory coverage, numbered findings, applied fixes and checks
that remain unavailable. Keep historical warnings, optional hardening and
expected offline devices distinct from demonstrated faults.
