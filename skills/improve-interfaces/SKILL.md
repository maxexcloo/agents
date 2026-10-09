---
name: improve-interfaces
description: Review and improve an existing application's UI, UX, flow and interaction performance. Use for interface cleanup or redesign requests; ordinary backend work does not need this skill.
---

# Improve Interfaces

Make the user's important tasks clearer and faster with a small, coherent interface.

## 1. Understand the Flow

1. Inspect the actual interface and the workflows behind it. Reuse current
   screenshots or browser evidence; distinguish observed problems from assumptions.
2. Identify the requested outcome and the main source of friction. Retain useful
   existing behaviour and user data.
3. Use the project's framework, components and visual conventions. Add a library
   or new architecture only when a concrete requirement justifies it.

## 2. Review the Relevant Interactions

- **Actions & Feedback:** Make actions clear and expose progress, errors and
  results near the affected item. An in-progress operation should not block
  unrelated work; support concurrent operations when the backend supports them.
- **Controls & Layout:** Group related controls, use consistent alignment and
  keep the primary task easy to scan. Prefer a direct flow with fewer screens
  when extra navigation provides no value.
- **Dashboards & Links:** For service/host dashboards, put widgets before other
  peer cards and alphabetise within each group. Use supported widgets where useful
  and derive links, icons and descriptions from the owning inventory. Link status
  or build indicators to the relevant service page or logs. Preserve deliberate
  grouping and workflow order.
- **Language & Content:** Use concise human wording, current data and clear
  labels. Avoid duplicated explanations, implementation details and redundant
  badges or metadata.
- **Responsiveness & Access:** Check real viewport sizes, keyboard use, focus,
  labels, contrast and overflow. Keep loading and empty states useful.
- **State & Performance:** Preserve user input and selection across relevant
  navigation and refreshes. Avoid full reloads or unnecessary refetches for
  local tab/anchor changes. Trace slow previews, stale data and save conflicts to
  their cause before adding caches or global loading states.

For a review, give numbered findings with evidence, impact and a concrete proposal.
For requested implementation, establish a bounded set of changes and proceed
within the existing authorisation.

## 3. Implement & Verify

Use standard components and native browser behaviour where they fit. Derive
displayed information from its owning data; avoid duplicate state or hard-coded
catalogues that will drift.

Verify affected workflows in the browser when available, including meaningful
loading, error and concurrent-action cases. Run relevant project checks and
distinguish visual or interaction verification from static inspection.

Review the agreed changes once and finish using the global completion criteria.
