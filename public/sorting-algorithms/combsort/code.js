function combSort(arr) {
    const shrinkFactor = 1.3;
    let gap = arr.length;
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) gap = 1;

        sorted = true;
        for (let i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                sorted = false;
            }
        }
    }
}

const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
combSort(arr);
console.log("Sorted array:", arr);
