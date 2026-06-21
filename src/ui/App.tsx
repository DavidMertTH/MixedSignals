import { AppHeader } from "./layout/AppHeader";
import { EffectGuide } from "./workflow/EffectGuide";
import { EffectLibrary } from "./workflow/EffectLibrary";
import { ExportPanel } from "./workflow/ExportPanel";
import { PreviewStage } from "./workflow/PreviewStage";
import { TimelinePanel } from "./workflow/TimelinePanel";
import { UploadPanel } from "./workflow/UploadPanel";
import { workflowSteps } from "./workflow/workflowSteps";

export function App() {
  return (
    <main className="appShell">
      <AppHeader />
      <section className="workflowLayout" aria-label="MixedSignals Workflow">
        <EffectGuide steps={workflowSteps} />
        <div className="workspaceGrid">
          <UploadPanel />
          <PreviewStage />
          <EffectLibrary />
          <TimelinePanel />
          <ExportPanel />
        </div>
      </section>
    </main>
  );
}
