---
name: build-mini-app
description: Build and publish small self-hosted apps through Kubelab, from Simon Willison-style browser tools to apps with shared persistent data, APIs and secret links. Choose a simple stack and handle backend, DNS and access as needed.
---

# Build Mini Apps

Turn a requested tool into a working application and, when authorised, a verified
URL, for new or existing apps. Read `mini-apps/AGENTS.md` and `kubelab/AGENTS.md`
first: they own app layout, identity, routing, UI defaults, storage rules and
delivery. Locate both repositories from the workspace and read the owning
configuration before editing.

## Decide the Stack

Start with the behaviour and audience. Choose the simplest suitable stack; the
user should not have to choose a framework, database or packaging. For an existing
app, retain working code unless a change materially simplifies the requested work.
Honour explicit technical constraints. Do not add a backend to a tool that can
work entirely in the browser. Plain HTML/CSS/JavaScript is a good default for
converters, calculators and visualisers. Related static tools can share a site;
separate apps with independent data or access boundaries.

For browser-only apps, copy `mini-apps/templates/static` and rename it
consistently; do not publish the starter as a separate app. For a backend, start
from the closest existing app under `mini-apps/apps`, copying only the runtime
source the app needs. Avoid dependencies, build scripts and task wrappers that add
no runtime capability, and keep meaningful data tests separate from the editable
app. Preserve existing licences; new projects use canonical AGPL-3.0.

Choose the combination that removes the most app code and operational work. These
are examples, not an approved stack list:

| Recipe          | Useful When                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browser storage | Data can stay on one device; no server or shared persistence is needed.                                                                           |
| PocketBase      | Built-in accounts, collection APIs, uploads, realtime updates or an admin UI replace custom code.                                                 |
| PostgreSQL      | Relational data needs multiple app replicas, concurrent writers or capabilities beyond an embedded store; use the existing CloudNativePG pattern. |
| Small server    | Custom validation, integrations or transformations need a backend; omit storage for stateless work. Node.js, Go or Python can all fit.            |
| SQLite          | A single app instance needs transactional persistence with little operational overhead.                                                           |

Keep UI and API on the same origin where practical; credentials stay server-side.
Other datastores and object storage are reasonable for a concrete need; derive
endpoints and credentials from their owning integrations rather than adding a
parallel platform.

For PocketBase, use an app-scoped instance and volume, commit collection migrations,
keep administration private and define collection rules for the intended users
and data ownership. Its built-in authentication can be the app's account system.
Test unauthenticated and other-user access because authentication alone does not
establish record access. Check the current
[authentication](https://pocketbase.io/docs/authentication/),
[API rules](https://pocketbase.io/docs/api-rules-and-filters/) and
[production guidance](https://pocketbase.io/docs/going-to-production/) before
choosing it.

Keep this workflow to small browser tools and simple backends. A custom container
being technically possible does not make an existing service a good migration
candidate; services with substantial dependencies or operations keep their own
repositories.

## Decide Access & Publication

Treat reachability and application authorisation as separate decisions. Carry
forward the user's existing choices; otherwise default to internal reachability.
For sensitive stored data, establish who can read and change it before publishing.
Derive hostnames and URLs from app identity; keep app-specific gateway, Homepage,
storage, resource limits and credential references beside the workload.

- **Account:** use the backend's built-in authentication when it meets the app's
  needs, or the established Pocket ID/OIDC integration for shared sign-in. Verify
  provider compatibility before choosing a library or backend. Apply authorisation
  to API routes as well as pages; decide whether data is per-user or shared. Do not
  substitute trusted-header authentication without a verified authenticating proxy.
- **Public:** anonymous access is intentional; define which reads and writes are
  public. Public DNS does not imply anonymous data access.
- **Secret Link:** possession of a randomly generated editing URL grants access.
  Preserve this model where an app already uses it; do not add an account gate.
  Use high-entropy generated capabilities for new links, isolate records by their
  capability and avoid listing them. Keep real capability URLs out of logs,
  monitoring, dashboards, screenshots and reports. Use dummy capabilities in tests.
  Suppress referrer leakage and caching. Rotation/revocation is app-specific.

Read [references/kubelab.md](references/kubelab.md) for workload, routing, DNS,
identity, persistence, image handoff and live verification. Existing Kubelab and
mini-app resources are authoritative; do not define a new application schema,
manifest generator, operator or deployment platform.

## Verify & Deliver

Use the app's own checks and exercise its important behaviour. For a persistent
app, verify two independent clients, data isolation, concurrent edit handling and
restart persistence. Exercise the chosen authorisation model, including negative
cases. Test the requested functionality, not a framework or the starter's example.

Build a custom image only when the app needs one. Render changed Kustomizations
and Helm releases; inspect the rendered route, service, storage, probes and secret
references. Do not report a locally working app as deployed. After merge, verify
DNS, TLS, Flux, workload health and the app's important workflow from the intended
access boundary. Report the public entry URL only; never return an editing
capability as a deployment URL.
