function bitonicSort(arr, low, cnt, dir) {
    if (cnt > 1) {
        const k = Math.floor(cnt / 2);
        bitonicSort(arr, low, k, 1);
        bitonicSort(arr, low + k, k, 0);
        merge(arr, low, cnt, dir);
    }
}

function merge(arr, low, cnt, dir) {
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

function sort(arr) {
    bitonicSort(arr, 0, arr.length, 1);
}

const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
sort(arr);
console.log("Sorted array:", arr);
