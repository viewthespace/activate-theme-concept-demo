export type Theme = {
  primaryColor: `#${string}`; // hex color format
  secondaryColor: `#${string}`;
  backgroundColor: `#${string}`;
  textColor: `#${string}`; // Calculated for optimal contrast
};

export type ThemeContextValue = {
  theme: Theme;
  applyTheme: (next: Partial<Theme>) => void;
  removeTheme: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  currentThemeName: string;
  setCurrentThemeName: (name: string) => void;
};
