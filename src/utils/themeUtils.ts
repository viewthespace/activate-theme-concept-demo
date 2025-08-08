import { Theme } from "../types";

// ====== Utils ======
export const THEME_STYLE_ID = "theme-tokens";

// Color contrast calculation utilities
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function calculateLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

  // Use white text on dark backgrounds, black text on light backgrounds
  // Threshold of 0.5 provides good contrast for most cases
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export function ensureStyleNode(): HTMLStyleElement | null {
  if (typeof document === "undefined") return null;
  let el = document.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement("style");
    el.id = THEME_STYLE_ID;
    document.head.appendChild(el);
  }
  return el;
}

export function themeToCSS(theme: Theme): string {
  // Keep it small & atomic; rewrite textContent on each apply/remove
  const lines = [
    `--primary-color: ${theme.primaryColor};`,
    `--secondary-color: ${theme.secondaryColor};`,
    `--background-color: ${theme.backgroundColor};`,
    `--text-color: ${theme.textColor};`,
  ];
  return `:root{\n  ${lines.join("\n  ")}\n}`;
}

// ====== Example: Async theme application ======
export async function fetchThemeFromAPI(name: string): Promise<Partial<Theme>> {
  // Simulated latency + payload from your backend/preferences
  await new Promise((r) => setTimeout(r, 1500));
  if (name === "solarized") {
    const backgroundColor = "#002b36";
    return {
      primaryColor: "#268bd2",
      secondaryColor: "#2aa198",
      backgroundColor,
      textColor: getContrastColor(backgroundColor),
    };
  }
  if (name === "light") {
    const backgroundColor = "#ffffff";
    return {
      primaryColor: "#1d4ed8",
      secondaryColor: "#059669",
      backgroundColor,
      textColor: getContrastColor(backgroundColor),
    };
  }
  // Partial example: only tweak one token, leave others as-is
  return { primaryColor: "#7c3aed" }; // violet-600
}
