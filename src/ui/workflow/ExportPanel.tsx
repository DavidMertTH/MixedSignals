import { Download, Settings2 } from "lucide-react";

export function ExportPanel() {
  return (
    <section className="toolPanel exportPanel" aria-labelledby="export-title">
      <div className="panelHeading">
        <Settings2 size={20} aria-hidden="true" />
        <h2 id="export-title">Export</h2>
      </div>
      <div className="exportRows">
        <span>Format</span>
        <strong>MP4 H.264</strong>
        <span>Qualität</span>
        <strong>Preview</strong>
      </div>
      <button className="primaryButton" type="button">
        <Download size={18} aria-hidden="true" />
        Render vorbereiten
      </button>
    </section>
  );
}
