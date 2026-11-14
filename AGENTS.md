# Agents

- `global/AGENTS.md` is every agent's global instructions; dotfiles links it in
  and loads `skills/` as the `agents` Claude Code plugin. Agents read these
  files in place.
- Keep the global rules few. Fix a one-off mistake where it happened; add a rule
  only when the same mistake recurs, written as the general principle, and
  remove or merge an older rule when adding one. Rules that only matter in some
  repositories belong there or in a skill.
- Validate with `claude plugin validate .`; its warning about a missing
  `/plugin install` line is expected. After prose changes, check Markdown
  formatting, relative links and that the global rules and skills still agree.
