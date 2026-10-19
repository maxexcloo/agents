---
name: standardise-1password
description: Audit or reconcile 1Password vault organisation, item naming, fields, duplicates and credential consumers when a vault review or reconciliation is requested. Keep secret values out of context. Exclude standalone credential retrieval and login checks.
---

# Standardise 1Password

## Trace Ownership & Consumers

Use metadata-only discovery and inspect item-detail schemas before reading:
responses may include credentials even when only names are needed.

Distinguish repository-generated fields from manually supplied credentials.
Update generated metadata in its source; do not overwrite one ownership class
to repair the other.

Trace item references and field labels through applications, deployments and CI,
including shared-account consumers. Absence from one repository does not prove
an item has no external consumer. Consumers reference items and vaults by
title, never by ID, so renaming an item renames its references together. Compare
duplicates through metadata and
lineage; examine historical credentials only within the requested scope.

## Name & Group Fields

Name upstream API keys `provider-<provider>[-<number>]-api-key` and access tokens
`provider-<provider>[-<number>]-<token-type>-token`; keep them in the consuming
application's item. Name gateway-issued client keys `virtual-key-<consumer>` and
administration keys `master-key`; keep them in the issuing gateway's item.
Preserve descriptive names for application, database and sign-in secrets.

Group custom fields by purpose, with OAuth and OIDC fields under `Authentication`,
and remove empty groups. Update field references and generation declarations
together. Preserve existing website URLs, labels and primary flags.

## Reconcile & Verify

Apply the user's vault conventions without repeating scope already carried by
the vault. Preserve standard username, password and URL fields and required
consumer metadata. Update references and consumers together.

Compare required fields and access scopes with the consumer's schema. Reread
affected metadata before editing and verify the saved item and its consumers.

For authorised login tests needed to verify reconciliation, distinguish password,
token and SSO methods. Use bounded attempts with a known candidate; stop on
lockout, rate limiting or unexpected account behaviour.
Verify the intended endpoint and an authenticated operation with the required
permissions; a successful login alone does not establish consumer access.

Verify a replacement and its consumers before deleting an authorised legacy
item. Password login does not verify SSO or every integration. Separate verified
logins from metadata corrections and unverified consumers.
