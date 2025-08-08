import { Theme } from "../types";

// ====== Theme Validation ======
export function validateThemeColor(color: string, name: string): void {
  if (!color || typeof color !== "string") {
    throw new Error(`Invalid ${name}: ${color}`);
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    throw new Error(`Invalid ${name} format: ${color}. Expected: #RRGGBB`);
  }
}

export function validateTheme(theme: Theme): void {
  validateThemeColor(theme.primaryColor, "primaryColor");
  validateThemeColor(theme.secondaryColor, "secondaryColor");
  validateThemeColor(theme.backgroundColor, "backgroundColor");
  validateThemeColor(theme.textColor, "textColor");
}

// ====== Hex Color Validation ======
export function isValidHexColor(color: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(color);
}

// ====== Theme Partial Validation ======
export function validatePartialTheme(theme: Partial<Theme>): void {
  if (theme.primaryColor)
    validateThemeColor(theme.primaryColor, "primaryColor");
  if (theme.secondaryColor)
    validateThemeColor(theme.secondaryColor, "secondaryColor");
  if (theme.backgroundColor)
    validateThemeColor(theme.backgroundColor, "backgroundColor");
  if (theme.textColor) validateThemeColor(theme.textColor, "textColor");
}
