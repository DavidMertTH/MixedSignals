import { ThemeSwitcher } from "../theme/ThemeSwitcher";

const menuItems = ["Import", "Save", "Load", "Preferences"];

export function AppHeader() {
  return (
    <header className="appHeader">
      <div className="brandArea">
        <p className="eyebrow">Datamoshing Studio</p>
        <h1>MixedSignals</h1>
      </div>
      <nav className="topMenu" aria-label="Project options">
        {menuItems.map((menuItem) => (
          <button type="button" key={menuItem}>{menuItem}</button>
        ))}
      </nav>
      <div className="headerTools">
        <button className="statusButton" type="button">Preview</button>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
