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

## Video Preview

The video preview module lives in `src/ui/video-preview`.

### `VideoPreview`

Responsibilities:

- Render the imported video in the central preview stage
- Show preview metadata
- Provide custom playback controls
- Provide scrubbing, restart, and mute actions

### `useVideoPreview`

Responsibilities:

- Own the preview video element reference
- Track current time, duration, mute state, and playback state
- Reset preview state when the imported video changes
- Expose small control actions for the preview UI

## Future APIs

Expected future core APIs:

- `TimelineService`
- `EffectPresetService`
- `DatamoshRenderService`
- `ProjectFileService`

Each API should expose typed inputs and outputs. UI-specific state should stay outside core services.
