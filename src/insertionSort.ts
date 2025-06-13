/**
 * @description Insertion sort
 * @usage npm run cli -- insertionSort Number[](arr)
 * @params arr: number[]
 */
export function insertionSort(arr: number[]): number[] {
  if (!Array.isArray(arr)) throw new Error("arr must be an array");
  if (arr.length === 0) return arr;

  arr.forEach((item, index) => {
    let current_value = item;
    let current_index = index;
    while (current_index > 0 && arr[current_index - 1] > current_value) {
      arr[current_index] = arr[current_index - 1];
      current_index--;
    }
    arr[current_index] = current_value;
  });

  return arr;
}
