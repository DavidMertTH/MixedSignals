# Architecture Overview

## Layers

MixedSignals uses a layered frontend architecture.

```text
UI components
React hooks
Core services
Typed data models
Browser platform APIs
```

## UI Components

UI components are responsible for rendering and user interaction only. They should receive state and callbacks through props.

Examples:

- `UploadPanel`
- `PreviewStage`
- `TimelinePanel`
- `EffectLibrary`
- `ExportPanel`

## Hooks

Hooks bridge React and core services. They own UI state transitions and lifecycle cleanup.

Example:

- `useVideoImport`

## Core Services

Core services hold business behavior and should avoid React imports.

Example:

- `VideoImportService`

## Data Flow

```text
User action
UI component callback
React hook
Core service
Typed result
React state
UI update
```

## Resource Ownership

Object URLs and other browser resources must have clear ownership. The module that creates a resource must provide a release path. React hooks should call release methods during replacement and unmount cleanup.
