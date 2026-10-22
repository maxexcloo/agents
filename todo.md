# To Do

## Skills & Guidance Feedback

From the trmnl-builds KISS audit (2026-10-22).

- [ ] standardise-projects: "Patches and overrides must fail clearly when
      upstream assumptions stop matching" led to custom `--check`, reverse-check
      and error wrapping around `git apply`. Say a native failure counts as
      clear.
- [ ] Global guidance: audits must not report optional hardening, but nothing
      stops agents adding it. Add "No defensive validation of trusted inputs".
- [ ] Global guidance: agents add a test with each fix (tests reached 422 lines
      for 328 lines of code). Say not to add a test per fix.
- [ ] Global "Use major tags for GitHub Actions" ignores Actions that publish no
      major tag, such as `astral-sh/setup-uv`. Add "where published" so agents
      do not switch to a tag that does not exist.
- [ ] Move rarely relevant sections to references: maintain-projects fork
      alignment and history rewriting, standardise-projects GitHub Settings,
      tooling.md Containers and Hk.
- [ ] Remove duplication: "look for complexity to remove" appears in global
      Audits, maintain-projects step 4 and the standardise-projects intro; keep
      it in one place.
- [ ] maintain-projects tells agents to open updates with
      `dependencies:update` even in an audit; scope that step to fix passes.
- [ ] Project `AGENTS.md` files drift into requirements specs and repeat code
      comments, and agents follow stale rules (trmnl-builds had a platform-bump
      rule contradicting its Renovate hold). Remind that project rules stay
      minimal and are updated with the code they describe.
