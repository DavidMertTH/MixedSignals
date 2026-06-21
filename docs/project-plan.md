# Project Plan

## Current Goal

Build the browser version first with a reusable core that can later be shared by desktop and mobile apps.

## Milestones

1. Website prototype
2. Video import module
3. Timeline model
4. Preview playback controls
5. Datamosh effect parameter model
6. Core datamosh pipeline
7. Export pipeline
8. Project save and load
9. Desktop app
10. Mobile app

## Planned Project Structure

```text
src/
  core/
    video-import/
    timeline/
    effects/
    render/
    project/
  ui/
    layout/
    theme/
    video-import/
    workflow/
  styles.css
```

## Core Direction

The core should remain independent from React whenever possible. UI components should call small hooks or adapters that wrap core services.

The future datamosh core should expose stable operations for:

- Importing video assets
- Reading media metadata
- Modeling timeline clips
- Modeling effect presets and parameters
- Preparing render jobs
- Exporting files

The implementation can start in TypeScript for the browser prototype. If the project needs native codec control and deeper datamoshing later, the core can move selected modules to Rust and WebAssembly.
