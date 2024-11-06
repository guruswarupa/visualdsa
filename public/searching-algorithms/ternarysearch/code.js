function ternarySearch(arr, target, left, right) {
    if (right < left) {
      return -1; // Target not found
    }
  
    // Calculate two midpoints
    const mid1 = left + Math.floor((right - left) / 3);
    const mid2 = right - Math.floor((right - left) / 3);
  
    if (arr[mid1] === target) {
      return mid1; // Target found at mid1
    }
    if (arr[mid2] === target) {
      return mid2; // Target found at mid2
    }
  
    if (target < arr[mid1]) {
      // Search in the left third
      return ternarySearch(arr, target, left, mid1 - 1);
    } else if (target > arr[mid2]) {
      // Search in the right third
      return ternarySearch(arr, target, mid2 + 1, right);
    } else {
      // Search in the middle third
      return ternarySearch(arr, target, mid1 + 1, mid2 - 1);
    }
  }
  
  // Example usage:
  const arr = [1, 2, 3, 5, 8, 10, 12, 15, 18, 20];
  const target = 10;
  const result = ternarySearch(arr, target, 0, arr.length - 1);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  