function pigeonholeSort(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const size = max - min + 1;
    const holes = new Array(size).fill(0);

    for (let num of arr) {
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

const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
pigeonholeSort(arr);
console.log("Sorted array:", arr);
