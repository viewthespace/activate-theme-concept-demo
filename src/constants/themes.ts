import { Theme } from "../types";

// Helper function to calculate contrast color
function getContrastColor(backgroundColor: string): string {
  const hex = backgroundColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Use white text on dark backgrounds, black text on light backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

const backgroundColor = "#0f172a"; // Tailwind slate-900

export const DEFAULT_THEME: Theme = {
  primaryColor: "#2563eb", // Tailwind blue-600
  secondaryColor: "#22c55e", // Tailwind green-500
  backgroundColor,
  textColor: getContrastColor(backgroundColor),
};
