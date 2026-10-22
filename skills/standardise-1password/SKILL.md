---
name: standardise-1password
description: Audit or reconcile 1Password vault organisation, item naming, fields, duplicates and credential consumers when a vault review or reconciliation is requested. Keep secret values out of context. Exclude standalone credential retrieval and login checks.
---

# Standardise 1Password

## Discover

- Use metadata only. Check an item-detail response's schema before reading it;
  it may contain credentials even when you need only names.
- Separate repository-generated fields, which you fix at their source, from
  manually supplied credentials.
- Trace each item through applications, deployments, CI and shared accounts. Not
  being found in one repository does not mean an item is unused. Consumers use
  titles and field labels, so a rename updates every reference together.
- Compare duplicates through metadata and lineage; examine historical
  credentials only within the requested scope.

## Naming

- Upstream API keys: `provider-<provider>[-<number>]-api-key`; access tokens:
  `provider-<provider>[-<number>]-<token-type>-token`. Keep them in the
  consuming application's item.
- Gateway-issued client keys: `virtual-key-<consumer>`; administration keys:
  `master-key`. Keep them in the gateway's item.
- Keep descriptive names for application, database and sign-in secrets.
- Group custom fields by purpose, with OAuth and OIDC under `Authentication`,
  and remove empty groups. Keep standard username, password and URL fields,
  website URLs, labels and primary flags.
- Do not repeat in a title or tag the scope the vault already gives.

## Reconcile & Verify

- Compare required fields and access scopes with each consumer's schema. Reread
  metadata before editing and verify the saved item and its consumers.
- Run authorised login tests only to verify reconciliation: use bounded attempts
  with a known candidate, stop on lockout or rate limits, and verify an
  authenticated operation against the intended endpoint, not just the login.
  Password login does not verify SSO.
- Verify a replacement and its consumers before deleting an authorised legacy
  item.
