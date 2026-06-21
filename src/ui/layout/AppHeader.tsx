import { Sparkles } from "lucide-react";

export function AppHeader() {
  return (
    <header className="appHeader">
      <div>
        <p className="eyebrow">Datamoshing Studio</p>
        <h1>MixedSignals</h1>
      </div>
      <button className="iconButton" type="button" aria-label="Projekt speichern">
        <Sparkles size={20} aria-hidden="true" />
      </button>
    </header>
  );
}
