# Engineering Guidelines

## Language

All project code and all website UI text must be English.

This includes:

- Component names
- Class names
- Function names
- Variable names
- Types
- File and folder names
- Button labels
- Headings
- Form labels
- ARIA labels
- User-facing validation and error messages

## Code Style

- Write self-explanatory code.
- Use precise names that describe intent.
- Keep classes, services, hooks, and components small.
- Keep methods and functions short.
- Avoid god classes and broad manager objects.
- Prefer explicit typed contracts between modules.
- Avoid unrelated refactors.
- Do not add code comments.

## UI Style

- The app is a professional video editing tool, not a landing page.
- The UI should be dense, technical, and work-focused.
- Use the Cabio visual language: monospace typography, dark/light themes, grid surfaces, hard-edged panels, restrained controls, and orange as the main accent.
- The primary layout is a full-viewport editor with no page scroll.
- Preserve the current editor regions: top menu, left import panel, center video preview, right effects panel, and bottom timeline.

## Verification

For frontend work:

- Run `pnpm build`.
- Check for accidental code comments.
- Verify the app in the browser when layout or interaction changes.
- Verify there is no horizontal or vertical page overflow for the full-viewport editor.
