import { SlidersHorizontal, Waves } from "lucide-react";
import type { EffectPreset } from "./workflowTypes";

const effectPresets: EffectPreset[] = [
  {
    name: "Frame Drag",
    summary: "Bewegung wird in Folgebilder gezogen",
    intensity: "Mittel",
  },
  {
    name: "Vector Melt",
    summary: "Motion-Artefakte werden weich verwischt",
    intensity: "Hoch",
  },
  {
    name: "I-Frame Skip",
    summary: "Schnittpunkte brechen sichtbar auf",
    intensity: "Roh",
  },
];

export function EffectLibrary() {
  return (
    <section className="toolPanel effectPanel" aria-labelledby="effects-title">
      <div className="panelHeading">
        <Waves size={20} aria-hidden="true" />
        <h2 id="effects-title">Effekt wählen</h2>
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
        Parameter öffnen
      </button>
    </section>
  );
}
