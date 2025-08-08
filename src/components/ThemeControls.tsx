import { useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { fetchThemeFromAPI } from "../utils/themeUtils";
import { Button } from "./ui";

export function ThemeControls() {
  const { applyTheme, removeTheme, setIsLoading, setCurrentThemeName } = useTheme();

  const onSelect = useCallback(async (preset: string) => {
    console.log('ThemeControls: Starting theme change to', preset);
    setIsLoading(true);
    setCurrentThemeName(preset);
    console.log('ThemeControls: Set loading state to true');
    try {
      const payload = await fetchThemeFromAPI(preset);
      console.log('ThemeControls: Received theme payload', payload);
      applyTheme(payload);
    } finally {
      console.log('ThemeControls: Setting loading state to false');
      setIsLoading(false);
      setCurrentThemeName("");
    }
  }, [applyTheme, setIsLoading, setCurrentThemeName]);

  return (
    <div className="grid grid-cols-1 gap-3 w-full max-w-sm mx-auto">
      <Button
        variant="solid"
        color="primary"
        onClick={() => onSelect("solarized")}
      >
        Apply Solarized
      </Button>
      
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onSelect("light")}
      >
        Apply Light
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