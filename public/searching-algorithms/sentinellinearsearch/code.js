function sentinelLinearSearch(arr, target) {
    const n = arr.length;
    const last = arr[n - 1]; // Store the last element
    arr[n - 1] = target; // Set the sentinel
  
    let i = 0;
    // Search until we find the target
    while (arr[i] !== target) {
      i++;
    }
  
    // Restore the last element
    arr[n - 1] = last;
  
    // Check if the found element is the actual target (not the sentinel)
    if (i < n - 1 || arr[n - 1] === target) {
      return i; // Target found
    }
    return -1; // Target not found
  }
  
  // Example usage:
  const arr = [12, 3, 5, 8, 2, 9];
  const target = 8;
  const result = sentinelLinearSearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  