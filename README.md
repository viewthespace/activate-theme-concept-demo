# Theme Demo

A beautiful demonstration of dynamic theming with React, TypeScript, and Tailwind CSS. This project showcases a sophisticated theme system that allows real-time theme switching with smooth transitions and CSS custom properties.

## ✨ Features

- **Dynamic Theme Switching**: Real-time theme changes with smooth transitions
- **CSS Custom Properties**: Uses CSS variables for efficient theme management
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern utility-first CSS framework
- **Responsive Design**: Mobile-first responsive layout using CSS Grid
- **Theme Context**: React Context API for global theme state management
- **Transition Animations**: Smooth loading transitions between themes
- **Contrast Calculation**: Automatic text color calculation based on background luminance
- **Performance Benchmarking**: Comprehensive comparison between context vs token-based theming
- **Real-time Metrics**: Live performance measurements with P50/P99 percentiles
- **Expandable Results**: Detailed individual measurement breakdowns
- **Stress Testing**: Automated performance testing with rapid theme changes

## 🏗️ Architecture & Theme Separation

This project demonstrates two distinct approaches to theme consumption with strict separation:

### Token Consumers (e.g., `TokenConsumerCard.tsx`)

- **ONLY** use CSS custom properties: `bg-[var(--primary-color)]`, `text-[var(--text-color)]`
- **NEVER** import or use the centralized styling system (which contains CSS token references)
- **NEVER** access the theme context directly
- Use inline Tailwind classes with CSS variables

### Stateful Consumers (e.g., `StatefulConsumerCard.tsx`)

- **ONLY** use stateful theme values: `style={{ backgroundColor: theme.primaryColor }}`
- **NEVER** use CSS custom properties or the centralized styling system
- **NEVER** use CSS token references like `var(--primary-color)`
- Access theme through React context: `const { theme } = useTheme()`

### Other Components (e.g., `App.tsx`, `BenchmarkDisplay.tsx`)

- Can use the centralized styling system
- Can mix both approaches as needed
- Not bound by the strict separation requirements

## 🎨 Styling Strategy

The project uses a **centralized, consistent styling strategy** that provides scalable, maintainable styling while respecting theme separation:

### Core Principles

1. **Centralized Style Definitions**: All common styles are defined in `src/utils/styling.ts`
2. **Type Safety**: Full TypeScript support with proper type checking
3. **Theme Awareness**: Styles automatically adapt to the current theme
4. **Consistency**: Reusable patterns across all components
5. **Maintainability**: Single source of truth for styling decisions
6. **Separation of Concerns**: Strict adherence to theme consumption patterns

### Key Features

#### Utility Functions

```typescript
import { cn } from "../utils/styling";

// Combines class names with proper type safety
const className = cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
);
```

#### Style Objects

```typescript
import { cardStyles, buildButtonStyles } from "../utils/styling";

// Card styles
<div className={cardStyles.base}>
  <div className={cardStyles.content}>
    <h2 className={cardStyles.title}>Title</h2>
  </div>
</div>

// Button styles with variants
<button className={buildButtonStyles("primary")}>Click me</button>
```

#### Theme-Aware Styles

```typescript
import { themeAwareStyles } from '../utils/styling';

// Automatically adapts to current theme
<span className={themeAwareStyles.text.primary}>Primary text</span>
<span className={themeAwareStyles.text.secondary}>Secondary text</span>
```

### Available Style Categories

- **Core Components**: `cardStyles`, `buttonStyles`, `sectionStyles`, `gridStyles`
- **UI Elements**: `formStyles`, `statusStyles`, `infoStyles`
- **Theme Integration**: `themeAwareStyles`, `animationStyles`, `responsiveStyles`
- **Builder Functions**: `buildCardStyles()`, `buildButtonStyles()`, `buildSectionStyles()`

## 🔧 Code Organization & Refactoring

The codebase has been refactored to improve maintainability while preserving the core theme separation:

### Key Improvements

1. **Eliminated Duplicate Code**: Single source of truth for theme definitions and validation
2. **Shared Components**: Unified `Swatch` and `ButtonBase` components for both consumer types
3. **Centralized Validation**: Comprehensive validation utilities in `src/utils/validation.ts`
4. **Centralized Theme Application**: Unified theme application logic in `src/utils/themeApplication.ts`
5. **Enhanced Type Safety**: Shared TypeScript interfaces and consistent prop types

### Shared Components

#### Swatch Component (`src/components/ui/Swatch.tsx`)

- Unified color swatch for both StatefulTheme and Token consumers
- Accepts either `color` (for StatefulTheme) or `cssVariable` (for Token consumers)
- Maintains strict separation between approaches

#### ButtonBase Component (`src/components/ui/ButtonBase.tsx`)

- Shared base for all button components
- Common button styles and behavior
- TypeScript interfaces for consistent props

### Benefits Achieved

- **Reduced Code Duplication**: Eliminated ~100 lines of duplicate code
- **Improved Maintainability**: Centralized validation and shared components
- **Enhanced Type Safety**: Shared interfaces and consistent prop types
- **Better Code Organization**: Logical grouping of related utilities
- **Preserved Architecture**: Maintained strict separation between consumer types

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd theme-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Theme System

The theme system is built around CSS custom properties and provides:

### Theme Structure

```typescript
interface Theme {
  primaryColor: string; // Primary brand color
  secondaryColor: string; // Secondary brand color
  backgroundColor: string; // Main background color
  textColor: string; // Main text color (auto-calculated)
}
```

### Key Components

- **ThemeProvider**: Global theme context provider
- **ThemeControls**: UI for theme switching and customization
- **TokenConsumerCard**: Demonstrates theme token consumption
- **StatefulConsumerCard**: Shows stateful theme usage
- **TransitionModal**: Smooth loading transitions
- **BenchmarkDisplay**: Real-time performance comparison interface

### Usage Example

```tsx
import { useTheme } from "./hooks/useTheme";

function MyComponent() {
  const { theme, applyTheme } = useTheme();

  const changeToBlueTheme = () => {
    applyTheme({
      primaryColor: "#2563eb",
      backgroundColor: "#0f172a",
    });
  };

  return (
    <div style={{ backgroundColor: theme.backgroundColor }}>
      <h1 style={{ color: theme.textColor }}>Hello World</h1>
    </div>
  );
}
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ThemeControls.tsx
│   ├── TokenConsumerCard.tsx
│   ├── StatefulConsumerCard.tsx
│   ├── TransitionModal.tsx
│   ├── BenchmarkDisplay.tsx
│   └── ui/             # Reusable UI components
│       ├── Button.tsx
│       ├── ButtonBase.tsx
│       ├── Swatch.tsx
│       ├── ThemeButton.tsx
│       └── TokenButton.tsx
├── context/            # React Context providers
│   ├── ThemeContext.tsx
│   └── ThemeContextValue.ts
├── hooks/              # Custom React hooks
│   └── useTheme.ts
├── constants/          # Application constants
│   ├── index.ts
│   └── themes.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── themeUtils.ts
│   ├── benchmarkUtils.ts
│   ├── styling.ts
│   ├── validation.ts
│   └── themeApplication.ts
└── App.tsx            # Main application component
```

## 🎯 Key Technologies

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **CSS Custom Properties** - Dynamic CSS variables
- **CSS Grid** - Modern layout system
- **Performance API** - High-precision timing measurements

## 🔧 Customization

### Adding New Themes

1. Define your theme in `src/constants/themes.ts`:

```typescript
export const BENCHMARK_THEMES = {
  solarized: {
    primaryColor: "#268bd2",
    secondaryColor: "#2aa198",
    backgroundColor: "#002b36",
    textColor: "#ffffff",
  },
  light: {
    primaryColor: "#1d4ed8",
    secondaryColor: "#059669",
    backgroundColor: "#ffffff",
    textColor: "#000000",
  },
  // Add more themes as needed...
};
```

2. Use the theme in your components:

```typescript
const { applyTheme } = useTheme();
applyTheme(BENCHMARK_THEMES.solarized);
```

### Benchmark Configuration

The benchmark system can be customized by modifying `src/utils/benchmarkUtils.ts`:

- **Measurement Frequency**: Adjust update intervals for real-time stats
- **Percentile Calculations**: Modify P50/P99 calculation methods
- **Performance Thresholds**: Change color coding thresholds for results

### Styling

The project uses Tailwind CSS with CSS custom properties. Theme colors are applied through CSS variables:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #22c55e;
  --background-color: #0f172a;
  --text-color: #ffffff;
}
```

## 📊 Performance Benchmarking

The application includes a comprehensive benchmark system to compare the performance of different theming approaches:

### Benchmark Features

- **Real-time Measurement**: Live performance tracking during theme changes
- **Dual Comparison**: Context-based vs CSS token-based theming
- **Statistical Analysis**: P50 (median) and P99 percentile calculations
- **Expandable Results**: Detailed breakdown of individual measurements
- **Stress Testing**: Automated rapid theme switching for intensive testing

### How to Use the Benchmark

1. **Start Benchmark**: Click "Start Benchmark" to begin collecting data
2. **Single Test**: Use "Single Test" for individual theme changes
3. **Stress Test**: Use "Stress Test (5s)" for intensive performance testing
4. **View Results**: Expand the results sections to see detailed measurements
5. **Compare Performance**: See which approach (context vs tokens) performs better

### What Gets Measured

- **Context Approach**: Full React re-render cycle including state updates and reconciliation
- **Token Approach**: Direct CSS variable updates with DOM reflow costs
- **Real-world Performance**: Actual user experience differences between approaches

### Benchmark Performance Variation

The benchmark results can vary based on system conditions and load:

#### Expected Behavior

- **Normal conditions**: TokenConsumerCard typically wins because direct DOM manipulation is faster than React's render cycle
- **High system load** (e.g., video recording): StatefulConsumerCard might win because browser optimizations for CSS variables can be affected by system pressure, while React's batching might be more consistent

#### Why Results Vary

1. **System Load**: Additional processes (like video recording) increase system load, which can affect React's rendering performance more than direct DOM manipulation
2. **Browser Optimization**: CSS variable updates are often batched and optimized by the browser, while React re-renders involve more JavaScript execution
3. **Measurement Timing**: TokenConsumerCard measures isolated DOM operations, while StatefulConsumerCard measures the entire React render cycle
4. **Memory Pressure**: High system load increases memory pressure, which can impact React's reconciliation process more than direct DOM operations

This variation demonstrates the real-world complexity of performance benchmarking - results can fluctuate based on system conditions, making it important to run benchmarks multiple times under different conditions.

## 📱 Responsive Design

The application uses CSS Grid for layout and is fully responsive:

- **Mobile**: Single column layout
- **Tablet**: Two-column grid layout
- **Desktop**: Full-width layout with max-width containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [React](https://react.dev/)
