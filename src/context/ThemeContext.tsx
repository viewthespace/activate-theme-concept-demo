import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Theme, ThemeContextValue } from '../types';
import { ensureStyleNode, themeToCSS, getContrastColor } from '../utils/themeUtils';
import { applyThemeWithValidation, resetThemeToDefault } from '../utils/themeApplication';
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
        // Handle automatic text color calculation for background changes
        const themeWithTextColor = next.backgroundColor 
          ? { ...next, textColor: getContrastColor(next.backgroundColor) }
          : next;
        
        const merged = applyThemeWithValidation(prev, themeWithTextColor, defaultTheme);
        // Write tokens immediately to avoid render-timing races
        writeTokens(merged);
        return merged;
      });
    },
    [writeTokens, defaultTheme]
  );

  const removeTheme = useCallback(() => {
    setTheme(() => {
      resetThemeToDefault(defaultTheme);
      writeTokens(defaultTheme);
      return defaultTheme;
    });
  }, [defaultTheme, writeTokens]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, applyTheme, removeTheme, isLoading, setIsLoading, currentThemeName, setCurrentThemeName }),
    [theme, applyTheme, removeTheme, isLoading, setIsLoading, currentThemeName, setCurrentThemeName]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
} 