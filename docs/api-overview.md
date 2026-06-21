# API Overview

## Video Import

The video import module lives in `src/core/video-import`.

### `VideoImportService`

Responsibilities:

- Validate selected files
- Accept MP4, MOV, and WebM
- Reject non-video files
- Reject files larger than 1 GB
- Create object URLs
- Read duration and resolution from browser video metadata
- Release object URLs

### `ImportedVideoFile`

Fields:

- `id`
- `name`
- `size`
- `mimeType`
- `duration`
- `width`
- `height`
- `objectUrl`
- `importedAt`

### `VideoImportState`

States:

- `empty`
- `loading`
- `ready`
- `error`

## UI Hook

The `useVideoImport` hook lives in `src/ui/video-import`.

Responsibilities:

- Store the current import state
- Call `VideoImportService`
- Replace previous imports safely
- Release object URLs on clear and unmount

## Future APIs

Expected future core APIs:

- `TimelineService`
- `EffectPresetService`
- `DatamoshRenderService`
- `ProjectFileService`

Each API should expose typed inputs and outputs. UI-specific state should stay outside core services.
