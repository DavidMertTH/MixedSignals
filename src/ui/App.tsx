import { AppHeader } from "./layout/AppHeader";
import { EffectLibrary } from "./workflow/EffectLibrary";
import { ExportPanel } from "./workflow/ExportPanel";
import { PreviewStage } from "./workflow/PreviewStage";
import { TimelinePanel } from "./workflow/TimelinePanel";
import { UploadPanel } from "./workflow/UploadPanel";
import { useVideoImport } from "./video-import/useVideoImport";

export function App() {
  const { videoImportState, importVideoFile, clearImportedVideo } = useVideoImport();

  return (
    <main className="appShell">
      <AppHeader />
      <section className="editorLayout" aria-label="MixedSignals Editor">
        <aside className="importColumn" aria-label="Import Optionen">
          <UploadPanel
            videoImportState={videoImportState}
            onVideoSelected={importVideoFile}
            onVideoCleared={clearImportedVideo}
          />
          <ExportPanel importedVideo={videoImportState.video} />
        </aside>
        <section className="previewColumn" aria-label="Video Vorschau">
          <PreviewStage videoImportState={videoImportState} />
        </section>
        <aside className="effectColumn" aria-label="Effektspalte">
          <EffectLibrary />
        </aside>
        <section className="timelineColumn" aria-label="Timeline">
          <TimelinePanel importedVideo={videoImportState.video} />
        </section>
      </section>
    </main>
  );
}
