import { Download, Settings2 } from "lucide-react";
import type { ImportedVideoFile } from "../../core/video-import/videoImportTypes";

type ExportPanelProps = {
  importedVideo: ImportedVideoFile | null;
};

export function ExportPanel({ importedVideo }: ExportPanelProps) {
  return (
    <section className="toolPanel exportPanel" aria-labelledby="export-title">
      <div className="panelHeading">
        <Settings2 size={20} aria-hidden="true" />
        <h2 id="export-title">Export</h2>
      </div>
      <div className="exportRows">
        <span>Format</span>
        <strong>MP4 H.264</strong>
        <span>Qualitaet</span>
        <strong>Preview</strong>
        <span>Quelle</span>
        <strong>{importedVideo ? "bereit" : "leer"}</strong>
      </div>
      <button className="primaryButton" type="button" disabled={!importedVideo}>
        <Download size={18} aria-hidden="true" />
        Render vorbereiten
      </button>
    </section>
  );
}
