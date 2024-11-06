function findPairWithSum(arr, target) {
    let left = 0; // Start pointer
    let right = arr.length - 1; // End pointer
  
    while (left < right) {
      const sum = arr[left] + arr[right];
  
      if (sum === target) {
        return [arr[left], arr[right]]; // Return the pair
      }
      if (sum < target) {
        left++; // Move the left pointer to the right to increase the sum
      } else {
        right--; // Move the right pointer to the left to decrease the sum
      }
    }
  
    return null; // Return null if no pair is found
  }
  
  // Example usage:
  const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const targetSum = 10;
  const result = findPairWithSum(sortedArray, targetSum);
  
  if (result) {
    console.log(`Pair found: ${result}`);
  } else {
    console.log("No pair found");
  }
  