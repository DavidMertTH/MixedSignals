import { Play } from "lucide-react";
import type { VideoImportState } from "../../core/video-import/videoImportTypes";
import { formatVideoDuration, formatVideoResolution } from "../video-import/videoFormatters";

type PreviewStageProps = {
  videoImportState: VideoImportState;
};

export function PreviewStage({ videoImportState }: PreviewStageProps) {
  const importedVideo = videoImportState.video;
  const previewTitle = importedVideo?.name ?? "Kein Clip geladen";

  return (
    <section className="previewStage" aria-labelledby="preview-title">
      <div className="previewHeader">
        <div>
          <p className="panelLabel">Vorschau</p>
          <h2 id="preview-title">{previewTitle}</h2>
        </div>
        <button className="roundButton" type="button" aria-label="Vorschau starten" disabled={!importedVideo}>
          <Play size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="signalFrame">
        {importedVideo ? (
          <>
            <video className="previewVideo" src={importedVideo.objectUrl} controls />
            <div className="previewMetadata">
              <span>{formatVideoDuration(importedVideo.duration)}</span>
              <span>{formatVideoResolution(importedVideo.width, importedVideo.height)}</span>
            </div>
          </>
        ) : (
          <>
            <div className="signalBand signalBand-one" />
            <div className="signalBand signalBand-two" />
            <div className="signalBand signalBand-three" />
            <span>Preview erscheint nach dem Import</span>
          </>
        )}
      </div>
    </section>
  );
}
