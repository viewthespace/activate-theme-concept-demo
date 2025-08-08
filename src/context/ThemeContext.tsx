import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Theme, ThemeContextValue } from '../types';
import { ensureStyleNode, themeToCSS } from '../utils/themeUtils';

// Helper function to calculate contrast color
function getContrastColor(backgroundColor: string): string {
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Use white text on dark backgrounds, black text on light backgrounds
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

// ====== Context ======
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// ====== Provider ======
export function ThemeProvider({
  defaultTheme,
  children,
}: {
  defaultTheme: Theme;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isLoading, setIsLoading] = useState(false);
  const [currentThemeName, setCurrentThemeName] = useState<string>("");
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Write the initial tokens on mount synchronously to avoid FOUC.
  useLayoutEffect(() => {
    styleRef.current = ensureStyleNode();
    if (styleRef.current) styleRef.current.textContent = themeToCSS(defaultTheme);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", "default");
    }
  }, [defaultTheme]);

  const writeTokens = useCallback((t: Theme) => {
    const node = styleRef.current ?? ensureStyleNode();
    if (node) node.textContent = themeToCSS(t);
  }, []);

  const applyTheme = useCallback(
    (next: Partial<Theme>) => {
      setTheme((prev) => {
        const merged: Theme = {
          primaryColor: next.primaryColor ?? prev.primaryColor,
          secondaryColor: next.secondaryColor ?? prev.secondaryColor,
          backgroundColor: next.backgroundColor ?? prev.backgroundColor,
          textColor: next.textColor ?? (next.backgroundColor ? getContrastColor(next.backgroundColor) : prev.textColor),
        };
        // Write tokens immediately to avoid render-timing races
        writeTokens(merged);
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", "custom");
        }
        return merged;
      });
    },
    [writeTokens]
  );

  const removeTheme = useCallback(() => {
    setTheme(() => {
      writeTokens(defaultTheme);
      if (typeof document !== "undefined") {
        // optional: set to "default" for easier debugging/targeting
        document.documentElement.setAttribute("data-theme", "default");
      }
      return defaultTheme;
    });
  }, [defaultTheme, writeTokens]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, applyTheme, removeTheme, isLoading, setIsLoading, currentThemeName, setCurrentThemeName }),
    [theme, applyTheme, removeTheme, isLoading, setIsLoading, currentThemeName, setCurrentThemeName]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
} 