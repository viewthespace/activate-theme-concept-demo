type SwatchProps = 
  | {
      label: string;
      color: string; // For StatefulTheme consumers
      cssVariable?: never;
      className?: string;
    }
  | {
      label: string;
      color?: never;
      cssVariable: string; // For Token consumers
      className?: string;
    };

export function Swatch({ label, color, cssVariable, className = '' }: SwatchProps) {
  const backgroundColor = color || `var(${cssVariable})`;
  const displayValue = color || cssVariable;

  return (
    <div className={`group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div 
            className="inline-block w-12 h-12 rounded-xl ring-2 ring-white/20 shadow-lg transition-all duration-300" 
            style={{ backgroundColor }}
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white/80">{label}</span>
          <span className="text-xs text-white/60 font-mono" style={{ color: backgroundColor }}>{displayValue}</span>
        </div>
      </div>
    </div>
  );
} 