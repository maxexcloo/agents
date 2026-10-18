# Publish Through Kubelab

## Read the Current Configuration

Read `mini-apps/AGENTS.md`, `kubelab/AGENTS.md`, the selected cluster's Flux
entry points, gateway listeners, certificate and storage configuration. Confirm
the app's container port, bind address, health endpoint, environment, writable
paths, architecture and data migration behaviour from its actual source and
manifests. An existing app is the preferred starter for its own deployment.

Derive cluster selection and app addresses from the request and repository
configuration. Ask only if the destination remains genuinely ambiguous. Set the
Namespace's `app.excloo.dev/name` label and include the shared routes component;
do not copy another app's address or add a manual hostname. Derive external
service origins from their owning settings, independently of the app's address.

## Native Workload

Use the currently configured `bjw-s/app-template` chart and existing source. Keep
each app's resources in `deploy.yaml`, with native HelmRelease values and Kustomize
replacements. Keep the image, port, hostname and service configuration near their
owners and derive repeated values. Start from a current small app's manifests,
removing irrelevant integrations; do not copy its secrets, storage addresses or
app-specific settings.

Use a namespace, restricted pod settings, a non-root container, resource requests
and limits, probes and ingress NetworkPolicy following existing apps. Probe a
capability-free health endpoint such as `/health`. Match the container image's
actual UID/GID. Disable service-account token automount. Set a read-only root
filesystem where supported and mount writable `/tmp` separately. The application
must listen on `0.0.0.0` inside its container.

For SQLite, provision an app-scoped local-block PVC using the selected cluster's
supported storage class and mount the directory, including WAL/SHM files. Keep
retained data on removal; do not add automatic deletion or scheduled jobs. Check
how the volume is bound to its node and what survives a node failure. Before
important data is stored, establish an actual recovery path through existing
infrastructure, an app export, or an explicit manual backup. Use SQLite's backup
API or stop the writer before copying the full database; do not copy a live
database file alone. A PVC is persistence, not a backup.

Preserve app migration ordering and take a recoverable backup before destructive
schema changes. Image rollback does not reverse a schema migration. Use native
CloudNativePG resources and the established credentials pattern if PostgreSQL is
needed; do not silently change the chosen backend.

## Reachability & DNS

Read the repository's current private/public gateway, listener, namespace and
route label requirements. Mini-app routing can differ from general cluster apps.
Carry forward configured wildcard DNS and ExternalDNS ownership; derive proxy
mode from the selected gateway rather than assuming tunnel or direct access.
The gateways own targets. Never hard-code a target IP or create a competing DNS
record for an ExternalDNS-managed route.

Bind routes to the intended HTTPS listener and verify the HTTP-to-HTTPS behaviour
in current Traefik configuration. Check certificate coverage for the exact
hostname; a wildcard covers only its intended label depth. Add a native certificate
declaration only if the existing configuration does not cover it. For internal
routes do not add public-access labels or ExternalDNS annotations. If the app needs
both paths, declare both deliberately and align DNS with the existing split-DNS
pattern.

Public reachability can use accounts, secret links or anonymous access. It is
independent of authentication. For Pocket ID, use `PocketIDClient` with callback
and launch URLs derived from the route; verify the supported access policy. The
current integration can create public PKCE clients; confidential clients and their
secret lifecycle require the existing credential process. Do not assume declaring
a client creates its client secret. Use ExternalSecret and the existing 1Password
store for credentials, referencing items by UUID; do not embed secret values in
Git or tool output.

For secret-link apps, expose only a safe landing page to Homepage and monitors.
Check Traefik, Cloudflare, observability and application request logging before
external publication: capability-bearing paths must not be collected. If existing
infrastructure cannot exclude such paths, adapt the app to carry the capability in
a URL fragment and a redacted request header/body instead of recording secrets in
access logs. Preserve compatibility only when requested. Document the actual
capability leakage/rotation behaviour beside the app, without recording real links.

## Images & Verification

For static or dependency-free apps, prefer a pinned upstream runtime with
checked-in code/assets mounted through hashed ConfigMaps. Keep generator source
files within their app's Kustomize root. Kubelab can supply externally owned URLs
through Flux substitution in workload configuration; derive these from their
owning resources using Kustomize.

Apps needing custom dependencies can keep their own image build in the same
repository, with an immutable image digest available before merging the change.
Do not introduce a new image pipeline for a dependency-free app. Publication
visibility must respect the user's source and runtime-data boundaries. For an
existing deployment, retain its release name, namespace and PVC.

Run Kubelab's checks when its configuration changes. Review source changes,
route/DNS ownership, deletion and recovery behaviour. After merge, verify Flux
and Helm readiness, the exact source revision, the retained PVC, DNS/TLS and app
behaviour from the intended network. Verify public access is removed when
converting an app to internal-only access. Report pending approval or
reconciliation instead of claiming completion.
