export {};

function introsort(array: number[]): void {
    const maxDepth = Math.floor(Math.log(array.length) / Math.log(2)) * 2;
    introsortUtil(array, 0, array.length - 1, maxDepth);
}

function introsortUtil(array: number[], start: number, end: number, maxDepth: number): void {
    const size = end - start + 1;
    if (size < 16) {
        insertionSort(array, start, end);
        return;
    }

    if (maxDepth === 0) {
        heapsort(array, start, end);
        return;
    }

    const pivotIndex = partition(array, start, end);
    introsortUtil(array, start, pivotIndex - 1, maxDepth - 1);
    introsortUtil(array, pivotIndex + 1, end, maxDepth - 1);
}

function partition(array: number[], start: number, end: number): number {
    const pivot = array[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i + 1], array[end]] = [array[end], array[i + 1]];
    return i + 1;
}

function insertionSort(array: number[], start: number, end: number): void {
    for (let i = start + 1; i <= end; i++) {
        const key = array[i];
        let j = i - 1;
        while (j >= start && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
}

function heapsort(array: number[], start: number, end: number): void {
    const n = end - start + 1;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, start);
    }
    for (let i = n - 1; i > 0; i--) {
        [array[start], array[start + i]] = [array[start + i], array[start]];
        heapify(array, i, 0, start);
    }
}

function heapify(array: number[], n: number, i: number, start: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[start + left] > array[start + largest]) {
        largest = left;
    }
    if (right < n && array[start + right] > array[start + largest]) {
        largest = right;
    }
    if (largest !== i) {
        [array[start + i], array[start + largest]] = [array[start + largest], array[start + i]];
        heapify(array, n, largest, start);
    }
}

const numbers: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", numbers);
introsort(numbers);
console.log("Sorted array:", numbers);
