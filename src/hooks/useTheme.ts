import { useContext } from "react";
import { ThemeContextValue } from "../types";
import { ThemeContext } from "../context/ThemeContextValue";

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
