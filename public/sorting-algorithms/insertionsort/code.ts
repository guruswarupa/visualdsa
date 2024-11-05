export {};

function insertionSort(array: number[]): void {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
}

const numbers: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", numbers);
insertionSort(numbers);
console.log("Sorted array:", numbers);
