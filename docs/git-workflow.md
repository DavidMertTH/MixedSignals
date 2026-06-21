# Git Workflow

## Branches

- Do not work directly on `main`.
- Use feature branches with the `codex/` prefix.
- Keep each branch focused on one task.

Examples:

```text
codex/web-prototype
codex/video-import
codex/project-guidelines
```

## Commits

- Keep commit messages short.
- Use lowercase imperative or concise noun phrases.
- Commit only related changes.

Examples:

```text
video import
theme modes
editor layout
```

## Before Commit

Run:

```bash
pnpm build
```

Also check:

- No code comments were added.
- UI text is English.
- User-facing errors are English.
- Layout changes were browser-verified.

## Pull Requests

Push the feature branch and open a PR against the integration branch requested by the project owner.
