import { Play } from "lucide-react";

export function PreviewStage() {
  return (
    <section className="previewStage" aria-labelledby="preview-title">
      <div className="previewHeader">
        <div>
          <p className="panelLabel">Vorschau</p>
          <h2 id="preview-title">Kein Clip geladen</h2>
        </div>
        <button className="roundButton" type="button" aria-label="Vorschau starten">
          <Play size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="signalFrame">
        <div className="signalBand signalBand-one" />
        <div className="signalBand signalBand-two" />
        <div className="signalBand signalBand-three" />
        <span>Preview erscheint nach dem Import</span>
      </div>
    </section>
  );
}
