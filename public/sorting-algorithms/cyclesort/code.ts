export {};

function cycleSort(array: number[]): void {
    const n = array.length;

    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        let item = array[cycleStart]; // Changed to let
        let pos = cycleStart;

        for (let i = cycleStart + 1; i < n; i++) {
            if (array[i] < item) {
                pos++;
            }
        }

        if (pos === cycleStart) continue;

        while (item === array[pos]) {
            pos++;
        }

        [array[pos], item] = [item, array[pos]];

        while (pos !== cycleStart) {
            pos = cycleStart;

            for (let i = cycleStart + 1; i < n; i++) {
                if (array[i] < item) {
                    pos++;
                }
            }

            while (item === array[pos]) {
                pos++;
            }

            [array[pos], item] = [item, array[pos]];
        }
    }
}

const numbers: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", numbers);
cycleSort(numbers);
console.log("Sorted array:", numbers);
