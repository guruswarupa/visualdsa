function insertionSort(arr, left, right) {
    for (let i = left + 1; i <= right; i++) {
        const temp = arr[i];
        let j = i - 1;
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}

function merge(arr, left, mid, right) {
    const len1 = mid - left + 1;
    const len2 = right - mid;
    const leftArr = new Array(len1);
    const rightArr = new Array(len2);
    for (let i = 0; i < len1; i++) leftArr[i] = arr[left + i];
    for (let i = 0; i < len2; i++) rightArr[i] = arr[mid + 1 + i];
    let i = 0, j = 0, k = left;
    while (i < len1 && j < len2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }
    while (i < len1) arr[k++] = leftArr[i++];
    while (j < len2) arr[k++] = rightArr[j++];
}

function timSort(arr) {
    const n = arr.length;
    const minRun = 32;
    for (let i = 0; i < n; i += minRun) {
        insertionSort(arr, i, Math.min(i + minRun - 1, n - 1));
    }
    for (let size = minRun; size < n; size *= 2) {
        for (let left = 0; left < n; left += size * 2) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) {
                merge(arr, left, mid, right);
            }
        }
    }
}

const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
timSort(arr);
console.log("Sorted array:", arr);
