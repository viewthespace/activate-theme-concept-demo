import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Theme, ThemeContextValue } from '../types';
import { ensureStyleNode, themeToCSS, getContrastColor } from '../utils/themeUtils';
import { ThemeContext } from './ThemeContextValue';

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
    try {
      const node = styleRef.current ?? ensureStyleNode();
      if (node) node.textContent = themeToCSS(t);
    } catch (error) {
      console.error('Failed to write theme tokens:', error);
      // Fallback to default theme
      if (styleRef.current) {
        styleRef.current.textContent = themeToCSS(defaultTheme);
      }
    }
  }, [defaultTheme]);

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