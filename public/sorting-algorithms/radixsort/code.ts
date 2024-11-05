export {};

function getMax(arr: number[]): number {
    return Math.max(...arr);
}

function countingSort(arr: number[], exp: number): void {
    const output: number[] = new Array(arr.length);
    const count: number[] = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
        count[Math.floor((arr[i] / exp) % 10)]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[Math.floor((arr[i] / exp) % 10)] - 1] = arr[i];
        count[Math.floor((arr[i] / exp) % 10)]--;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

function radixSort(arr: number[]): void {
    const max = getMax(arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
    }
}

const arr: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
radixSort(arr);
console.log("Sorted array:", arr);
