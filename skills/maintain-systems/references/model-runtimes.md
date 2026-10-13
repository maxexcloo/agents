# Model & Runtime Reconciliation

Use for requested reconciliation of installed models, runtimes, profiles and
their application consumers. Read host and project policy first; keep actual
paths, names, access boundaries and allocation settings in their owning sources.

## Trace Ownership & Consumers

1. Compare configured catalogues and profiles with installed model files,
   runtime versions, services and application-visible selections. Identify which
   source owns each setting; inspect live state when migrations depend on it.
2. Trace a profile through its model, runtime options, endpoint, credentials and
   consumers. Distinguish display names from stable IDs, storage paths and API
   identifiers.
3. Inspect persistent inputs, outputs, galleries, histories, presets and access
   settings before changing a runtime or directory. Repository defaults must not
   replace authoritative runtime data during reconciliation.
4. Identify shared weights, adapters, encoders and caches before declaring a
   file redundant. Size, age or absence from one catalogue does not prove that
   another runtime or profile has no consumer.

## Reconcile the Requested Set

- Change names, paths and profile references together through the owning source
  and its existing deployment mechanism. Avoid maintaining a second catalogue in
  documentation or hard-coding consumer lists.
- Check runtime and model compatibility, hardware capacity and relevant context,
  quantisation or concurrency settings against the installed versions. Use
  official documentation when compatibility is uncertain.
- Preserve the user's allocation and isolation policy. Do not introduce automatic
  model switching, GPU scheduling or shared data directories as incidental cleanup.
- Keep weights and runtime state outside source repositories according to their
  project policy. Inspect mounts, symlinks and active downloads before relocating
  or deleting files; verify replacements before retiring authorised legacy copies.

## Verify the Consumers

Verify the affected runtime can load the selected model and that its application
consumer can perform the intended operation. A healthy process, populated model
list or static configuration check does not prove successful generation.

Check renamed selections, endpoint reachability, persistent outputs and applicable
access separation. For hardware or services that are unavailable, distinguish
prepared configuration from deployed and observed behaviour. State the exact
remaining verification rather than treating the catalogue as fully reconciled.
