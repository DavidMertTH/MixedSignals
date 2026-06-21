import { SlidersHorizontal, Waves } from "lucide-react";
import type { EffectPreset } from "./workflowTypes";

const effectPresets: EffectPreset[] = [
  {
    name: "Frame Drag",
    summary: "Motion is dragged into following frames",
    intensity: "Medium",
  },
  {
    name: "Vector Melt",
    summary: "Motion artifacts smear into soft trails",
    intensity: "High",
  },
  {
    name: "I-Frame Skip",
    summary: "Cut points break into visible glitches",
    intensity: "Raw",
  },
];

export function EffectLibrary() {
  return (
    <section className="toolPanel effectPanel" aria-labelledby="effects-title">
      <div className="panelHeading">
        <Waves size={20} aria-hidden="true" />
        <h2 id="effects-title">Choose effect</h2>
      </div>
      <div className="presetList">
        {effectPresets.map((preset) => (
          <button className="presetItem" type="button" key={preset.name}>
            <span>
              <strong>{preset.name}</strong>
              <small>{preset.summary}</small>
            </span>
            <em>{preset.intensity}</em>
          </button>
        ))}
      </div>
      <button className="secondaryButton" type="button">
        <SlidersHorizontal size={18} aria-hidden="true" />
        Open parameters
      </button>
    </section>
  );
}
