function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i; // Target found, return its index
      }
    }
    return -1; // Target not found
  }
  
  // Example usage with an unsorted array:
  const arr = [10, 3, 6, 8, 2, 7];
  const target = 8;
  const result = linearSearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  