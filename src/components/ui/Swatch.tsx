import { isValidHexColor } from '../../utils/validation';

interface SwatchProps {
  label: string;
  color?: string; // For StatefulTheme consumers
  cssVariable?: string; // For Token consumers
  className?: string;
}

export function Swatch({ label, color, cssVariable, className = '' }: SwatchProps) {
  // Validate that we have either color or cssVariable, but not both
  if (!color && !cssVariable) {
    console.warn('Swatch: Either color or cssVariable must be provided');
    return null;
  }
  
  if (color && cssVariable) {
    console.warn('Swatch: Only one of color or cssVariable should be provided');
    return null;
  }

  // For StatefulTheme consumers: validate color format
  if (color && !isValidHexColor(color)) {
    return null;
  }

  const backgroundColor = color || `var(${cssVariable})`;
  const displayValue = color || cssVariable;

  return (
    <div className={`group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div 
            className="inline-block w-12 h-12 rounded-xl ring-2 ring-white/20 shadow-lg group-hover:ring-[color:var(--primary-color)] transition-all duration-300" 
            style={{ backgroundColor }}
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary-color)]/20 to-[var(--secondary-color)]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[var(--text-color)]">{label}</span>
          <span className="text-xs text-[var(--text-color)]/60 font-mono" style={{ color: backgroundColor }}>{displayValue}</span>
        </div>
      </div>
    </div>
  );
} 