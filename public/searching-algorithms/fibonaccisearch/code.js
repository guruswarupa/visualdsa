function fibonacciSearch(arr, target) {
    const n = arr.length;
  
    // Initialize Fibonacci numbers
    let fibM2 = 0; // (m-2)'th Fibonacci number
    let fibM1 = 1; // (m-1)'th Fibonacci number
    let fibM = fibM1 + fibM2; // m'th Fibonacci number
  
    // Find the smallest Fibonacci number greater than or equal to n
    while (fibM < n) {
      fibM2 = fibM1;
      fibM1 = fibM;
      fibM = fibM1 + fibM2;
    }
  
    // Offset of the eliminated range
    let offset = -1;
  
    // While there are elements to be inspected
    while (fibM > 1) {
      // Calculate the index to check
      const i = Math.min(offset + fibM2, n - 1);
  
      // If target is greater than the value at index i
      if (arr[i] < target) {
        fibM = fibM1;
        fibM1 = fibM2;
        fibM2 = fibM - fibM1;
        offset = i; // Move the offset to i
      }
      // If target is less than the value at index i
      else if (arr[i] > target) {
        fibM = fibM2;
        fibM1 -= fibM2;
        fibM2 = fibM - fibM1;
      }
      // Target found
      else {
        return i;
      }
    }
  
    // Comparing the last element with target
    if (fibM1 && offset + 1 < n && arr[offset + 1] === target) {
      return offset + 1; // Target found
    }
  
    return -1; // Target not found
  }
  
  // Example usage:
  const arr = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
  const target = 85;
  const result = fibonacciSearch(arr, target);
  
  if (result !== -1) {
    console.log(`Target found at index ${result}`);
  } else {
    console.log("Target not found in the array");
  }
  