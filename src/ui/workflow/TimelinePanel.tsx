import { Scissors } from "lucide-react";
import type { ImportedVideoFile } from "../../core/video-import/videoImportTypes";
import { formatVideoDuration } from "../video-import/videoFormatters";

const frameGroups = ["I", "P", "P", "B", "P", "I", "P", "P", "B", "P", "P", "I"];

type TimelinePanelProps = {
  importedVideo: ImportedVideoFile | null;
};

export function TimelinePanel({ importedVideo }: TimelinePanelProps) {
  return (
    <section className="timelinePanel" aria-labelledby="timeline-title">
      <div className="panelHeading">
        <Scissors size={20} aria-hidden="true" />
        <h2 id="timeline-title">Timeline</h2>
      </div>
      {importedVideo ? (
        <div className="timelineClip">
          <strong>{importedVideo.name}</strong>
          <span>{formatVideoDuration(importedVideo.duration)}</span>
        </div>
      ) : null}
      <div className="frameTrack" aria-label="Frame-Struktur Vorschau">
        {frameGroups.map((frameType, index) => (
          <span className={`frameChip frameChip-${frameType}`} key={`${frameType}-${index}`}>
            {frameType}
          </span>
        ))}
      </div>
    </section>
  );
}
