# Styling Strategy Documentation

## Overview

This project uses a **centralized, consistent styling strategy** that builds on the good patterns established in `App.tsx` while providing a scalable, maintainable approach to styling across all components.

## Core Principles

1. **Centralized Style Definitions**: All common styles are defined in `src/utils/styling.ts`
2. **Type Safety**: Full TypeScript support with proper type checking
3. **Theme Awareness**: Styles automatically adapt to the current theme
4. **Consistency**: Reusable patterns across all components
5. **Maintainability**: Single source of truth for styling decisions
6. **Separation of Concerns**: Strict adherence to theme consumption patterns

## Important: Theme Consumption Patterns

This project demonstrates two distinct approaches to theme consumption, and the styling strategy respects this separation:

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

## Key Features

### 1. Utility Functions

#### `cn()` - Class Name Utility

```typescript
import { cn } from "../utils/styling";

// Combines class names with proper type safety
const className = cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
);
```

### 2. Style Objects

#### Card Styles

```typescript
import { cardStyles } from "../utils/styling";

// Usage in components
<div className={cardStyles.base}>
  <div className={cardStyles.content}>
    <div className={cardStyles.header}>
      <div className={cardStyles.indicator}></div>
      <h2 className={cardStyles.title}>Title</h2>
    </div>
    <p className={cardStyles.description}>Description</p>
  </div>
</div>;
```

#### Button Styles

```typescript
import { buildButtonStyles } from "../utils/styling";

// Available variants: 'primary', 'secondary', 'ghost', 'success', 'warning'
<button className={buildButtonStyles("primary")}>Click me</button>;
```

#### Section Styles

```typescript
import { sectionStyles } from "../utils/styling";

<div className={sectionStyles.container}>
  <div className={sectionStyles.wrapper}>
    <div className={sectionStyles.card}>
      <h2 className={sectionStyles.title}>Section Title</h2>
    </div>
  </div>
</div>;
```

### 3. Theme-Aware Styles

```typescript
import { themeAwareStyles } from '../utils/styling';

// Automatically adapts to current theme
<span className={themeAwareStyles.text.primary}>Primary text</span>
<span className={themeAwareStyles.text.secondary}>Secondary text</span>
<span className={themeAwareStyles.text.muted}>Muted text</span>
<span className={themeAwareStyles.text.accent}>Accent text</span>
```

### 4. Status and Info Styles

```typescript
import { statusStyles, infoStyles } from '../utils/styling';

// Status indicators
<div className={statusStyles.container}>
  <div className={cn(statusStyles.indicator, statusStyles.running)}></div>
  <span className={statusStyles.text}>Running...</span>
</div>

// Info boxes
<div className={infoStyles.container}>
  <div className={infoStyles.header}>
    <div className={infoStyles.indicator}></div>
    <span className={infoStyles.title}>Info Title</span>
  </div>
  <p className={infoStyles.content}>Info content</p>
</div>
```

## Migration Guide

### Before (Inconsistent)

```typescript
// Different components using different approaches
<div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300">
  <div className="relative p-8">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-3 h-3 rounded-full bg-[var(--primary-color)]"></div>
      <h2 className="text-2xl font-bold text-[var(--text-color)]">Title</h2>
    </div>
  </div>
</div>
```

### After (Consistent)

```typescript
import { cardStyles, cn } from "../utils/styling";

<div className={cardStyles.base}>
  <div className={cardStyles.content}>
    <div className={cardStyles.header}>
      <div
        className={cn(cardStyles.indicator, "bg-[var(--primary-color)]")}
      ></div>
      <h2 className={cardStyles.title}>Title</h2>
    </div>
  </div>
</div>;
```

## Best Practices

### 1. Import Only What You Need

```typescript
// Good - specific imports
import { cardStyles, cn } from "../utils/styling";

// Avoid - importing everything
import * as styles from "../utils/styling";
```

### 2. Use Builder Functions for Variants

```typescript
// Good - using builder functions
<button className={buildButtonStyles('primary')}>Button</button>

// Avoid - inline styles
<button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg...">Button</button>
```

### 3. Combine with `cn()` for Customizations

```typescript
// Good - combining with custom classes
<div className={cn(cardStyles.base, "custom-class", "another-class")}>

// Good - conditional classes
<div className={cn(
  cardStyles.base,
  isActive && "active-state",
  isDisabled && "disabled-state"
)}>
```

### 4. Theme-Aware Styling

```typescript
// Good - using theme-aware styles
<span className={themeAwareStyles.text.primary}>Text</span>

// Avoid - hardcoded theme values
<span className="text-[var(--text-color)]">Text</span>
```

## Available Style Categories

### Core Components

- `cardStyles` - Card containers and content
- `buttonStyles` - Button variants and states
- `sectionStyles` - Section containers and layouts
- `gridStyles` - Grid layouts and responsive patterns

### UI Elements

- `formStyles` - Form inputs and labels
- `statusStyles` - Status indicators and messages
- `infoStyles` - Info boxes and callouts

### Theme Integration

- `themeAwareStyles` - Theme-adaptive text, background, and border styles
- `animationStyles` - Animation and transition classes
- `responsiveStyles` - Responsive design helpers

### Builder Functions

- `buildCardStyles()` - Card with variants (default, compact, elevated)
- `buildButtonStyles()` - Button with variants (primary, secondary, ghost, success, warning)
- `buildSectionStyles()` - Section with padding variants (default, compact, spacious)

## Benefits

1. **Consistency**: All components use the same styling patterns
2. **Maintainability**: Changes to common styles are made in one place
3. **Type Safety**: TypeScript ensures correct usage
4. **Performance**: Optimized class combinations
5. **Theme Integration**: Automatic adaptation to theme changes
6. **Developer Experience**: Clear, predictable API

## Future Enhancements

- CSS-in-JS integration for dynamic styles
- Design token system for spacing, colors, and typography
- Component-specific style variants
- Animation and transition presets
- Dark/light mode optimizations

## Examples

See the updated components for real-world usage:

### Components Using Centralized Styling

- `src/App.tsx` - Main application layout using centralized styles
- `src/components/BenchmarkDisplay.tsx` - Complex component with multiple style categories

### Components Demonstrating Theme Separation

- `src/components/TokenConsumerCard.tsx` - **Token Consumer**: Uses only CSS custom properties (`bg-[var(--primary-color)]`)
- `src/components/StatefulConsumerCard.tsx` - **Stateful Consumer**: Uses only stateful theme values (`style={{ backgroundColor: theme.primaryColor }}`)

### Correct Implementation Pattern

```typescript
// TokenConsumerCard.tsx - ONLY CSS tokens
<div className="bg-[var(--primary-color)] text-[var(--text-color)]">
  <div className="w-3 h-3 rounded-full bg-[var(--primary-color)]"></div>
</div>

// StatefulConsumerCard.tsx - ONLY stateful theme
<div style={{ backgroundColor: theme.primaryColor, color: theme.textColor }}>
  <div
    className="w-3 h-3 rounded-full"
    style={{ backgroundColor: theme.primaryColor }}
  ></div>
</div>
```
