import { useCallback, useEffect, useRef, useState } from "react";
import type { ImportedVideoFile } from "../../core/video-import/videoImportTypes";
import type { VideoPreviewState } from "./videoPreviewTypes";

const emptyVideoPreviewState: VideoPreviewState = {
  currentTime: 0,
  duration: 0,
  isMuted: false,
  isPlaying: false,
};

export function useVideoPreview(importedVideo: ImportedVideoFile | null) {
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [videoPreviewState, setVideoPreviewState] = useState<VideoPreviewState>(emptyVideoPreviewState);

  const readVideoState = useCallback(() => {
    const videoElement = videoElementRef.current;

    if (!videoElement) {
      return emptyVideoPreviewState;
    }

    return {
      currentTime: videoElement.currentTime,
      duration: Number.isFinite(videoElement.duration) ? videoElement.duration : importedVideo?.duration ?? 0,
      isMuted: videoElement.muted,
      isPlaying: !videoElement.paused,
    };
  }, [importedVideo]);

  const syncVideoState = useCallback(() => {
    setVideoPreviewState(readVideoState());
  }, [readVideoState]);

  const togglePlayback = useCallback(async () => {
    const videoElement = videoElementRef.current;

    if (!videoElement) {
      return;
    }

    if (videoElement.paused) {
      try {
        await videoElement.play();
      } catch {
        syncVideoState();
        return;
      }
    } else {
      videoElement.pause();
    }

    syncVideoState();
  }, [syncVideoState]);

  const seekTo = useCallback((nextTime: number) => {
    const videoElement = videoElementRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.currentTime = nextTime;
    syncVideoState();
  }, [syncVideoState]);

  const restartPreview = useCallback(() => {
    const videoElement = videoElementRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.currentTime = 0;
    syncVideoState();
  }, [syncVideoState]);

  const toggleMute = useCallback(() => {
    const videoElement = videoElementRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.muted = !videoElement.muted;
    syncVideoState();
  }, [syncVideoState]);

  useEffect(() => {
    const videoElement = videoElementRef.current;

    if (!videoElement) {
      setVideoPreviewState(emptyVideoPreviewState);
      return;
    }

    videoElement.pause();
    videoElement.currentTime = 0;
    videoElement.muted = false;
    setVideoPreviewState({
      currentTime: 0,
      duration: importedVideo?.duration ?? 0,
      isMuted: false,
      isPlaying: false,
    });
  }, [importedVideo]);

  return {
    videoElementRef,
    videoPreviewState,
    restartPreview,
    seekTo,
    syncVideoState,
    toggleMute,
    togglePlayback,
  };
}
