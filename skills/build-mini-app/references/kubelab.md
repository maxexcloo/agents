# Publish Through Kubelab

## Read The Current Configuration

Locate `kubelab` and the shared `mini-apps` repository in the workspace. Read `AGENTS.md`, the selected cluster's
Flux entry points, app overlay, gateway listeners, certificate and storage
configuration. Confirm the app's container port, bind address, health endpoint,
environment, writable paths, architecture and data migration behaviour from its
actual source, Dockerfile and Compose file. An existing app is the preferred
starter for its own deployment.

Choose cluster and hostname from the request and inventory. If the destination
is genuinely ambiguous, ask for it while completing independent local work. Do
not infer a target cluster merely from a nearby example or reuse another app's
hostname. Derive the Redlib feed origin from Redlib's owning settings; its hostname
is separate from the mini app's hostname.

## Native Workload

Use the currently configured `bjw-s/app-template` chart and existing source.
Keep each mini app's native workload resources beside its source in
`mini-apps/apps/<application>` and select it through that repository's cluster
entry point. Kubelab owns the Flux source and selects the cluster entry point. Keep each app's resources in `deploy.yaml`, with native HelmRelease values and
Kustomize replacements. Keep the image, port, hostname and service
configuration near their owners and derive repeated values. Start from a current
small app's manifests, removing irrelevant integrations; do not copy its secrets,
storage addresses or app-specific settings.

Use a namespace, restricted pod settings, a non-root container, resource requests
and limits, probes and ingress NetworkPolicy following existing apps. Match the
container image's actual UID/GID. Disable service-account token automount. Set a
read-only root filesystem where supported and mount writable `/tmp` separately.
The application must listen on `0.0.0.0` inside its container.

For SQLite, provision an app-scoped local-block PVC using the selected cluster's
supported storage class. Mount the directory, including WAL/SHM files. Use one
replica and `Recreate`. Keep retained data on removal; do not add automatic deletion
or scheduled jobs. Check how the volume is bound to its node and what survives a
node failure. Before important data is stored, establish an actual recovery path
through existing infrastructure, an app export, or an explicit manual backup.
Use SQLite's backup API or stop the writer before copying the full database; do
not copy a live database file alone. A PVC is persistence, not a backup.

Preserve app migration ordering and take a recoverable backup before destructive
schema changes. Image rollback does not reverse a schema migration. Use native
CloudNativePG resources and the established credentials pattern if PostgreSQL is
needed; do not silently change the chosen backend.

## Reachability & DNS

| Reachability | Route                                           | Namespace                                   | DNS                                                          |
| ------------ | ----------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| Internal     | Parent `private` in `networking`                | `gateway.excloo.dev/private-access: "true"` | Existing `PrivateDNSRecord` composition and cluster settings |
| External     | Normally parent `public-tunnel` in `networking` | `gateway.excloo.dev/public-access: "true"`  | ExternalDNS from the public HTTPRoute                        |

These names describe the current patterns; verify them against the selected
cluster. Public routes also need the public-access label on the HTTPRoute itself
and `external-dns.alpha.kubernetes.io/cloudflare-proxied: "true"` for the tunnel.
The gateways own targets. Never hard-code a target IP or create a competing DNS
record for an ExternalDNS-managed route. `public-direct` is an explicit option
only when the app requires it and the cluster supports it.

Bind routes to the intended HTTPS listener and verify the HTTP-to-HTTPS behaviour
in current Traefik configuration. Check certificate coverage for the exact
hostname; a wildcard covers only its intended label depth. Add a native certificate
declaration only if the existing configuration does not cover it. For internal
routes do not add public-access labels or ExternalDNS annotations. If the app needs
both paths, declare both deliberately and align DNS with the existing split-DNS
pattern. Do not duplicate hostnames and full URLs by hand: use Kustomize
replacements as current apps do.

Public reachability can use accounts, secret links or anonymous access. It is
independent of authentication. For Pocket ID, use `PocketIDClient` with callback
and launch URLs derived from the route; verify the supported access policy. The
current integration can create public PKCE clients; confidential clients and their
secret lifecycle require the existing credential process. Do not assume declaring
a client creates its client secret. Use ExternalSecret and the existing 1Password
store for credentials; do not embed secret values in Git or tool output.

For secret-link apps, expose only a safe landing page to Homepage and monitors.
Use a capability-free health endpoint. Check Traefik, Cloudflare, observability and
application request logging before external publication: capability-bearing paths
must not be collected. If existing infrastructure cannot exclude such paths,
adapt the app to carry the capability in a URL fragment and a redacted request
header/body instead of recording secrets in access logs. Preserve compatibility
only when requested. Document the actual capability leakage/rotation behaviour
beside the app, without recording real links.

## Automatic Deployment

Use the shared `mini-apps` repository for all mini apps. Source lives on `main`;
CI validates app behaviour and native configuration, runs container smoke tests,
then fast-forwards `deploy` to that exact commit. Flux watches `deploy`, never an
unverified source branch. Do not force-push deployment history or bypass checks.

For static or dependency-free apps, prefer a pinned upstream runtime with
checked-in code/assets mounted through hashed ConfigMaps. Keep generator source
files within their app's Kustomize root. Disable Flux substitution on generated
code ConfigMaps so JavaScript template literals survive. Hash changes must flow
through native HelmRelease name references to trigger a workload rollout.
Kubelab can supply externally owned URLs through Flux substitution in workload
configuration; derive these from their owning resources using Kustomize.

Apps needing custom dependencies can keep their own image build in the same
repository, with an immutable image digest available before advancing `deploy`.
Do not introduce a new image pipeline for a dependency-free app. Publication
visibility must respect the user's source and runtime-data boundaries.

For an existing deployment, retain its release name, namespace and PVC. Before
removing resources from Kubelab's old Flux inventory, mark the transferred
resources `kustomize.toolkit.fluxcd.io/prune: disabled` and reconcile that state.
Apply the new source and verify ownership and readiness, then remove the old
embedded source/resources. Check the old inventory no longer owns them. Delete
only obsolete code ConfigMaps after successful adoption; never delete the PVC or
namespace to accomplish the transfer.

Run the required Mise checks in both repositories and render changed Helm
releases separately. Review source changes, route/DNS ownership, deletion and
recovery behaviour. Follow existing commit, push and live-route authorisation.
Once CI advances `deploy`, verify Flux and Helm readiness, the exact source
revision, the retained PVC, DNS/TLS and app behaviour from the intended network.
Verify public access is removed when converting an app to internal-only access.
Report pending CI, approval or reconciliation instead of claiming completion.
