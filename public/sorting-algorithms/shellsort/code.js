function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
}

const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
shellSort(arr);
console.log("Sorted array:", arr);
