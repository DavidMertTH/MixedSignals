import { AlertCircle, FileVideo, Upload, X } from "lucide-react";
import type { ChangeEvent, DragEvent } from "react";
import { useRef, useState } from "react";
import { acceptedVideoExtensions } from "../../core/video-import/videoImportConfig";
import type { VideoImportState } from "../../core/video-import/videoImportTypes";
import { formatVideoDuration, formatVideoFileSize, formatVideoResolution } from "../video-import/videoFormatters";

type UploadPanelProps = {
  videoImportState: VideoImportState;
  onVideoSelected: (file: File) => void;
  onVideoCleared: () => void;
};

export function UploadPanel({ videoImportState, onVideoSelected, onVideoCleared }: UploadPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const importedVideo = videoImportState.video;
  const isImportingVideo = videoImportState.status === "loading";
  const hasImportError = videoImportState.status === "error";

  const openFilePicker = () => fileInputRef.current?.click();

  const selectFile = (file: File | undefined) => {
    if (!file) {
      return;
    }

    onVideoSelected(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingVideo(true);
  };

  const handleDragLeave = () => setIsDraggingVideo(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingVideo(false);
    selectFile(event.dataTransfer.files[0]);
  };

  return (
    <section className="toolPanel uploadPanel" aria-labelledby="upload-title">
      <div className="panelHeading">
        <FileVideo size={20} aria-hidden="true" />
        <h2 id="upload-title">Video importieren</h2>
      </div>
      <input
        className="fileInput"
        ref={fileInputRef}
        type="file"
        accept={acceptedVideoExtensions}
        onChange={handleFileChange}
      />
      <div
        className={`dropZone ${isDraggingVideo ? "dropZone-active" : ""} ${hasImportError ? "dropZone-error" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {importedVideo ? (
          <div className="videoFileSummary">
            <strong>{importedVideo.name}</strong>
            <span>{formatVideoDuration(importedVideo.duration)}</span>
            <span>{formatVideoResolution(importedVideo.width, importedVideo.height)}</span>
            <span>{formatVideoFileSize(importedVideo.size)}</span>
          </div>
        ) : (
          <>
            {hasImportError ? <AlertCircle size={28} aria-hidden="true" /> : <Upload size={28} aria-hidden="true" />}
            <strong>{isImportingVideo ? "Import laeuft" : "Datei hier ablegen"}</strong>
            <span>{videoImportState.error ?? "MP4, MOV oder WebM"}</span>
          </>
        )}
      </div>
      <div className="importActions">
        <button className="primaryButton" type="button" onClick={openFilePicker} disabled={isImportingVideo}>
          {isImportingVideo ? "Importiere" : "Video auswaehlen"}
        </button>
        {importedVideo ? (
          <button className="secondaryIconButton" type="button" aria-label="Video entfernen" onClick={onVideoCleared}>
            <X size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
