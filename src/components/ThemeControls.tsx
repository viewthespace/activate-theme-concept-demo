import { useCallback, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { fetchThemeFromAPI } from "../utils/themeUtils";
import { Button } from "./ui";

export function ThemeControls() {
  const { applyTheme, removeTheme, setIsLoading, setCurrentThemeName } = useTheme();

  const onSelect = useCallback(async (preset: string) => {
    // Prevent multiple simultaneous theme changes
    setIsLoading(true);
    setCurrentThemeName(preset);
    try {
      const payload = await fetchThemeFromAPI(preset);
      applyTheme(payload);
    } catch (error) {
      console.error('Failed to fetch theme:', error);
      // Optionally show user feedback here
    } finally {
      setIsLoading(false);
      setCurrentThemeName("");
    }
  }, [applyTheme, setIsLoading, setCurrentThemeName]);

  // Listen for stress test events
  useEffect(() => {
    const handleStressTest = (event: CustomEvent) => {
      onSelect(event.detail);
    };

    window.addEventListener('stress-test-theme', handleStressTest as EventListener);
    return () => {
      window.removeEventListener('stress-test-theme', handleStressTest as EventListener);
    };
  }, [onSelect]);

  return (
    <div className="grid grid-cols-1 gap-3 w-full max-w-sm mx-auto">
      <Button
        variant="solid"
        color="primary"
        onClick={() => onSelect("solarized")}
      >
        Apply Solarized (Async)
      </Button>
      
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onSelect("light")}
      >
        Apply Light (Async)
      </Button>
      
      <Button
        variant="solid"
        color="secondary"
        onClick={() => removeTheme()}
      >
        Reset to Default
      </Button>
    </div>
  );
} 