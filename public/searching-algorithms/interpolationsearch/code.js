function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
  
    while (left <= right && target >= arr[left] && target <= arr[right]) {
      // Estimate the position of the target
      const pos = left + Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
  
      // Check if the estimated position has the target
      if (arr[pos] === target) {
        return pos; // Target found
      }
  
      // If the target is larger, search in the right part
      if (arr[pos] < target) {
        left = pos + 1;
      }
      // If the target is smaller, search in the left part
      else {
        right = pos - 1;
      }
    }
  
    return -1; // Target not found
  }
  
  // Example usage:
  const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const target = 70;
  const result = interpolationSearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  