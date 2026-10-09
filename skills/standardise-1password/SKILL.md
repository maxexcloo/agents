---
name: standardise-1password
description: Audit and reconcile 1Password vaults, items, naming, fields, ownership and credential consumers without exposing secret values. Use for vault cleanup, duplicate migration and requested login checks.
---

# Standardise 1Password

Keep credential records accurate, consistent and connected to their actual owners.

## 1. Establish Scope

1. Identify the requested vaults, item groups, consumers and exclusions. Distinguish
   metadata review from authorised credential tests, edits or deletions.
2. Identify repository-managed and manually maintained fields. Generated metadata
   belongs in its source; manually supplied credentials remain in their intended
   fields. Do not overwrite one ownership class to repair the other.
3. Establish one batch and honour requested group boundaries and pauses.

## 2. Protect Secret Values

Use metadata-only reads for discovery. Check tool schemas before reading items:
an item-detail response may expose credentials even when only names are needed.

For authorised tests or transfers, handle secret values inside local processes
using the existing credential tools. Never return values through tool output,
model context, screenshots, logs, diffs or reports. Do not embed values in command
arguments or shell tracing. Report item references and redacted pass/fail results.

If the available tool cannot keep values out of context, use a suitable local path
or ask for the missing capability; do not expose the value as a workaround.

## 3. Audit the Items

- **Consumers & Ownership:** Trace item references and field labels through
  deployments, applications, dashboards and CI. Compare required fields with
  the actual consumer schema. Never infer that an unused-looking item has no
  external consumer.
- **Duplicates & History:** Identify current, archived and legacy candidates.
  Compare metadata and lineage before migration. Examine historical credentials
  only when requested and within the authorised test scope.
- **Names & Organisation:** Apply the user's current vault and naming conventions.
  Avoid repeating context already supplied by the vault. Preserve standard
  username, password and URL fields; sort remaining peer fields alphabetically.
- **Validity & Coverage:** Check missing or conflicting required fields. When
  login tests are requested, verify the intended endpoint and successful
  authenticated behaviour. Distinguish password, token and SSO login methods.

Use bounded login attempts with a known candidate. Stop on lockout, rate limiting
or unexpected account behaviour; do not guess passwords or retry a failing
candidate indefinitely.

## 4. Reconcile & Verify

For authorised fixes, reread current metadata, update the owning source or intended
manual fields, and preserve unrelated data. Update consumers together when item
references or field labels change.

Verify a replacement and its consumers before deleting an explicitly authorised
legacy item. A successful password login does not verify SSO or every integration.

Finish with numbered findings and grouped status, separating verified logins,
metadata corrections, accepted exceptions and required gaps. Use the global
completion criteria without publishing secret values or creating extra reports.
