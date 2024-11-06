function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n)); // Determine block size
  
    let prev = 0;
    let curr = step;
  
    // Jump ahead in blocks of size 'step' until we find a block where target could be
    while (curr < n && arr[curr] < target) {
      prev = curr;
      curr += step;
    }
  
    // Perform linear search in the identified block
    for (let i = prev; i < Math.min(curr, n); i++) {
      if (arr[i] === target) {
        return i; // Target found at index i
      }
    }
  
    return -1; // Target not found
  }
  
  // Example usage:
  const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const target = 7;
  const result = jumpSearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  