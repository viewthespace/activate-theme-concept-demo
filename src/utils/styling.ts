import { clsx, type ClassValue } from "clsx";

// ====== Core Styling Utilities ======

/**
 * Utility for combining class names with proper type safety
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ====== Common Style Patterns ======

/**
 * Card container styles with consistent theming
 */
export const cardStyles = {
  base: "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300",
  content: "relative p-8",
  header: "flex items-center gap-3 mb-6",
  indicator: "w-3 h-3 rounded-full",
  title: "text-2xl font-bold text-[var(--text-color)]",
  description: "text-[var(--text-color)]/80 text-lg leading-relaxed mb-8",
  animatedBackground:
    "absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)]/10 via-transparent to-[var(--primary-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
} as const;

/**
 * Section container styles
 */
export const sectionStyles = {
  container: "px-6 py-8",
  wrapper: "max-w-7xl mx-auto",
  card: "bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8",
  title: "text-2xl font-semibold mb-6 text-center text-[var(--text-color)]/90",
} as const;

/**
 * Grid layout styles
 */
export const gridStyles = {
  container: "px-6 pb-12",
  wrapper: "max-w-7xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-2",
  responsive: "grid grid-cols-1 md:grid-cols-2 gap-6",
} as const;

/**
 * Button styles for consistent theming
 */
export const buttonStyles = {
  base: "px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  primary:
    "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90",
  secondary:
    "bg-[var(--secondary-color)] text-white hover:bg-[var(--secondary-color)]/90",
  ghost: "bg-white/10 text-[var(--text-color)] hover:bg-white/20",
  success: "bg-green-500 text-white hover:bg-green-600",
  warning: "bg-orange-500 text-white hover:bg-orange-600",
} as const;

/**
 * Form and input styles
 */
export const formStyles = {
  input:
    "w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--text-color)] placeholder-[var(--text-color)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/50 focus:border-[var(--primary-color)]/50",
  label: "block text-sm font-medium text-[var(--text-color)]/80 mb-2",
  group: "space-y-4",
} as const;

/**
 * Status and indicator styles
 */
export const statusStyles = {
  container: "flex items-center gap-2",
  indicator: "w-3 h-3 rounded-full",
  running: "bg-green-500 animate-pulse",
  stopped: "bg-gray-500",
  text: "text-[var(--text-color)] font-medium",
} as const;

/**
 * Info box styles
 */
export const infoStyles = {
  container: "p-4 rounded-xl bg-black/20 border border-[var(--text-color)]/10",
  header: "flex items-center gap-3 mb-2",
  indicator: "w-2 h-2 rounded-full bg-[var(--secondary-color)]",
  title: "text-sm font-medium text-[var(--text-color)]",
  content: "text-xs text-[var(--text-color)]/60",
} as const;

// ====== Component-Specific Style Builders ======

/**
 * Build card styles with optional customizations
 */
export function buildCardStyles(customizations?: {
  className?: string;
  variant?: "default" | "compact" | "elevated";
}) {
  const { className = "", variant = "default" } = customizations || {};

  const variants = {
    default: cardStyles.base,
    compact: cn(cardStyles.base, "p-6"),
    elevated: cn(cardStyles.base, "shadow-3xl"),
  };

  return cn(variants[variant], className);
}

/**
 * Build button styles with variant and color
 */
export function buildButtonStyles(
  variant: keyof typeof buttonStyles,
  className?: string
) {
  return cn(buttonStyles.base, buttonStyles[variant], className);
}

/**
 * Build section styles with optional customizations
 */
export function buildSectionStyles(customizations?: {
  className?: string;
  padding?: "default" | "compact" | "spacious";
}) {
  const { className = "", padding = "default" } = customizations || {};

  const paddingVariants = {
    default: sectionStyles.container,
    compact: "px-6 py-4",
    spacious: "px-6 py-12",
  };

  return cn(paddingVariants[padding], className);
}

// ====== Theme-Aware Style Helpers ======

/**
 * Get color-aware styles that adapt to the current theme
 */
export const themeAwareStyles = {
  text: {
    primary: "text-[var(--text-color)]",
    secondary: "text-[var(--text-color)]/80",
    muted: "text-[var(--text-color)]/60",
    accent: "text-[var(--primary-color)]",
  },
  background: {
    primary: "bg-[var(--background-color)]",
    secondary: "bg-white/5",
    accent: "bg-[var(--primary-color)]/10",
  },
  border: {
    primary: "border-[var(--text-color)]/10",
    accent: "border-[var(--primary-color)]/20",
  },
} as const;

// ====== Animation and Transition Styles ======

export const animationStyles = {
  fadeIn: "animate-in fade-in duration-300",
  slideUp: "animate-in slide-in-from-bottom-4 duration-300",
  scale: "animate-in zoom-in-95 duration-200",
  pulse: "animate-pulse",
  spin: "animate-spin",
} as const;

// ====== Responsive Design Helpers ======

export const responsiveStyles = {
  container: "max-w-7xl mx-auto",
  padding: "px-6",
  grid: {
    mobile: "grid-cols-1",
    tablet: "md:grid-cols-2",
    desktop: "lg:grid-cols-3",
    wide: "xl:grid-cols-4",
  },
} as const;
