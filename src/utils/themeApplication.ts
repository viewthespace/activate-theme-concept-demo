import { Theme } from "../types";
import { validatePartialTheme } from "./validation";

// ====== CSS Variable Application ======
export function applyThemeToCSSVariables(theme: Partial<Theme>): void {
  validatePartialTheme(theme);

  const style = document.documentElement.style;

  if (theme.primaryColor) {
    style.setProperty("--primary-color", theme.primaryColor);
  }
  if (theme.secondaryColor) {
    style.setProperty("--secondary-color", theme.secondaryColor);
  }
  if (theme.backgroundColor) {
    style.setProperty("--background-color", theme.backgroundColor);
  }
  if (theme.textColor) {
    style.setProperty("--text-color", theme.textColor);
  }
}

// ====== Theme Merging ======
export function mergeTheme(current: Theme, partial: Partial<Theme>): Theme {
  return {
    primaryColor: partial.primaryColor ?? current.primaryColor,
    secondaryColor: partial.secondaryColor ?? current.secondaryColor,
    backgroundColor: partial.backgroundColor ?? current.backgroundColor,
    textColor: partial.textColor ?? current.textColor,
  };
}

// ====== Theme Reset ======
export function resetThemeToDefault(defaultTheme: Theme): void {
  applyThemeToCSSVariables(defaultTheme);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", "default");
  }
}

// ====== Theme Application with Validation ======
export function applyThemeWithValidation(
  currentTheme: Theme,
  partialTheme: Partial<Theme>,
  _defaultTheme: Theme
): Theme {
  const merged = mergeTheme(currentTheme, partialTheme);
  applyThemeToCSSVariables(merged);

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", "custom");
  }

  return merged;
}
