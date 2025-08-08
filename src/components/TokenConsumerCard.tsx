import { TokenButton } from "./ui";

// Simple color swatch component
function ColorSwatch({ label, cssVariable }: { label: string; cssVariable: string }) {
  return (
    <div className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div 
            className="inline-block w-12 h-12 rounded-xl ring-2 ring-white/20 shadow-lg group-hover:ring-[color:var(--primary-color)] transition-all duration-300" 
            style={{ backgroundColor: `var(${cssVariable})` }}
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary-color)]/20 to-[var(--secondary-color)]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[var(--text-color)]">{label}</span>
          <span className="text-xs text-[var(--text-color)]/60 font-mono" style={{ color: `var(${cssVariable})` }}>{cssVariable}</span>
        </div>
      </div>
    </div>
  );
}

export function TokenConsumerCard() {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)]/10 via-transparent to-[var(--primary-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-[var(--primary-color)]"></div>
          <h2 className="text-2xl font-bold text-[var(--text-color)]">Token-First Component</h2>
        </div>
        
        <p className="text-[var(--text-color)]/80 text-lg leading-relaxed mb-8">
          This component styles via CSS variables exposed by the provider. Perfect for components that prefer declarative styling with Tailwind's arbitrary value syntax.
        </p>

        <div className="space-y-6">
          {/* CSS Variable Color Palette */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">CSS Variable Palette</h3>
            <div className="grid grid-cols-1 gap-4">
              <ColorSwatch label="Primary Color" cssVariable="--primary-color" />
              <ColorSwatch label="Secondary Color" cssVariable="--secondary-color" />
              <ColorSwatch label="Background Color" cssVariable="--background-color" />
              <ColorSwatch label="Text Color" cssVariable="--text-color" />
            </div>
          </div>

          {/* Example Buttons */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4">Example Usage</h3>
            <div className="flex gap-3">
              <TokenButton variant="solid" color="primary">
                Primary Button
              </TokenButton>
              <TokenButton variant="outlined" color="secondary">
                Secondary Button
              </TokenButton>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-[var(--text-color)]/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
              <span className="text-sm font-medium text-[var(--text-color)]">CSS Variables</span>
            </div>
            <p className="text-xs text-[var(--text-color)]/60">
              Uses <code className="text-[var(--primary-color)]">bg-[var(--primary-color)]</code> and <code className="text-[var(--primary-color)]">text-[var(--text-color)]</code> for dynamic styling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 