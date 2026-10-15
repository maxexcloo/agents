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
single `index.html` or a small directory. Rename the example consistently, choose
the destination cluster and hostname, and keep deployment resources in the app's
`deploy.yaml`. Native `kustomization.yaml` files select resources and mount assets;
no npm package, Docker build or app-level Mise task is needed for static files.
Do not publish the starter as a separate demonstration app.

For a new app without a chosen stack, [assets/app](assets/app) is an optional
dependency-free Node.js and SQLite starter with a UI, JSON API, health endpoint,
optimistic concurrency, persistent data and secret editing links. Copy ordinary
files into its monorepo app directory, rename the app, and replace the example
behaviour. Submit changes through a PR; Flux deploys merged `main` directly.
It is a starting point, not a shared runtime or required framework. Preserve an
existing licence; new projects use the workspace's canonical AGPL-3.0 licence.

Implement the actual backend behaviour the tool needs: storage, validation,
server-side integrations and uploads as applicable. Keep UI and API on the same
origin where practical. Credentials stay server-side. For a stateless tool omit
the starter's database and volume. For single-instance SQLite use local persistent
block storage, one replica and `Recreate`; never put its live database on NFS.
Use the existing CloudNativePG pattern when PostgreSQL is warranted. Consider
PocketBase when its built-in data API, auth, file handling or dashboard removes
app code: use a separate instance and volume per app, keep administration private
and define explicit collection rules. Do not add it to an already simple backend
merely for uniformity. Check current upstream migration and production limitations.

## Publication Preferences

Keep all app source and workload configuration in `mini-apps/apps/<name>`.
Choose cluster membership in `clusters/<cluster>/kustomization.yaml`. Put the
hostname, private/public gateway, Homepage annotations, storage, resource limits
and credential references in native `deploy.yaml` resources, using the existing
`bjw-s/app-template` chart. Derive full URLs from the owning hostname through
Kustomize replacements. Honour existing choices and ask only for genuinely missing
intent; internal access is the default.

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

- **Account:** integrate Pocket ID through a maintained OIDC library suitable for
  the app. Apply authorisation to API routes as well as pages; decide whether data
  is per-user or shared. Do not substitute trusted-header authentication without
  an existing, verified authenticating proxy.
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

Build and smoke-test the container where supported. For Kubelab edits, run its
required checks and render the changed Helm chart; inspect the rendered route,
service, storage, probes and secret references. Finish with a diff and status
review, preserving other sessions' edits.

Complete publication within existing authorisation. Kubelab requires explicit
approval and a reviewed plan before changing live routes: prepare the concrete
diff and checks first, then ask only if that approval is still missing. Do not
report a locally working app as deployed. Verify DNS, TLS, Flux, workload health
and the app's important workflow from the intended access boundary. Report the
public entry URL only; never return an editing capability as a deployment URL.
