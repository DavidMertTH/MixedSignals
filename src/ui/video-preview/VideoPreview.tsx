import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import type { ChangeEvent } from "react";
import type { ImportedVideoFile } from "../../core/video-import/videoImportTypes";
import { formatVideoDuration, formatVideoResolution } from "../video-import/videoFormatters";
import { useVideoPreview } from "./useVideoPreview";

type VideoPreviewProps = {
  importedVideo: ImportedVideoFile | null;
};

export function VideoPreview({ importedVideo }: VideoPreviewProps) {
  const {
    videoElementRef,
    videoPreviewState,
    restartPreview,
    seekTo,
    syncVideoState,
    toggleMute,
    togglePlayback,
  } = useVideoPreview(importedVideo);

  const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
    seekTo(Number(event.target.value));
  };

  if (!importedVideo) {
    return (
      <div className="signalFrame">
        <div className="signalBand signalBand-one" />
        <div className="signalBand signalBand-two" />
        <div className="signalBand signalBand-three" />
        <span>Preview appears after import</span>
      </div>
    );
  }

  return (
    <div className="signalFrame">
      <video
        className="previewVideo"
        ref={videoElementRef}
        src={importedVideo.objectUrl}
        onLoadedMetadata={syncVideoState}
        onTimeUpdate={syncVideoState}
        onPlay={syncVideoState}
        onPause={syncVideoState}
        onVolumeChange={syncVideoState}
        onEnded={syncVideoState}
      />
      <div className="previewMetadata">
        <span>{formatVideoDuration(importedVideo.duration)}</span>
        <span>{formatVideoResolution(importedVideo.width, importedVideo.height)}</span>
      </div>
      <div className="previewControls" aria-label="Video preview controls">
        <button type="button" aria-label={videoPreviewState.isPlaying ? "Pause preview" : "Play preview"} onClick={togglePlayback}>
          {videoPreviewState.isPlaying ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
        <button type="button" aria-label="Restart preview" onClick={restartPreview}>
          <RotateCcw size={16} aria-hidden="true" />
        </button>
        <span className="previewTimecode">
          {formatVideoDuration(videoPreviewState.currentTime)} / {formatVideoDuration(videoPreviewState.duration)}
        </span>
        <input
          className="previewScrubber"
          type="range"
          min="0"
          max={Math.max(videoPreviewState.duration, 0)}
          step="0.01"
          value={Math.min(videoPreviewState.currentTime, videoPreviewState.duration || 0)}
          aria-label="Preview position"
          onChange={handleSeekChange}
        />
        <button type="button" aria-label={videoPreviewState.isMuted ? "Unmute preview" : "Mute preview"} onClick={toggleMute}>
          {videoPreviewState.isMuted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
