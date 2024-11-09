#include <iostream>
#include <vector>

// Calculate the maximum element
int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++)
        if (arr[i] > max)
            max = arr[i];
    return max;
}

// Bucket sort function
void bucketSort(int arr[], int size) {
    // Calculate maximum element
    int max = findMax(arr, size);

    // Create empty buckets
    std::vector<std::vector<int>> buckets(max + 1);

    // Distribute elements into buckets
    for (int i = 0; i < size; i++)
        buckets[arr[i]].push_back(arr[i]);

    // Initialize index
    int index = 0;

    // Collect sorted elements from buckets
    for (int i = 0; i <= max; i++) {
        for (int j = 0; j < buckets[i].size(); j++) {
            arr[index] = buckets[i][j];
            index++;
        }
    }
}

// Print array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        std::cout << arr[i] << " ";
    std::cout << std::endl;
}

// Driver code
int main() {
    int n;

    std::cout << "Welcome to Bucket Sort!" << std::endl;
    std::cout << "Enter the number of non-negative integer elements: ";
    std::cin >> n;

    int* arr = new int[n];

    std::cout << "Enter " << n << " elements:" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cout << "Element " << i + 1 << ": ";
        std::cin >> arr[i];
    }

    std::cout << "\nOriginal array: ";
    printArray(arr, n);

    bucketSort(arr, n);

    std::cout << "Sorted array: ";
    printArray(arr, n);

    delete[] arr;

    return 0;
}
