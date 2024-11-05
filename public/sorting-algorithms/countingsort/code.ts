export {};

function countingSort(array: number[]): void {
    const max = Math.max(...array);
    const count: number[] = new Array(max + 1).fill(0);
    const output: number[] = new Array(array.length);

    for (const num of array) {
        count[num]++;
    }

    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }

    for (let i = array.length - 1; i >= 0; i--) {
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
    }

    for (let i = 0; i < array.length; i++) {
        array[i] = output[i];
    }
}

const numbers: number[] = [4, 2, 2, 8, 3, 3, 1];
console.log("Original array:", numbers);
countingSort(numbers);
console.log("Sorted array:", numbers);
