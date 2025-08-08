import { Theme } from "../types";
import { getContrastColor, BENCHMARK_THEMES } from "../utils/themeUtils";

const backgroundColor = "#0f172a"; // Tailwind slate-900

export const DEFAULT_THEME: Theme = {
  primaryColor: "#2563eb", // Tailwind blue-600
  secondaryColor: "#22c55e", // Tailwind green-500
  backgroundColor,
  textColor: getContrastColor(backgroundColor),
};

// Re-export benchmark themes for convenience
export { BENCHMARK_THEMES };
