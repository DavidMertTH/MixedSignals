import { ThemeSwitcher } from "../theme/ThemeSwitcher";

export function AppHeader() {
  return (
    <header className="appHeader">
      <div>
        <p className="eyebrow">Datamoshing Studio</p>
        <h1>MixedSignals</h1>
      </div>
      <ThemeSwitcher />
    </header>
  );
}
