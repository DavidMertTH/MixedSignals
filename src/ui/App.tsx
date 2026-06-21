import { AppHeader } from "./layout/AppHeader";
import { EffectLibrary } from "./workflow/EffectLibrary";
import { ExportPanel } from "./workflow/ExportPanel";
import { PreviewStage } from "./workflow/PreviewStage";
import { TimelinePanel } from "./workflow/TimelinePanel";
import { UploadPanel } from "./workflow/UploadPanel";

export function App() {
  return (
    <main className="appShell">
      <AppHeader />
      <section className="editorLayout" aria-label="MixedSignals Editor">
        <aside className="importColumn" aria-label="Import Optionen">
          <UploadPanel />
          <ExportPanel />
        </aside>
        <section className="previewColumn" aria-label="Video Vorschau">
          <PreviewStage />
        </section>
        <aside className="effectColumn" aria-label="Effektspalte">
          <EffectLibrary />
        </aside>
        <section className="timelineColumn" aria-label="Timeline">
          <TimelinePanel />
        </section>
      </section>
    </main>
  );
}
