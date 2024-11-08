#include <iostream>

// Merge three sorted subarrays into a single sorted subarray
void merge(int arr[], int left, int mid1, int mid2, int right) {
    // Calculate sizes of temporary arrays
    int n1 = mid1 - left + 1;
    int n2 = mid2 - mid1;
    int n3 = right - mid2;

    // Create temporary arrays
    int leftArr[n1], midArr[n2], rightArr[n3];

    // Copy data to temporary arrays
    for (int i = 0; i < n1; i++)
        leftArr[i] = arr[left + i];
    for (int i = 0; i < n2; i++)
        midArr[i] = arr[mid1 + 1 + i];
    for (int i = 0; i < n3; i++)
        rightArr[i] = arr[mid2 + 1 + i];

    // Merge temporary arrays
    int i = 0, j = 0, k = 0, l = left;
    while (i < n1 && j < n2 && k < n3) {
        if (leftArr[i] <= midArr[j] && leftArr[i] <= rightArr[k]) {
            arr[l] = leftArr[i];
            i++;
        } else if (midArr[j] <= leftArr[i] && midArr[j] <= rightArr[k]) {
            arr[l] = midArr[j];
            j++;
        } else {
            arr[l] = rightArr[k];
            k++;
        }
        l++;
    }

    // Copy remaining elements
    while (i < n1 && j < n2) {
        if (leftArr[i] <= midArr[j]) {
            arr[l] = leftArr[i];
            i++;
        } else {
            arr[l] = midArr[j];
            j++;
        }
        l++;
    }

    while (i < n1 && k < n3) {
        if (leftArr[i] <= rightArr[k]) {
            arr[l] = leftArr[i];
            i++;
        } else {
            arr[l] = rightArr[k];
            k++;
        }
        l++;
    }

    while (j < n2 && k < n3) {
        if (midArr[j] <= rightArr[k]) {
            arr[l] = midArr[j];
            j++;
        } else {
            arr[l] = rightArr[k];
            k++;
        }
        l++;
    }

    // Copy remaining elements from left, middle and right arrays
    while (i < n1) {
        arr[l] = leftArr[i];
        i++;
        l++;
    }

    while (j < n2) {
        arr[l] = midArr[j];
        j++;
        l++;
    }

    while (k < n3) {
        arr[l] = rightArr[k];
        k++;
        l++;
    }
}

// 3-way merge sort function
void threeWayMergeSort(int arr[], int left, int right) {
    // Base case: subarray with 1 or 0 elements is sorted
    if (left >= right)
        return;

    // Calculate midpoints
    int mid1 = left + (right - left) / 3;
    int mid2 = right - (right - left) / 3;

    // Recursively sort subarrays
    threeWayMergeSort(arr, left, mid1);
    threeWayMergeSort(arr, mid1 + 1, mid2);
    threeWayMergeSort(arr, mid2 + 1, right);

    // Merge sorted subarrays
    merge(arr, left, mid1, mid2, right);
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

    // Prompt user for array size
    std::cout << "Welcome to 3-way Merge Sort!" << std::endl;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    // Dynamically allocate memory for array
    int* arr = new int[n];

    // Prompt user for array elements
    std::cout << "Enter " << n << " elements:" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cout << "Element " << i + 1 << ": ";
        std::cin >> arr[i];
    }

    // Display original array
    std::cout << "\nOriginal array: ";
    printArray(arr, n);

    // Sort array using 3-way merge sort
    threeWayMergeSort(arr, 0, n - 1);

    // Display sorted array
    std::cout << "Sorted array: ";
    printArray(arr, n);

    // Free dynamically allocated memory
    delete[] arr;

    return 0;
}
