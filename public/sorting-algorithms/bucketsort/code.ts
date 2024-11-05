export {};

function bucketSort(array: number[]): number[] {
    const buckets: number[][] = [];
    const numBuckets = 10;

    for (let i = 0; i < numBuckets; i++) {
        buckets[i] = [];
    }

    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor(array[i] * numBuckets);
        buckets[bucketIndex].push(array[i]);
    }

    for (let i = 0; i < numBuckets; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    return ([] as number[]).concat(...buckets);
}

const numbers: number[] = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.18, 0.23, 0.45, 0.91];
console.log("Original array:", numbers);
const sortedNumbers = bucketSort(numbers);
console.log("Sorted array:", sortedNumbers);
