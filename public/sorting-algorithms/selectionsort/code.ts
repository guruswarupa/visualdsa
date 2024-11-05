function selectionSort(arr: number[]): number[] {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

const array = [64, 25, 12, 22, 11];
const sortedArray = selectionSort(array);
console.log("Sorted array:", sortedArray);
