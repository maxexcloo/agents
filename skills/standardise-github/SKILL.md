---
name: standardise-github
description: Audit or align GitHub repository metadata, settings, security features and hosting when a settings review or alignment pass is requested. Exclude ordinary issue, PR and CI work and source structure changes.
---

# Standardise GitHub

## Read Complete Settings

Enumerate requested repositories with pagination; exclude archives and forks
unless requested. Compare metadata with actual project purpose and usage.
Cover descriptions/topics, merge and branch policy, security controls and
deployment/hosting protections within the requested scope.

Read each repository's detail endpoint. List responses can omit administrative
fields; missing or null values do not prove a feature is disabled. Distinguish
plan limitations and missing permissions from disabled security features.
Treat partial, inaccessible or failed API results as evidence gaps.

Inspect consumers before disabling Issues, Discussions, Pages, Projects or Wiki.
An empty issue list does not prove Issues is unnecessary: integration manifests
may depend on it.

## Align & Read Back

Identify required checks before proposing automerge. Treat visibility, access and
hosting changes as explicit decisions. Preserve intended merge and branch policy.

Reread affected settings before patching and verify the result through fresh API
reads. Topic updates replace the whole set, so preserve intended topics. Check
consumers when changing hosting or features; API success does not prove their
workflow still works.
