function mergeSort3Way(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const third = Math.floor(arr.length / 3);
    const left = mergeSort3Way(arr.slice(0, third));
    const middle = mergeSort3Way(arr.slice(third, 2 * third));
    const right = mergeSort3Way(arr.slice(2 * third));

    return merge3Way(left, middle, right);
}

function merge3Way(left: number[], middle: number[], right: number[]): number[] {
    let result: number[] = [];
    let i = 0, j = 0, k = 0;

    while (i < left.length || j < middle.length || k < right.length) {
        const leftVal = i < left.length ? left[i] : Infinity;
        const middleVal = j < middle.length ? middle[j] : Infinity;
        const rightVal = k < right.length ? right[k] : Infinity;

        if (leftVal <= middleVal && leftVal <= rightVal) {
            result.push(left[i]);
            i++;
        } else if (middleVal <= leftVal && middleVal <= rightVal) {
            result.push(middle[j]);
            j++;
        } else {
            result.push(right[k]);
            k++;
        }
    }

    return result;
}

// Example usage with unique variable names
const numbers = [64, 25, 12, 22, 11];
const sortedNumbers = mergeSort3Way(numbers);
console.log("Sorted array:", sortedNumbers);
