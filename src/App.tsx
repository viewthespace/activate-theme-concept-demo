import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { ThemeControls } from './components/ThemeControls';
import { TokenConsumerCard } from './components/TokenConsumerCard';
import { StatefulConsumerCard } from './components/StatefulConsumerCard';
import { TransitionModal } from './components/TransitionModal';
import { BenchmarkDisplay } from './components/BenchmarkDisplay';
import { DEFAULT_THEME } from './constants';
import { 
  themeAwareStyles, 
  responsiveStyles,
  cn 
} from './utils/styling';

// App-specific styles using the centralized styling system
const appStyles = {
  mainContainer: cn(
    "min-h-screen bg-gradient-to-br from-[var(--background-color)] via-[var(--background-color)]/95 to-[var(--background-color)]/90",
    themeAwareStyles.text.primary,
    "flex flex-col gap-1"
  ),
  
  header: {
    container: "relative overflow-hidden",
    background: "absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/20 via-transparent to-[var(--secondary-color)]/20",
    content: cn(responsiveStyles.container, "relative px-6 py-12"),
    title: "text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--text-color)] via-[var(--text-color)]/90 to-[var(--text-color)]/80 bg-clip-text text-transparent",
    subtitle: cn(themeAwareStyles.text.secondary, "text-xl md:text-2xl font-light max-w-2xl mx-auto")
  },
  
  footer: {
    container: cn(
      "border-t",
      themeAwareStyles.border.primary,
      "bg-black/20 backdrop-blur-sm"
    ),
    content: cn(responsiveStyles.container, "px-6 py-8 text-center"),
    text: cn(themeAwareStyles.text.muted, "text-sm")
  }
};

export default function App() {
  return (
    <ThemeProvider defaultTheme={DEFAULT_THEME}>
      <AppContent />
      <ModalContainer />
    </ThemeProvider>
  );
}

function AppContent() {

  return (
    <div className={appStyles.mainContainer}>
      {/* Header Section */}
      <div className={appStyles.header.container}>
        <div className={appStyles.header.background}></div>
        <div className={appStyles.header.content}>
          <div className="text-center space-y-4">
            <h1 className={appStyles.header.title}>
              Theme Demo
            </h1>
            <p className={appStyles.header.subtitle}>
              A beautiful demonstration of dynamic theming with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--text-color)]/90">Theme Controls</h2>
            <ThemeControls />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <TokenConsumerCard />
            <StatefulConsumerCard />
          </div>
        </div>
      </div>

      {/* Benchmark Section */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <BenchmarkDisplay />
        </div>
      </div>

      {/* Footer */}
      <div className={appStyles.footer.container}>
        <div className={appStyles.footer.content}>
          <p className={appStyles.footer.text}>
            Built with React, TypeScript, Tailwind CSS, and CSS Custom Properties
          </p>
        </div>
      </div>
    </div>
  );
}

function ModalContainer() {
  const { isLoading, currentThemeName } = useTheme();
  
  return <TransitionModal isVisible={isLoading} themeName={currentThemeName} />;
}
