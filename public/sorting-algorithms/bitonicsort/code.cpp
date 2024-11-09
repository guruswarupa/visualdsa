#include <iostream>

// Function to compare and swap elements
void compareAndSwap(int arr[], int i, int j, bool direction) {
    if (direction == (arr[i] > arr[j])) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// Recursively build bitonic sequence and perform merges
void bitonicMerge(int arr[], int low, int count, bool direction) {
    if (count > 1) {
        int mid = count / 2;
        for (int i = low; i < low + mid; i++) {
            compareAndSwap(arr, i, i + mid, direction);
        }
        bitonicMerge(arr, low, mid, direction);
        bitonicMerge(arr, low + mid, mid, direction);
    }
}

// Recursively sort bitonic sequence
void bitonicSortRec(int arr[], int low, int count, bool direction) {
    if (count > 1) {
        int mid = count / 2;
        // Sort in ascending order in the first half and descending in the second half
        bitonicSortRec(arr, low, mid, true);
        bitonicSortRec(arr, low + mid, mid, false);
        // Merge the whole sequence in the specified direction
        bitonicMerge(arr, low, count, direction);
    }
}

// Bitonic sort function
void bitonicSort(int arr[], int n) {
    bitonicSortRec(arr, 0, n, true);
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

    std::cout << "Welcome to Bitonic Sort!" << std::endl;
    std::cout << "Enter the number of elements (power of 2): ";
    std::cin >> n;

    int* arr = new int[n];

    std::cout << "Enter " << n << " elements:" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cout << "Element " << i + 1 << ": ";
        std::cin >> arr[i];
    }

    std::cout << "\nOriginal array: ";
    printArray(arr, n);

    bitonicSort(arr, n);

    std::cout << "Sorted array: ";
    printArray(arr, n);

    delete[] arr;

    return 0;
}
