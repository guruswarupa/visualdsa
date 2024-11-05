// Ensure this file is treated as a module
export {}; 

function bubbleSort(array: number[]): void {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
}

const numbers: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", numbers);
bubbleSort(numbers);
console.log("Sorted array:", numbers);
