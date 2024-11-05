export {};

function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[arr.length - 1];
    const left: number[] = [];
    const right: number[] = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

const arr: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
const sortedArr = quickSort(arr);
console.log("Sorted array:", sortedArr);
