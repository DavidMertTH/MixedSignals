import type { VideoImportState } from "../../core/video-import/videoImportTypes";
import { VideoPreview } from "../video-preview/VideoPreview";

type PreviewStageProps = {
  videoImportState: VideoImportState;
};

export function PreviewStage({ videoImportState }: PreviewStageProps) {
  const importedVideo = videoImportState.video;
  const previewTitle = importedVideo?.name ?? "No clip loaded";

  return (
    <section className="previewStage" aria-labelledby="preview-title">
      <div className="previewHeader">
        <div>
          <p className="panelLabel">Preview</p>
          <h2 id="preview-title">{previewTitle}</h2>
        </div>
      </div>
      <VideoPreview importedVideo={importedVideo} />
    </section>
  );
}
