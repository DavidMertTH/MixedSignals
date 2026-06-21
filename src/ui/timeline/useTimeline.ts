import { useEffect, useMemo, useRef, useState } from "react";
import type { ImportedVideoFile } from "../../core/video-import/videoImportTypes";
import { TimelineService } from "../../core/timeline/TimelineService";
import type { TimelineMoveDirection, TimelineTrackDirection } from "../../core/timeline/timelineTypes";

export function useTimeline(importedVideo: ImportedVideoFile | null) {
  const timelineService = useMemo(() => new TimelineService(), []);
  const importedAssetIds = useRef<Set<string>>(new Set());
  const [timelineState, setTimelineState] = useState(() => timelineService.createInitialState());

  useEffect(() => {
    if (!importedVideo || importedAssetIds.current.has(importedVideo.id)) {
      return;
    }

    importedAssetIds.current.add(importedVideo.id);
    setTimelineState((currentTimelineState) => timelineService.addAsset(currentTimelineState, {
      id: importedVideo.id,
      kind: "video",
      name: importedVideo.name,
      duration: importedVideo.duration,
    }));
  }, [importedVideo, timelineService]);

  const selectClip = (clipId: string) => {
    setTimelineState((currentTimelineState) => timelineService.selectClip(currentTimelineState, clipId));
  };

  const splitSelectedClip = () => {
    setTimelineState((currentTimelineState) => timelineService.splitSelectedClip(currentTimelineState));
  };

  const moveSelectedClip = (direction: TimelineMoveDirection) => {
    setTimelineState((currentTimelineState) => timelineService.moveSelectedClip(currentTimelineState, direction));
  };

  const moveSelectedClipToTrack = (direction: TimelineTrackDirection) => {
    setTimelineState((currentTimelineState) => timelineService.moveSelectedClipToTrack(currentTimelineState, direction));
  };

  return {
    timelineState,
    moveSelectedClip,
    moveSelectedClipToTrack,
    selectClip,
    splitSelectedClip,
  };
}
