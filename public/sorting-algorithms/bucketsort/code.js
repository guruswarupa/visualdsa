function bucketSort(arr) {
    const buckets = [];
    const numBuckets = 10;

    for (let i = 0; i < numBuckets; i++) {
        buckets[i] = [];
    }

    for (let i = 0; i < arr.length; i++) {
        const bucketIndex = Math.floor(arr[i] * numBuckets);
        buckets[bucketIndex].push(arr[i]);
    }

    for (let i = 0; i < numBuckets; i++) {
        buckets[i].sort((a, b) => a - b);
    }

    return [].concat(...buckets);
}

const arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.18, 0.23, 0.45, 0.91];
console.log("Original array:", arr);
const sortedArr = bucketSort(arr);
console.log("Sorted array:", sortedArr);
