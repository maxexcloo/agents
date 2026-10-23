---
name: build-mini-app
description: Build and publish small self-hosted apps through Kubelab, from Simon Willison-style browser tools to apps with shared persistent data, APIs and secret links. Choose a simple stack and handle backend, DNS and access as needed.
---

# Build Mini Apps

Turn a requested tool into a working app and, when authorised, a verified URL.
`minilab/AGENTS.md` and `kubelab/AGENTS.md` own app layout, routing, storage,
secrets and delivery; read them first and follow them rather than this skill
where they differ.

## Stack

Choose the simplest stack for the behaviour and audience; the user should not
have to pick a framework, database or packaging. Keep working code in an
existing app unless a change materially simplifies the request. Do not add a
backend to a tool that works in the browser.

- Interface: build it from Mantine components with Minilab's shared theme and
  Vite build, committing the bundle as `minilab/AGENTS.md` describes.
- Browser-only: copy `minilab/templates/static`. Related static tools can share
  a site; apps with separate data or access stay separate.
- Backend: start from the closest app in `minilab/apps`, copying only the source
  it needs, with no wrappers that add no runtime capability.

| Recipe          | Useful When                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| Browser storage | Data can stay on one device.                                                   |
| PocketBase      | Built-in accounts, collection APIs, uploads, realtime or admin replace code.   |
| PostgreSQL      | Several replicas or concurrent writers; use the existing CloudNativePG setup.  |
| Small server    | Custom validation, integrations or transformations; Node.js, Go or Python fit. |
| SQLite          | One instance needs transactional persistence.                                  |

These are examples, not an approved list. Keep UI and API on one origin and
credentials server-side. For PocketBase, use an app-scoped instance, commit
migrations, keep administration private and define collection rules: sign-in
alone does not restrict record access. Services with substantial dependencies or
operations belong in their own repositories, not here.

## Access

Reachability and authorisation are separate decisions. Keep the user's existing
choices; otherwise default to private. Decide who can read and change sensitive
data before publishing.

- **Account:** the backend's built-in auth, or Pocket ID for shared sign-in.
  Protect API routes as well as pages. Never trust headers without a verified
  authenticating proxy.
- **Public:** anonymous access is deliberate; define what is public. Public DNS
  does not imply anonymous data access.
- **Secret Link:** a random editing URL grants access; keep this model where it
  exists, without adding an account gate. Use high-entropy links, isolate
  records by link and never list them. Keep real links out of logs, monitoring,
  screenshots and reports, suppress referrers and caching, and use dummy links
  in tests.

## Verify & Deliver

- Exercise the requested behaviour, including denied access for the chosen
  model. For persistent apps, check two clients, data isolation, concurrent
  edits and persistence across a restart.
- Render changed Kustomizations and Helm releases and inspect routes, storage,
  probes and secret references.
- Do not report a local app as deployed. After merge, check DNS, TLS, Flux,
  workload health and the main workflow from the intended network, including
  that public access is gone when moving an app to private. Report only the
  landing URL, never an editing link.
