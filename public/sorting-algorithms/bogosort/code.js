function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function bogoSort(arr) {
    while (!isSorted(arr)) {
        shuffle(arr);
    }
}

const arr = [64, 25, 12, 22, 11];
console.log("Original array:", arr);
bogoSort(arr);
console.log("Sorted array:", arr);
