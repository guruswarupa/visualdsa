function introsort(arr) {
    const maxDepth = Math.floor(Math.log(arr.length) / Math.log(2)) * 2;
    introsortUtil(arr, 0, arr.length - 1, maxDepth);
}

function introsortUtil(arr, start, end, maxDepth) {
    const size = end - start + 1;
    if (size < 16) {
        insertionSort(arr, start, end);
        return;
    }

    if (maxDepth === 0) {
        heapsort(arr, start, end);
        return;
    }

    const pivotIndex = partition(arr, start, end);
    introsortUtil(arr, start, pivotIndex - 1, maxDepth - 1);
    introsortUtil(arr, pivotIndex + 1, end, maxDepth - 1);
}

function partition(arr, start, end) {
    const pivot = arr[end];
    let i = start - 1;
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[end]] = [arr[end], arr[i + 1]];
    return i + 1;
}

function insertionSort(arr, start, end) {
    for (let i = start + 1; i <= end; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= start && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

function heapsort(arr, start, end) {
    const n = end - start + 1;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, start);
    }
    for (let i = n - 1; i > 0; i--) {
        [arr[start], arr[start + i]] = [arr[start + i], arr[start]];
        heapify(arr, i, 0, start);
    }
}

function heapify(arr, n, i, start) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[start + left] > arr[start + largest]) {
        largest = left;
    }
    if (right < n && arr[start + right] > arr[start + largest]) {
        largest = right;
    }
    if (largest !== i) {
        [arr[start + i], arr[start + largest]] = [arr[start + largest], arr[start + i]];
        heapify(arr, n, largest, start);
    }
}

const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
introsort(arr);
console.log("Sorted array:", arr);
