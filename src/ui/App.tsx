import { AppHeader } from "./layout/AppHeader";
import { EffectLibrary } from "./workflow/EffectLibrary";
import { ExportPanel } from "./workflow/ExportPanel";
import { PreviewStage } from "./workflow/PreviewStage";
import { TimelinePanel } from "./workflow/TimelinePanel";
import { UploadPanel } from "./workflow/UploadPanel";
import { useTimeline } from "./timeline/useTimeline";
import { useVideoImport } from "./video-import/useVideoImport";

export function App() {
  const { videoImportState, importVideoFile, clearImportedVideo } = useVideoImport();
  const {
    timelineState,
    moveSelectedClip,
    moveSelectedClipToTrack,
    selectClip,
    splitSelectedClip,
  } = useTimeline(videoImportState.video);

  return (
    <main className="appShell">
      <AppHeader />
      <section className="editorLayout" aria-label="MixedSignals editor">
        <aside className="importColumn" aria-label="Import options">
          <UploadPanel
            videoImportState={videoImportState}
            onVideoSelected={importVideoFile}
            onVideoCleared={clearImportedVideo}
          />
          <ExportPanel importedVideo={videoImportState.video} />
        </aside>
        <section className="previewColumn" aria-label="Video preview">
          <PreviewStage videoImportState={videoImportState} />
        </section>
        <aside className="effectColumn" aria-label="Effect panel">
          <EffectLibrary />
        </aside>
        <section className="timelineColumn" aria-label="Timeline">
          <TimelinePanel
            timelineState={timelineState}
            onClipSelected={selectClip}
            onSelectedClipMoved={moveSelectedClip}
            onSelectedClipMovedToTrack={moveSelectedClipToTrack}
            onSelectedClipSplit={splitSelectedClip}
          />
        </section>
      </section>
    </main>
  );
}
