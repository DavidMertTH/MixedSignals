import { Scissors } from "lucide-react";

const frameGroups = ["I", "P", "P", "B", "P", "I", "P", "P", "B", "P", "P", "I"];

export function TimelinePanel() {
  return (
    <section className="timelinePanel" aria-labelledby="timeline-title">
      <div className="panelHeading">
        <Scissors size={20} aria-hidden="true" />
        <h2 id="timeline-title">Timeline</h2>
      </div>
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
