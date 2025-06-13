/**
 * @description Find the lowest number in an array
 * @usage npm run cli -- find-lowest Number[](arr)
 * @params arr: number[]
 */
export function findLowest(arr: number[]): number {
    if (!arr) throw new Error('parameter arr is required');
    if (!Array.isArray(arr)) throw new Error('arr must be an array');
    if (arr.length === 0) throw new Error('arr must be an array with at least one element');

    let lowest = arr[0];

    arr.forEach(item => {
        if (item < lowest) {
            lowest = item;
        }
    });
    return lowest;
}