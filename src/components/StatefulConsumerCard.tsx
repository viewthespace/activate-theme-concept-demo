import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { ThemeButton, Swatch } from "./ui";
import { benchmarkTracker } from "../utils/benchmarkUtils";
import { BENCHMARK_THEMES } from "../constants";

export function StatefulConsumerCard() {
  const { theme, applyTheme } = useTheme();
  const renderStartRef = useRef<number | null>(null);

  // Listen for benchmark theme changes
  useEffect(() => {
    const handleBenchmarkTheme = (event: CustomEvent) => {
      const newTheme = event.detail;
      
      // Mark the start of the render cycle
      renderStartRef.current = performance.now();
      
      // Apply the theme (this will trigger a re-render)
      applyTheme(BENCHMARK_THEMES[newTheme as keyof typeof BENCHMARK_THEMES]);
    };

    window.addEventListener('benchmark-theme-change', handleBenchmarkTheme as EventListener);
    return () => {
      window.removeEventListener('benchmark-theme-change', handleBenchmarkTheme as EventListener);
    };
  }, [applyTheme]);

  // Measure the actual render time when the component re-renders
  useEffect(() => {
    if (renderStartRef.current !== null) {
      const renderTime = performance.now() - renderStartRef.current;
      benchmarkTracker.recordRender('context', renderTime);
      renderStartRef.current = null;
    }
  });

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)]/10 via-transparent to-[var(--primary-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-[var(--secondary-color)]"></div>
          <h2 className="text-2xl font-bold text-[var(--text-color)]">Stateful Theme Consumer</h2>
        </div>
        
        <p className="text-[var(--text-color)]/80 text-lg leading-relaxed mb-8">
          Accesses the theme from React context for logic, telemetry, and dynamic rendering. Perfect for components that need programmatic access to theme values.
        </p>

        <div className="space-y-6">
          {/* Theme Context Color Palette */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Theme Context Palette</h3>
            <div className="grid grid-cols-1 gap-4">
              <Swatch label="Primary Color" color={theme.primaryColor} />
              <Swatch label="Secondary Color" color={theme.secondaryColor} />
              <Swatch label="Background Color" color={theme.backgroundColor} />
              <Swatch label="Text Color" color={theme.textColor} />
            </div>
          </div>

          {/* Example Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Example Usage</h3>
            <div className="flex gap-3">
              <ThemeButton variant="solid" color="primary">
                Primary Button
              </ThemeButton>
              <ThemeButton variant="outlined" color="secondary">
                Secondary Button
              </ThemeButton>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-[var(--text-color)]/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary-color)]"></div>
              <span className="text-sm font-medium text-[var(--text-color)]">React Context</span>
            </div>
            <p className="text-xs text-[var(--text-color)]/60">
              Uses <code className="text-[var(--secondary-color)]">theme.primaryColor</code> and <code className="text-[var(--secondary-color)]">{`style={{ backgroundColor: theme.primaryColor }}`}</code> for dynamic styling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 