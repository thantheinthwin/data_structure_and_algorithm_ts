/**
 * @description Selection sort
 * @usage npm run cli -- selectionSort Number[](arr)
 * @params arr: number[]
 */
export function selectionSort(arr: number[]): number[] {
    if (!Array.isArray(arr)) throw new Error('arr must be an array');
    if (arr.length === 0) return arr;

    for (let i = 0; i < arr.length; i++) {
        let swapped = false;
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                swapped = true;
            }
        }
        if (swapped) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        } else {
            break;
        }
    }

    return arr;
}