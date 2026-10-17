---
name: build-mini-app
description: Build and publish small self-hosted apps through Kubelab, from Simon Willison-style browser tools to apps with shared persistent data, APIs and secret links. Choose a simple stack and handle backend, DNS and access as needed.
---

# Build Mini Apps

Turn a requested tool into a working application and, when authorised, a verified
URL. This workflow supports existing apps as well as new ones. Keep app source and
native workload resources together in the shared `mini-apps` repository, under
`apps/<name>`. Kubelab owns the Flux entry point and shared cluster integrations.
Locate the repositories from the workspace and read their instructions and owning
configuration before editing.

## Application

Start with the behaviour and audience. Choose the simplest suitable stack; the
user should not have to choose a framework, database or packaging. For an existing
app, retain working code unless a change materially simplifies the requested work.
Honour explicit technical constraints. Do not add a backend to a tool that can
work entirely in the browser. Plain HTML/CSS/JavaScript is a good default for
Simon Willison-style converters, calculators and visualisers. Related static
tools can share a site; separate apps with independent data or access boundaries.

For browser-only apps, copy `mini-apps/templates/static`, keeping the tool in a
single `index.html` or a small directory. Rename the example consistently, follow
the repository's app identity and cluster selection rules, and keep resources
in its `deploy.yaml`. Native `kustomization.yaml` files select resources and mount assets;
no npm package, Docker build or app-level Mise task is needed for static files.
Do not publish the starter as a separate demonstration app.

For a simple backend, a small Node.js server with built-in SQLite and one HTML
page is a useful starting point, not a required stack. The existing Reddit app
shows this shape. Prefer locally served Web Awesome with its default appearance;
allow native controls or another UI approach when requested or materially simpler.
Avoid dependencies, build scripts and task wrappers that add no runtime capability.
Keep meaningful data tests separately from the editable app.
[assets/app](assets/app) supplies optional reference code for JSON APIs, optimistic
concurrency and secret editing links; copy only the runtime source the app needs.
Submit changes through a PR; Flux deploys merged `main` directly. Preserve existing
licences; new projects use the workspace's canonical AGPL-3.0 licence.

## Backend & Data Recipes

Choose the combination that removes the most app code and operational work for
the requested behaviour. These are examples, not an approved stack list. Keep a
working backend unless a change has a concrete benefit.

| Recipe          | Useful When                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browser storage | Data can stay on one device; no server or shared persistence is needed.                                                                           |
| PocketBase      | Built-in accounts, collection APIs, uploads, realtime updates or an admin UI replace custom code.                                                 |
| PostgreSQL      | Relational data needs multiple app replicas, concurrent writers or capabilities beyond an embedded store; use the existing CloudNativePG pattern. |
| Small server    | Custom validation, integrations or transformations need a backend; omit storage for stateless work. Node.js, Go or Python can all fit.            |
| SQLite          | A single app instance needs transactional persistence with little operational overhead.                                                           |

Keep UI and API on the same origin where practical. Credentials stay server-side.
For SQLite, including PocketBase, use app-scoped local persistent block storage,
one replica and `Recreate`; never put the live database on NFS. Other datastores
and object storage are reasonable when they satisfy a concrete app need; derive
endpoints and credentials from their owning integrations rather than adding a
parallel platform.

For PocketBase, use an app-scoped instance and volume, commit collection migrations,
keep administration private and define collection rules for the intended users
and data ownership. Its built-in authentication can be the app's account system;
there is no need to write another auth backend. Test unauthenticated and other-user
access because authentication alone does not establish record access. Check the
current [authentication](https://pocketbase.io/docs/authentication/),
[API rules](https://pocketbase.io/docs/api-rules-and-filters/) and
[production guidance](https://pocketbase.io/docs/going-to-production/) before
choosing it; account for upstream compatibility and migration constraints.

## Publication Preferences

Keep all app source and workload configuration in `mini-apps/apps/<name>`.
Follow the repository's current cluster entry point, shared components and app
identity rules. Derive hostnames and full URLs through the existing owning
configuration and Kustomize replacements; do not introduce another hostname
setting when app identity already determines it. Keep app-specific gateway,
Homepage, storage, resource limits and credential references beside the workload,
using the existing native manifests and chart conventions. Honour existing
choices and ask only for genuinely missing intent; internal access is the default.

Homepage discovers enabled route annotations from selected mini-app directories.
Use the safe app landing page. A GitHub AI connection can author and submit these
files without Kubernetes credentials once the shared integration is installed;
it must read the repository instructions, respect PR review and use existing
credential integration for backend secrets.

Keep this workflow focused on small browser tools and simple backends, including
apps with their own SQLite data. Prefer standard upstream runtimes and minimal
app-specific deployment configuration. A custom container being technically
possible does not make an existing service a good migration candidate.

Keep services with substantial dependency and operational requirements in their
own repositories with ordinary container deployment in Kubelab. Actual Up belongs
there: preserve its specialised dependencies, serial operation queue, schedules
and encrypted financial settings rather than adapting it to the mini-app runtime.

## Access & Publication

Treat reachability and application authorisation as separate decisions. Carry
forward the user's existing choices; otherwise default to internal reachability.
For sensitive stored data, establish who can read and change it before publishing.

- **Account:** use the backend's built-in authentication when it meets the app's
  needs, or the established Pocket ID/OIDC integration for shared sign-in. Verify
  provider compatibility before choosing a library or backend. Apply authorisation
  to API routes as well as pages; decide whether data is per-user or shared. Do not
  substitute trusted-header authentication without a verified authenticating proxy.
- **Public:** anonymous access is intentional; define which reads and writes are
  public. Public DNS does not imply anonymous data access.
- **Secret Link:** possession of a randomly generated editing URL grants access.
  Preserve this model for apps such as Redlib Multi; do not add an account gate.
  Use high-entropy generated capabilities for new links, isolate records by their
  capability and avoid listing them. Keep real capability URLs out of logs,
  monitoring, dashboards, screenshots and reports. Use dummy capabilities in tests.
  Suppress referrer leakage and caching. Rotation/revocation is app-specific.

Read [references/kubelab.md](references/kubelab.md) for internal/external routing,
DNS, identity, persistence, image handoff and live verification. Existing Kubelab
resources are authoritative; the skill does not define a new application schema,
manifest generator, operator or alternate deployment platform.

## Verify & Deliver

Use the app's own checks and exercise its important behaviour. For a persistent
app, verify two independent clients, data isolation, concurrent edit handling and
restart persistence. Exercise the chosen authorisation model, including negative
cases. For a feed-list app, for example, verify parsing, normalisation,
deduplication, removal/filtering and links derived from its configured feed origin.
Test the requested functionality, not a particular framework or the starter's example.

Build a custom image only when the app needs one. For Kubelab edits, run its
required checks and render the changed Helm chart; inspect the rendered route,
service, storage, probes and secret references. Finish with a diff and status
review, preserving other sessions' edits.

Complete publication within existing authorisation. Kubelab requires explicit
approval and a reviewed plan before changing live routes: prepare the concrete
diff and checks first, then ask only if that approval is still missing. Do not
report a locally working app as deployed. Verify DNS, TLS, Flux, workload health
and the app's important workflow from the intended access boundary. Report the
public entry URL only; never return an editing capability as a deployment URL.
