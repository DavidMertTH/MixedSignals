import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Scissors } from "lucide-react";
import type { TimelineClip, TimelineMoveDirection, TimelineState, TimelineTrackDirection } from "../../core/timeline/timelineTypes";
import { formatVideoDuration } from "../video-import/videoFormatters";

type TimelinePanelProps = {
  timelineState: TimelineState;
  onClipSelected: (clipId: string) => void;
  onSelectedClipMoved: (direction: TimelineMoveDirection) => void;
  onSelectedClipMovedToTrack: (direction: TimelineTrackDirection) => void;
  onSelectedClipSplit: () => void;
};

export function TimelinePanel({
  timelineState,
  onClipSelected,
  onSelectedClipMoved,
  onSelectedClipMovedToTrack,
  onSelectedClipSplit,
}: TimelinePanelProps) {
  const hasSelectedClip = Boolean(timelineState.selectedClipId);
  const timelineDuration = getTimelineDuration(timelineState);

  return (
    <section className="timelinePanel" aria-labelledby="timeline-title">
      <div className="panelHeading timelineHeading">
        <div className="timelineTitle">
          <Scissors size={20} aria-hidden="true" />
          <h2 id="timeline-title">Timeline</h2>
        </div>
        <div className="timelineActions" aria-label="Timeline edit actions">
          <button type="button" aria-label="Split selected clip" disabled={!hasSelectedClip} onClick={onSelectedClipSplit}>
            <Scissors size={15} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Move selected clip left" disabled={!hasSelectedClip} onClick={() => onSelectedClipMoved("left")}>
            <ArrowLeft size={15} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Move selected clip right" disabled={!hasSelectedClip} onClick={() => onSelectedClipMoved("right")}>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Move selected clip up" disabled={!hasSelectedClip} onClick={() => onSelectedClipMovedToTrack("up")}>
            <ArrowUp size={15} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Move selected clip down" disabled={!hasSelectedClip} onClick={() => onSelectedClipMovedToTrack("down")}>
            <ArrowDown size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="timelineRuler" aria-label="Timeline ruler">
        <span>00:00</span>
        <span>{formatVideoDuration(timelineDuration / 2)}</span>
        <span>{formatVideoDuration(timelineDuration)}</span>
      </div>
      <div className="timelineTracks" aria-label="Timeline tracks">
        {timelineState.tracks.map((track) => (
          <div className="timelineTrack" key={track.id}>
            <div className="timelineTrackLabel">{track.name}</div>
            <div className="timelineTrackLane">
              {track.clips.length > 0 ? track.clips.map((clip) => (
                <button
                  className={`timelineClip timelineClip-${clip.kind} ${timelineState.selectedClipId === clip.id ? "timelineClip-selected" : ""}`}
                  type="button"
                  style={createClipStyle(clip, timelineDuration)}
                  onClick={() => onClipSelected(clip.id)}
                  key={clip.id}
                >
                  <strong>{clip.name}</strong>
                  <span>{formatVideoDuration(clip.duration)}</span>
                </button>
              )) : <span className="timelineEmptyTrack">Drop media here</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function getTimelineDuration(timelineState: TimelineState) {
  const clipEndTimes = timelineState.tracks.flatMap((track) => track.clips.map((clip) => clip.startTime + clip.duration));
  const timelineEndTime = Math.max(0, ...clipEndTimes);

  return Math.max(timelineEndTime, 10);
}

function createClipStyle(clip: TimelineClip, timelineDuration: number) {
  const left = `${(clip.startTime / timelineDuration) * 100}%`;
  const width = `${Math.max((clip.duration / timelineDuration) * 100, 6)}%`;

  return {
    left,
    width,
  };
}
