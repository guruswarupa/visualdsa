function metaBinarySearch(arr, target) {
    let jump = Math.floor(Math.sqrt(arr.length)); // Set the jump distance based on array size
    let start = 0;
    let end = jump;
  
    // Step 1: Perform a "meta jump" search to narrow down the possible range
    while (end < arr.length && arr[end] < target) {
      start = end;
      end += jump;
    }
  
    // Adjust end if it goes beyond the array
    end = Math.min(end, arr.length - 1);
  
    // Step 2: Perform binary search in the narrowed range
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
  
      if (arr[mid] === target) {
        return mid; // Target found
      } else if (arr[mid] < target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  
    return -1; // Target not found
  }
  
  // Example usage:
  const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const target = 7;
  const result = metaBinarySearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  