export {};

function combSort(array: number[]): void {
    const shrinkFactor = 1.3;
    let gap = array.length;
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) gap = 1;

        sorted = true;
        for (let i = 0; i + gap < array.length; i++) {
            if (array[i] > array[i + gap]) {
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
                sorted = false;
            }
        }
    }
}

const numbers: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", numbers);
combSort(numbers);
console.log("Sorted array:", numbers);
