function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
  
      if (arr[mid] === target) {
        return mid; // Target found, return its index
      } else if (arr[mid] < target) {
        left = mid + 1; // Search the right half
      } else {
        right = mid - 1; // Search the left half
      }
    }
  
    return -1; // Target not found
  }
  
  // Example usage:
  const arr = [1, 3, 5, 7, 9, 11];
  const target = 7;
  const result = binarySearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  