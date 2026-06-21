import { useCallback, useEffect, useRef, useState } from "react";
import { VideoImportService } from "../../core/video-import/VideoImportService";
import type { ImportedVideoFile, VideoImportState } from "../../core/video-import/videoImportTypes";

const initialVideoImportState: VideoImportState = {
  status: "empty",
  video: null,
  error: null,
};

export function useVideoImport() {
  const importServiceRef = useRef(new VideoImportService());
  const importedVideoRef = useRef<ImportedVideoFile | null>(null);
  const [videoImportState, setVideoImportState] = useState<VideoImportState>(initialVideoImportState);

  const clearImportedVideo = useCallback(() => {
    importServiceRef.current.releaseVideo(importedVideoRef.current);
    importedVideoRef.current = null;
    setVideoImportState(initialVideoImportState);
  }, []);

  const importVideoFile = useCallback(async (file: File) => {
    setVideoImportState({
      status: "loading",
      video: importedVideoRef.current,
      error: null,
    });

    try {
      const importedVideo = await importServiceRef.current.importFile(file);

      importServiceRef.current.releaseVideo(importedVideoRef.current);
      importedVideoRef.current = importedVideo;

      setVideoImportState({
        status: "ready",
        video: importedVideo,
        error: null,
      });
    } catch (error) {
      setVideoImportState({
        status: "error",
        video: importedVideoRef.current,
        error: error instanceof Error ? error.message : "Video could not be imported.",
      });
    }
  }, []);

  useEffect(() => {
    return () => importServiceRef.current.releaseVideo(importedVideoRef.current);
  }, []);

  return {
    videoImportState,
    importVideoFile,
    clearImportedVideo,
  };
}
