function bitonicSort(arr: number[], low: number, cnt: number, dir: number): void {
    if (cnt > 1) {
        const k = Math.floor(cnt / 2);
        bitonicSort(arr, low, k, 1);
        bitonicSort(arr, low + k, k, 0);
        merge(arr, low, cnt, dir);
    }
}

function merge(arr: number[], low: number, cnt: number, dir: number): void {
    const k = Math.floor(cnt / 2);
    for (let i = low; i < low + k; i++) {
        if (dir === (arr[i] > arr[i + k] ? 1 : 0)) {
            [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
        }
    }
    if (k > 1) {
        merge(arr, low, k, dir);
        merge(arr, low + k, k, dir);
    }
}

function sort(arr: number[]): void {
    bitonicSort(arr, 0, arr.length, 1);
}

const originalArray: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", originalArray);
sort(originalArray);
console.log("Sorted array:", originalArray);
