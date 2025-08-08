import { useState, useEffect } from 'react';
import { benchmarkTracker, BenchmarkStats, formatTime, getPerformanceColor } from '../utils/benchmarkUtils';

export function BenchmarkDisplay() {
  const [stats, setStats] = useState<BenchmarkStats>({
    context: { avgRenderTime: 0, p50RenderTime: 0, p99RenderTime: 0, totalRenders: 0 },
    tokens: { avgRenderTime: 0, p50RenderTime: 0, p99RenderTime: 0, totalRenders: 0 },
  });
  const [isRunning, setIsRunning] = useState(false);
  const [expandedContext, setExpandedContext] = useState(false);
  const [expandedTokens, setExpandedTokens] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStats = benchmarkTracker.getStats();
      setStats(prevStats => {
        // Only update if there are actual changes
        if (JSON.stringify(prevStats) !== JSON.stringify(newStats)) {
          return newStats;
        }
        return prevStats;
      });
    }, 500); // Reduced frequency to 500ms

    return () => clearInterval(interval);
  }, []);

  const handleStartBenchmark = () => {
    benchmarkTracker.startBenchmark();
    setIsRunning(true);
  };

  const handleStopBenchmark = () => {
    benchmarkTracker.endBenchmark();
    setIsRunning(false);
  };

  const handleClearBenchmark = () => {
    benchmarkTracker.clear();
    setStats({
      context: { avgRenderTime: 0, p50RenderTime: 0, p99RenderTime: 0, totalRenders: 0 },
      tokens: { avgRenderTime: 0, p50RenderTime: 0, p99RenderTime: 0, totalRenders: 0 },
    });
  };

  const getWinner = () => {
    if (stats.context.totalRenders === 0 || stats.tokens.totalRenders === 0) return null;
    return stats.context.avgRenderTime < stats.tokens.avgRenderTime ? 'context' : 'tokens';
  };

  const winner = getWinner();

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--secondary-color)]/10 via-transparent to-[var(--primary-color)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 rounded-full bg-[var(--secondary-color)]"></div>
          <h2 className="text-2xl font-bold text-[var(--text-color)]">Performance Benchmark</h2>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleStartBenchmark}
            disabled={isRunning}
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--primary-color)]/90 transition-colors"
          >
            Start Benchmark
          </button>
          <button
            onClick={handleStopBenchmark}
            disabled={!isRunning}
            className="px-4 py-2 bg-[var(--secondary-color)] text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--secondary-color)]/90 transition-colors"
          >
            Stop Benchmark
          </button>
          <button
            onClick={handleClearBenchmark}
            className="px-4 py-2 bg-white/10 text-[var(--text-color)] rounded-lg font-semibold hover:bg-white/20 transition-colors"
          >
            Clear Results
          </button>
          <button
            onClick={() => {
              if (!isRunning) return;
              const themes = ['solarized', 'light', 'dark', 'purple'];
              const randomTheme = themes[Math.floor(Math.random() * themes.length)];
              window.dispatchEvent(new CustomEvent('benchmark-theme-change', { detail: randomTheme }));
            }}
            disabled={!isRunning}
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
          >
            Single Test
          </button>
          <button
            onClick={() => {
              // Trigger rapid theme changes for stress testing
              const interval = setInterval(() => {
                const themes = ['solarized', 'light', 'dark', 'purple'];
                const randomTheme = themes[Math.floor(Math.random() * themes.length)];
                // Dispatch benchmark event for synchronous theme changes
                window.dispatchEvent(new CustomEvent('benchmark-theme-change', { detail: randomTheme }));
              }, 100);
              
              setTimeout(() => clearInterval(interval), 5000); // Stop after 5 seconds
            }}
            disabled={!isRunning}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            Stress Test (5s)
          </button>
        </div>

        {/* Status */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-[var(--text-color)] font-medium">
              {isRunning ? 'Benchmark Running...' : 'Benchmark Stopped'}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Context Results */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></div>
              React Context
              {winner === 'context' && <span className="text-green-400 text-sm">🏆 Winner</span>}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">Average:</span>
                <span 
                  className="font-mono font-semibold"
                  style={{ color: getPerformanceColor(stats.context.avgRenderTime) }}
                >
                  {formatTime(stats.context.avgRenderTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">P50:</span>
                <span className="font-mono text-blue-400">{formatTime(stats.context.p50RenderTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">P99:</span>
                <span className="font-mono text-orange-400">{formatTime(stats.context.p99RenderTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">Renders:</span>
                <span className="font-mono text-[var(--text-color)]">{stats.context.totalRenders}</span>
              </div>
            </div>

            {/* Expandable Results List */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setExpandedContext(!expandedContext)}
                className="flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--text-color)] transition-colors"
              >
                <span className={`transform transition-transform ${expandedContext ? 'rotate-90' : ''}`}>
                  ▶
                </span>
                {expandedContext ? 'Hide' : 'Show'} Individual Results ({stats.context.totalRenders})
              </button>
              
              {expandedContext && (
                <div className="mt-3 max-h-40 overflow-y-auto">
                  <div className="space-y-1">
                    {benchmarkTracker.getRecentResults(50)
                      .filter(result => result.method === 'context')
                      .map((result, index) => (
                        <div key={index} className="flex justify-between text-xs font-mono">
                          <span className="text-[var(--text-color)]/60">#{index + 1}</span>
                          <span 
                            className="text-[var(--text-color)]"
                            style={{ color: getPerformanceColor(result.renderTime) }}
                          >
                            {formatTime(result.renderTime)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tokens Results */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-[var(--text-color)] mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--secondary-color)]"></div>
              CSS Tokens
              {winner === 'tokens' && <span className="text-green-400 text-sm">🏆 Winner</span>}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">Average:</span>
                <span 
                  className="font-mono font-semibold"
                  style={{ color: getPerformanceColor(stats.tokens.avgRenderTime) }}
                >
                  {formatTime(stats.tokens.avgRenderTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">P50:</span>
                <span className="font-mono text-blue-400">{formatTime(stats.tokens.p50RenderTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">P99:</span>
                <span className="font-mono text-orange-400">{formatTime(stats.tokens.p99RenderTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-color)]/70">Renders:</span>
                <span className="font-mono text-[var(--text-color)]">{stats.tokens.totalRenders}</span>
              </div>
            </div>

            {/* Expandable Results List */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => setExpandedTokens(!expandedTokens)}
                className="flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--text-color)] transition-colors"
              >
                <span className={`transform transition-transform ${expandedTokens ? 'rotate-90' : ''}`}>
                  ▶
                </span>
                {expandedTokens ? 'Hide' : 'Show'} Individual Results ({stats.tokens.totalRenders})
              </button>
              
              {expandedTokens && (
                <div className="mt-3 max-h-40 overflow-y-auto">
                  <div className="space-y-1">
                    {benchmarkTracker.getRecentResults(50)
                      .filter(result => result.method === 'tokens')
                      .map((result, index) => (
                        <div key={index} className="flex justify-between text-xs font-mono">
                          <span className="text-[var(--text-color)]/60">#{index + 1}</span>
                          <span 
                            className="text-[var(--text-color)]"
                            style={{ color: getPerformanceColor(result.renderTime) }}
                          >
                            {formatTime(result.renderTime)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Difference */}
        {winner && (
          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <span className="text-[var(--text-color)]/70">Performance Difference: </span>
              <span className="font-mono font-semibold text-green-400">
                {formatTime(Math.abs(stats.context.avgRenderTime - stats.tokens.avgRenderTime))}
              </span>
              <span className="text-[var(--text-color)]/70 ml-2">
                ({winner === 'context' ? 'Context' : 'Tokens'} is faster)
              </span>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-black/20 rounded-xl border border-[var(--text-color)]/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[var(--secondary-color)]"></div>
            <span className="text-sm font-medium text-[var(--text-color)]">How to Benchmark</span>
          </div>
          <p className="text-xs text-[var(--text-color)]/60">
            Click "Start Benchmark" then use "Single Test" or "Stress Test" buttons to trigger synchronous theme changes. The benchmark measures actual theme application performance for both context-based and token-based approaches.
          </p>
        </div>
      </div>
    </div>
  );
} 