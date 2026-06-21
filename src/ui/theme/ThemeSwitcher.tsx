import { Monitor, Moon, SunMedium } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ThemeMode } from "./themeTypes";

const themeStorageKey = "mixedsignals-theme";

const themeOptions: Array<{
  label: string;
  mode: ThemeMode;
  title: string;
  icon: LucideIcon;
}> = [
  {
    label: "Dark",
    mode: "dark",
    title: "Dark mode",
    icon: Moon,
  },
  {
    label: "Light",
    mode: "light",
    title: "Light mode",
    icon: SunMedium,
  },
  {
    label: "System",
    mode: "system",
    title: "System theme",
    icon: Monitor,
  },
];

function readStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedThemeMode = window.localStorage.getItem(themeStorageKey);

  if (storedThemeMode === "dark" || storedThemeMode === "light" || storedThemeMode === "system") {
    return storedThemeMode;
  }

  return "system";
}

function resolveThemeMode(themeMode: ThemeMode): Exclude<ThemeMode, "system"> {
  if (themeMode !== "system") {
    return themeMode;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyThemeMode(themeMode: ThemeMode) {
  const resolvedThemeMode = resolveThemeMode(themeMode);
  document.documentElement.dataset.theme = resolvedThemeMode;
  document.documentElement.dataset.themeMode = themeMode;
}

export function ThemeSwitcher() {
  const [selectedThemeMode, setSelectedThemeMode] = useState<ThemeMode>(readStoredThemeMode);

  useEffect(() => {
    applyThemeMode(selectedThemeMode);
    window.localStorage.setItem(themeStorageKey, selectedThemeMode);

    if (selectedThemeMode !== "system") {
      return;
    }

    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: light)");
    const updateSystemTheme = () => applyThemeMode("system");

    colorSchemeQuery.addEventListener("change", updateSystemTheme);

    return () => colorSchemeQuery.removeEventListener("change", updateSystemTheme);
  }, [selectedThemeMode]);

  return (
    <div className="themeSwitcher" aria-label="Theme">
      {themeOptions.map((themeOption) => {
        const ThemeIcon = themeOption.icon;
        const isSelectedTheme = selectedThemeMode === themeOption.mode;

        return (
          <button
            className={isSelectedTheme ? "active" : undefined}
            type="button"
            aria-label={themeOption.title}
            aria-pressed={isSelectedTheme}
            title={themeOption.title}
            onClick={() => setSelectedThemeMode(themeOption.mode)}
            key={themeOption.mode}
          >
            <ThemeIcon size={16} aria-hidden="true" />
            <span>{themeOption.label}</span>
          </button>
        );
      })}
    </div>
  );
}
