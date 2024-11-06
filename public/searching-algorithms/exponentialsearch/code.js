function binarySearch(arr, left, right, target) {
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
  
      if (arr[mid] === target) {
        return mid; // Target found
      }
  
      if (arr[mid] < target) {
        left = mid + 1; // Search in the right half
      } else {
        right = mid - 1; // Search in the left half
      }
    }
    return -1; // Target not found
  }
  
  function exponentialSearch(arr, target) {
    const n = arr.length;
  
    // If the array is empty, return -1
    if (n === 0) return -1;
  
    // If the target is the first element
    if (arr[0] === target) return 0;
  
    // Find range for binary search
    let i = 1;
    while (i < n && arr[i] <= target) {
      i *= 2; // Exponentially increase the index
    }
  
    // Call binary search for the found range
    return binarySearch(arr, Math.floor(i / 2), Math.min(i, n - 1), target);
  }
  
  // Example usage:
  const arr = [2, 3, 4, 10, 40, 50, 60, 70, 80, 90];
  const target = 10;
  const result = exponentialSearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  