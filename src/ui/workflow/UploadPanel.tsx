import { FileVideo, Upload } from "lucide-react";

export function UploadPanel() {
  return (
    <section className="toolPanel uploadPanel" aria-labelledby="upload-title">
      <div className="panelHeading">
        <FileVideo size={20} aria-hidden="true" />
        <h2 id="upload-title">Video importieren</h2>
      </div>
      <div className="dropZone">
        <Upload size={28} aria-hidden="true" />
        <strong>Datei hier ablegen</strong>
        <span>MP4, MOV oder WebM</span>
      </div>
      <button className="primaryButton" type="button">Video auswählen</button>
    </section>
  );
}
