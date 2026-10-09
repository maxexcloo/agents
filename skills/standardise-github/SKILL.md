---
name: standardise-github
description: Audit and align GitHub repository descriptions, topics, settings, security features and hosting. Use for a GitHub settings pass across repositories; source structure belongs to standardise-projects and issues, PRs or CI fixes to maintain-projects.
---

# Standardise GitHub

Keep repository settings useful and consistent without erasing intentional
differences. Audit by default; apply changes only within existing authorisation.

## 1. Establish Scope

1. Confirm the owner and requested repositories. For an account-wide pass,
   enumerate owned repositories with pagination and exclude archives and forks
   unless requested.
2. Establish one batch from the initial inventory. Read applicable project rules
   and note access gaps, intentional differences and existing authorisation.
3. Read each repository's detail endpoint for settings. Repository-list responses
   can omit administrative fields; a missing or null value is not proof that a
   feature is disabled.

## 2. Review the Relevant Settings

- **Descriptions & Topics:** Compare with actual README content and purpose.
  Use a concise factual description and a few useful topics. Check homepage links
  against the current site or product.
- **Features & Hosting:** Check Issues, Discussions, Pages, Projects and Wiki
  against actual use. Inspect content, workflows and consumers before disabling
  features. An empty issue list does not establish that Issues is unnecessary:
  Renovate dashboards and integration manifests may depend on it.
- **Merge & Branch Settings:** Compare allowed merge methods, commit-message
  settings, automatic branch deletion, rulesets and branch protection. Preserve
  intentional policy; identify required checks before proposing automerge.
- **Security:** Review available scanning, push protection, dependency alerts and
  security updates. Distinguish account-plan limitations and missing permissions
  from disabled features. Check existing Renovate or Dependabot ownership before
  adding overlapping automation. Review secret/variable names, scopes and
  consumers through metadata; keep values out of tool output and reports.
- **Visibility & Deployment:** Inspect environments, protection rules, Pages
  configuration and repository visibility when relevant. Preserve licences and
  upstream requirements. Treat visibility, access and hosting changes as
  consequential choices requiring concrete authorisation.

Use repository files and workflows to explain differences; do not force every
repository to expose the same features. Consult current GitHub API documentation
when fields or capabilities are uncertain.

## 3. Apply & Verify

Present numbered findings with the repository, evidence, impact and proposed
change. Group shared changes while keeping exceptions explicit. A request to
create or invoke this skill does not itself authorise unrelated settings changes.

For authorised fixes, reread the affected settings, patch only intended fields
and verify them through fresh API reads. Topic updates replace the whole set, so
preserve intended topics. Check affected consumers when changing hosting or
features; API success alone does not prove the workflow still works.

Review the original batch once and finish using the global completion criteria.
Report material exceptions and required gaps; later unrelated findings belong to
another batch.
