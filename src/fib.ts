/**
 * @description Calculate the nth number in the Fibonacci sequence
 * @usage npm run cli -- fib Number(n)
 * @params n: number
 */
export function fib(n: number): number {

    if (!n) throw new Error('parameter n is required');
    if (n < 0) throw new Error('n must be a positive number');

    let prev = 0;
    let current = 1;

    for (let i = 2; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }

    return current;
}