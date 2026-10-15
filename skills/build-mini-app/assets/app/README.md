# Mini App

A small web app with a same-origin JSON API and SQLite persistence. The example
lets people save notes across devices using secret editing links, without accounts.
Anyone holding a link can read and edit that note. Links use a browser fragment
and an authorisation header so the editing capability stays out of request URLs.
The database stores capability hashes. There is no link recovery or revocation UI.

## Usage

Use Node.js 24.22 or newer. There are no third-party application dependencies.

```sh
mise run check
mise run start
```

Open `http://127.0.0.1:3000`. Create a note, save it and open the editing link in
another browser. A stale save is rejected; keep your text and reload deliberately.
Runtime settings are `DATA_DIRECTORY` (default `./data`), `HOST` (default
`127.0.0.1`), `MAX_NOTES` (default `1000`) and `PORT` (default `3000`).
`/health` is a capability-free probe.

## Containers

```sh
docker compose up --build --detach
mise run smoke
```

Compose binds to localhost. Its named volume persists `/data`; do not delete it
when redeploying. The image runs as the upstream `node` user, UID/GID 1000.
SQLite needs one application replica and a local persistent filesystem. Keep the
database and its WAL files together; do not use NFS for the live database.

For manual backup, stop the app and copy `/data/app.sqlite` together with any WAL
and SHM files, or use SQLite's online backup API. Restore while the app is stopped,
preserve file ownership, then verify a saved note. Container/image rollback does
not reverse database migrations.

## Publication

Copy the starter into `mini-apps/apps/<name>`. Use the shared repository's checks
and CI deployment branch, with native manifests beside the app. Kubelab selects
the cluster entry point and provides shared integrations. Use the shared
`build-mini-app` skill to prepare storage, DNS, routing and access and verify the
result. Choose the stack for the actual tool; existing apps need not adopt this
example's code.

Keep editing capabilities out of telemetry, request headers in logs and reports.
Note creation stops at `MAX_NOTES`; adapt this limit and the access model to the
actual app before public exposure. Use the internal route by default. Account-based tools
should use the existing Pocket ID integration with a maintained OIDC library.

## Licence

AGPL-3.0 — see [LICENSE](LICENSE).
