import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import { ThemeControls } from './components/ThemeControls';
import { TokenConsumerCard } from './components/TokenConsumerCard';
import { StatefulConsumerCard } from './components/StatefulConsumerCard';
import { TransitionModal } from './components/TransitionModal';
import { BenchmarkDisplay } from './components/BenchmarkDisplay';
import { DEFAULT_THEME } from './constants/themes';

// Tailwind class constants for better readability
const classes = {
  mainContainer: "min-h-screen bg-gradient-to-br from-[var(--background-color)] via-[var(--background-color)]/95 to-[var(--background-color)]/90 text-[var(--text-color)] flex flex-col gap-1",
  
  header: {
    container: "relative overflow-hidden",
    background: "absolute inset-0 bg-gradient-to-r from-[var(--primary-color)]/20 via-transparent to-[var(--secondary-color)]/20",
    content: "relative px-6 py-12 max-w-7xl mx-auto",
    title: "text-5xl md:text-6xl font-bold bg-gradient-to-r from-[var(--text-color)] via-[var(--text-color)]/90 to-[var(--text-color)]/80 bg-clip-text text-transparent",
    subtitle: "text-xl md:text-2xl text-[var(--text-color)]/70 font-light max-w-2xl mx-auto"
  },
  
  controls: {
    container: "px-6 py-8",
    wrapper: "max-w-7xl mx-auto",
    card: "bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8",
    title: "text-2xl font-semibold mb-6 text-center text-[var(--text-color)]/90"
  },
  
  cards: {
    container: "px-6 pb-12",
    wrapper: "max-w-7xl mx-auto",
    grid: "grid grid-cols-1 md:grid-cols-2 gap-2"
  },
  
  footer: {
    container: "border-t border-[var(--text-color)]/10 bg-black/20 backdrop-blur-sm",
    content: "px-6 py-8 max-w-7xl mx-auto text-center",
    text: "text-[var(--text-color)]/60 text-sm"
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
    <div className={classes.mainContainer}>
      {/* Header Section */}
      <div className={classes.header.container}>
        <div className={classes.header.background}></div>
        <div className={classes.header.content}>
          <div className="text-center space-y-4">
            <h1 className={classes.header.title}>
              Theme Demo
            </h1>
            <p className={classes.header.subtitle}>
              A beautiful demonstration of dynamic theming with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className={classes.controls.container}>
        <div className={classes.controls.wrapper}>
          <div className={classes.controls.card}>
            <h2 className={classes.controls.title}>Theme Controls</h2>
            <ThemeControls />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className={classes.cards.container}>
        <div className={classes.cards.wrapper}>
          <div className={classes.cards.grid}>
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
      <div className={classes.footer.container}>
        <div className={classes.footer.content}>
          <p className={classes.footer.text}>
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
