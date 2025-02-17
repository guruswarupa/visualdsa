function mergeSort3Way(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const thirdLength = Math.floor(arr.length / 3);
    const left = arr.slice(0, thirdLength);
    const middle = arr.slice(thirdLength, 2 * thirdLength);
    const right = arr.slice(2 * thirdLength);

    return merge3Way(mergeSort3Way(left), mergeSort3Way(middle), mergeSort3Way(right));
}

function merge3Way(left, middle, right) {
    let result = [];
    let i = 0, j = 0, k = 0;

    while (i < left.length && j < middle.length && k < right.length) {
        if (left[i] < middle[j]) {
            if (left[i] < right[k]) {
                result.push(left[i++]);
            } else {
                result.push(right[k++]);
            }
        } else {
            if (middle[j] < right[k]) {
                result.push(middle[j++]);
            } else {
                result.push(right[k++]);
            }
        }
    }

    while (i < left.length && j < middle.length) {
        result.push(left[i] < middle[j] ? left[i++] : middle[j++]);
    }

    while (j < middle.length && k < right.length) {
        result.push(middle[j] < right[k] ? middle[j++] : right[k++]);
    }

    while (i < left.length && k < right.length) {
        result.push(left[i] < right[k] ? left[i++] : right[k++]);
    }

    result = result.concat(left.slice(i)).concat(middle.slice(j)).concat(right.slice(k));
    return result;
}

// Example usage:
const arr = [34, 7, 23, 32, 5, 62];
const sortedArr = mergeSort3Way(arr);
console.log(sortedArr);