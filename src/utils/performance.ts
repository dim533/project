export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasure(name: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      this.metrics.get(name)?.push(duration);
      
      // Log if duration exceeds threshold
      if (duration > 100) {
        console.warn(`Performance warning: ${name} took ${duration.toFixed(2)}ms`);
      }
    };
  }

  getMetrics(): Record<string, { avg: number; max: number; min: number }> {
    const result: Record<string, { avg: number; max: number; min: number }> = {};
    
    this.metrics.forEach((durations, name) => {
      result[name] = {
        avg: durations.reduce((a, b) => a + b, 0) / durations.length,
        max: Math.max(...durations),
        min: Math.min(...durations)
      };
    });
    
    return result;
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}

// Usage example
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: Parameters<T>) => {
    const end = PerformanceMonitor.getInstance().startMeasure(name);
    const result = fn(...args);
    
    if (result instanceof Promise) {
      return result.finally(end);
    }
    
    end();
    return result;
  }) as T;
} 