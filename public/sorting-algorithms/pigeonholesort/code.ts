export {};

function pigeonholeSort(arr: number[]): void {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const size = max - min + 1;
    const holes: number[] = new Array(size).fill(0);

    for (const num of arr) {
        holes[num - min]++;
    }

    let index = 0;
    for (let i = 0; i < holes.length; i++) {
        while (holes[i] > 0) {
            arr[index++] = i + min;
            holes[i]--;
        }
    }
}

const arr: number[] = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
pigeonholeSort(arr);
console.log("Sorted array:", arr);
