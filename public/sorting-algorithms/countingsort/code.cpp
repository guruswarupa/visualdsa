#include <iostream>

// Counting sort function
void countingSort(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++)
        if (arr[i] > max)
            max = arr[i];

    int* count = new int[max + 1] {0};

    // Count occurrences
    for (int i = 0; i < size; i++)
        count[arr[i]]++;

    // Calculate cumulative counts
    for (int i = 1; i <= max; i++)
        count[i] += count[i - 1];

    int* output = new int[size];

    // Build sorted array
    for (int i = 0; i < size; i++) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Copy sorted elements to original array
    for (int i = 0; i < size; i++)
        arr[i] = output[i];

    delete[] count;
    delete[] output;
}

// Function to print the array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        std::cout << arr[i] << " ";
    std::cout << std::endl;
}

// Driver code
int main() {
    int n;

    std::cout << "Welcome to Counting Sort!" << std::endl;
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

    countingSort(arr, n);

    std::cout << "Sorted array: ";
    printArray(arr, n);

    delete[] arr;

    return 0;
}
