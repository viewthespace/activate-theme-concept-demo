import { Theme } from "../types";
import { validateTheme } from "./validation";

// ====== Utils ======
export const THEME_STYLE_ID = "theme-tokens";

// Color contrast calculation utilities
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(
      `Invalid hex color format: ${hex}. Expected format: #RRGGBB`
    );
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function calculateLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastColor(backgroundColor: string): `#${string}` {
  try {
    const rgb = hexToRgb(backgroundColor);
    const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

    // Use white text on dark backgrounds, black text on light backgrounds
    // Threshold of 0.5 provides good contrast for most cases
    return luminance > 0.5 ? "#000000" : "#ffffff";
  } catch (error) {
    console.error("Error calculating contrast color:", error);
    // Fallback to a safe default
    return "#ffffff";
  }
}

// ====== Style Management ======
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
  validateTheme(theme);

  // Keep it small & atomic; rewrite textContent on each apply/remove
  const lines = [
    `--primary-color: ${theme.primaryColor};`,
    `--secondary-color: ${theme.secondaryColor};`,
    `--background-color: ${theme.backgroundColor};`,
    `--text-color: ${theme.textColor};`,
  ];
  return `:root{\n  ${lines.join("\n  ")}\n}`;
}

// ====== Theme Definitions ======
export const BENCHMARK_THEMES = {
  solarized: {
    primaryColor: "#268bd2",
    secondaryColor: "#2aa198",
    backgroundColor: "#002b36",
    textColor: "#ffffff",
  },
  light: {
    primaryColor: "#1d4ed8",
    secondaryColor: "#059669",
    backgroundColor: "#ffffff",
    textColor: "#000000",
  },
  dark: {
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    backgroundColor: "#0f172a",
    textColor: "#ffffff",
  },
  purple: {
    primaryColor: "#8b5cf6",
    secondaryColor: "#ec4899",
    backgroundColor: "#1e1b4b",
    textColor: "#ffffff",
  },
} as const;

// ====== Theme Fetching ======
export async function fetchThemeFromAPI(name: string): Promise<Partial<Theme>> {
  // Simulated latency + payload from your backend/preferences
  await new Promise((r) => setTimeout(r, 1500));

  const theme = BENCHMARK_THEMES[name as keyof typeof BENCHMARK_THEMES];
  if (theme) {
    return theme;
  }

  // Partial example: only tweak one token, leave others as-is
  return { primaryColor: "#7c3aed" }; // violet-600
}

export function getThemeSync(name: string): Partial<Theme> {
  const theme = BENCHMARK_THEMES[name as keyof typeof BENCHMARK_THEMES];
  if (theme) {
    return theme;
  }

  // Partial example: only tweak one token, leave others as-is
  return { primaryColor: "#7c3aed" }; // violet-600
}
