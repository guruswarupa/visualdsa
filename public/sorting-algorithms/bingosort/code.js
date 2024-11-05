function bingoSort(arr) {
    if (arr.length === 0) return;

    const maxValue = Math.max(...arr);
    const minValue = Math.min(...arr);
    const range = maxValue - minValue + 1;
    const count = new Array(range).fill(0);

    for (const num of arr) {
        count[num - minValue]++;
    }

    let index = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i]-- > 0) {
            arr[index++] = i + minValue;
        }
    }
}

const arr = [64, 25, 12, 22, 11, 12, 25, 64];
console.log("Original array:", arr);
bingoSort(arr);
console.log("Sorted array:", arr);
