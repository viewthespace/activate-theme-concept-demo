export interface BenchmarkResult {
  method: "context" | "tokens";
  renderTime: number;
  memoryUsage?: number;
  timestamp: number;
}

export interface BenchmarkStats {
  context: {
    avgRenderTime: number;
    p50RenderTime: number;
    p99RenderTime: number;
    totalRenders: number;
  };
  tokens: {
    avgRenderTime: number;
    p50RenderTime: number;
    p99RenderTime: number;
    totalRenders: number;
  };
}

class BenchmarkTracker {
  private results: BenchmarkResult[] = [];
  private isRunning = false;

  startBenchmark() {
    this.isRunning = true;
    this.results = [];
  }

  endBenchmark() {
    this.isRunning = false;
  }

  recordRender(method: "context" | "tokens", renderTime: number) {
    if (!this.isRunning) return;

    const result = {
      method,
      renderTime,
      timestamp: performance.now(),
    };

    this.results.push(result);
    // console.log(`Benchmark recorded: ${method} - ${renderTime.toFixed(3)}ms`);
  }

  getStats(): BenchmarkStats {
    const contextResults = this.results.filter((r) => r.method === "context");
    const tokenResults = this.results.filter((r) => r.method === "tokens");

    const calculateStats = (results: BenchmarkResult[]) => {
      if (results.length === 0) {
        return {
          avgRenderTime: 0,
          p50RenderTime: 0,
          p99RenderTime: 0,
          totalRenders: 0,
        };
      }

      const times = results.map((r) => r.renderTime).sort((a, b) => a - b);

      // Calculate percentile indices using proper percentile calculation
      // P50: median (middle value)
      const p50Index = Math.floor(times.length * 0.5);

      // P99: 99th percentile (99% of values are below this)
      const p99Index = Math.max(0, Math.floor(times.length * 0.99) - 1);

      const stats = {
        avgRenderTime: times.reduce((a, b) => a + b, 0) / times.length,
        p50RenderTime: times[p50Index] || 0,
        p99RenderTime: times[p99Index] || 0,
        totalRenders: results.length,
      };

      // console.log(`Stats for ${results[0]?.method}:`, {
      //   totalTimes: times.length,
      //   sampleTimes: times.slice(0, 10), // Show first 10 times
      //   p50Index,
      //   p99Index,
      //   p50Value: times[p50Index],
      //   p99Value: times[p99Index],
      //   stats,
      // });

      return stats;
    };

    return {
      context: calculateStats(contextResults),
      tokens: calculateStats(tokenResults),
    };
  }

  getRecentResults(count: number = 10): BenchmarkResult[] {
    return this.results.slice(-count);
  }

  clear() {
    this.results = [];
  }
}

export const benchmarkTracker = new BenchmarkTracker();

// Performance measurement utilities
export function measureRenderTime<T>(fn: () => T): {
  result: T;
  renderTime: number;
} {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return { result, renderTime: end - start };
}

export function formatTime(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(1)}μs`;
  if (ms < 10) return `${ms.toFixed(2)}ms`;
  return `${ms.toFixed(1)}ms`;
}

export function getPerformanceColor(renderTime: number): string {
  if (renderTime < 1) return "#10b981"; // green
  if (renderTime < 5) return "#f59e0b"; // yellow
  return "#ef4444"; // red
}
