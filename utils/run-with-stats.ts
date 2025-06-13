export function runWithStats<T>(
    fn: () => T,
  ): { result: T, executionTime: number } { 
    const start = performance.now();
    const result = fn();
    const end = performance.now();
  
    // console.log(`Execution Time: ${(end - start).toFixed(3)} ms`);
    return { result, executionTime: end - start };
  }
  