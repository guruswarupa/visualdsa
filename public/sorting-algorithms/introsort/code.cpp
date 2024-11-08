#include <iostream>
#include <algorithm>
#include <cmath>

// Insertion sort function
void insertionSort(int arr[], int left, int right) {
    for (int i = left + 1; i <= right; i++) {
        int key = arr[i];
        int j = i - 1;

        while (j >= left && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
    }
}

// Heapify function
void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest])
        largest = left;

    if (right < n && arr[right] > arr[largest])
        largest = right;

    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

// Heapsort function for a subarray
void heapSort(int arr[], int left, int right) {
    int n = right - left + 1;

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr + left, n, i);

    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[left], arr[left + i]);
        heapify(arr + left, i, 0);
    }
}

// Introsort function
void introSort(int arr[], int left, int right, int maxDepth) {
    int sizeThreshold = 16; // Threshold for switching to insertion sort

    if ((right - left + 1) <= sizeThreshold) {
        insertionSort(arr, left, right);
        return;
    }

    if (maxDepth == 0) {
        heapSort(arr, left, right);
        return;
    }

    // Quick Sort partitioning
    int pivotIndex = (left + right) / 2;
    std::swap(arr[pivotIndex], arr[right]);

    int storeIndex = left;
    for (int i = left; i < right; i++) {
        if (arr[i] < arr[right]) {
            std::swap(arr[i], arr[storeIndex]);
            storeIndex++;
        }
    }
    std::swap(arr[storeIndex], arr[right]);

    // Recursive introsort with depth reduction
    introSort(arr, left, storeIndex - 1, maxDepth - 1);
    introSort(arr, storeIndex + 1, right, maxDepth - 1);
}

// Driver code
int main() {
    int n;

    std::cout << "Welcome to Introsort!" << std::endl;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    int* arr = new int[n];

    std::cout << "Enter " << n << " elements:" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cout << "Element " << i + 1 << ": ";
        std::cin >> arr[i];
    }

    std::cout << "\nOriginal array: ";
    for (int i = 0; i < n; i++)
        std::cout << arr[i] << " ";
    std::cout << std::endl;

    int maxDepth = 2 * static_cast<int>(log2(n));
    introSort(arr, 0, n - 1, maxDepth);

    std::cout << "Sorted array: ";
    for (int i = 0; i < n; i++)
        std::cout << arr[i] << " ";
    std::cout << std::endl;

    delete[] arr;

    return 0;
}
