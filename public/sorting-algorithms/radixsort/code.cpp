#include <iostream>
#include <vector>
#include <algorithm>

// Radix sort function
void radixSort(std::vector<int>& arr) {
    // Find the maximum number to determine the number of digits
    int max = *std::max_element(arr.begin(), arr.end());
    int exp = 1;  // Exponent representing the current digit place (units, tens, hundreds, ...)

    // Process each digit place (LSD to MSD)
    while (max / exp > 0) {
        // Buckets for each digit (0-9)
        std::vector<std::vector<int>> buckets(10);

        // Place each element in the appropriate bucket based on the current digit
        for (int x : arr)
            buckets[(x / exp) % 10].push_back(x);

        // Clear arr and collect elements from buckets in order
        arr.clear();
        for (const auto& bucket : buckets)
            arr.insert(arr.end(), bucket.begin(), bucket.end());

        // Move to the next digit place
        exp *= 10;
    }
}

// Function to print array
void printArray(const std::vector<int>& arr) {
    for (int value : arr)
        std::cout << value << " ";
    std::cout << std::endl;
}

// Driver code
int main() {
    int n;

    std::cout << "Welcome to Radix Sort!" << std::endl;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    std::vector<int> arr(n);

    std::cout << "Enter " << n << " elements:" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cout << "Element " << i + 1 << ": ";
        std::cin >> arr[i];
    }

    std::cout << "\nOriginal array: ";
    printArray(arr);

    radixSort(arr);

    std::cout << "Sorted array: ";
    printArray(arr);

    return 0;
}
