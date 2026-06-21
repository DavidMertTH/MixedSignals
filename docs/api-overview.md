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

## Timeline

The timeline module lives in `src/core/timeline` and `src/ui/timeline`.

### `TimelineService`

Responsibilities:

- Create the initial timeline state
- Store video and image assets in a shared model
- Add imported assets as clips
- Split the selected clip
- Move the selected clip left or right
- Move the selected clip between tracks
- Keep track and clip operations outside React components

### `TimelineState`

Fields:

- `assets`
- `tracks`
- `selectedClipId`

### `TimelineTrack`

Fields:

- `id`
- `name`
- `clips`

### `TimelineClip`

Fields:

- `id`
- `assetId`
- `kind`
- `name`
- `trackId`
- `startTime`
- `sourceStartTime`
- `duration`

### `useTimeline`

Responsibilities:

- Bridge React state to `TimelineService`
- Add imported videos to the timeline once
- Expose clip selection, split, move, and track reorder actions

## Future APIs

Expected future core APIs:

- `EffectPresetService`
- `DatamoshRenderService`
- `ProjectFileService`

Each API should expose typed inputs and outputs. UI-specific state should stay outside core services.
