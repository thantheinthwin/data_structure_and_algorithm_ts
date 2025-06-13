/**
 * @description Bubble sort
 * @usage npm run cli -- bubbleSort Number[](arr)
 * @params arr: number[]
 */
export function bubbleSort(arr: number[]): number[] {
    if (!Array.isArray(arr)) throw new Error('arr must be an array');
    if (arr.length === 0) return arr;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}