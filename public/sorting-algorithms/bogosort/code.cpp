#include <iostream>
#include <cstdlib>
#include <ctime>
#include <algorithm>

// Function to check if array is sorted
bool isSorted(int arr[], int size) {
    for (int i = 1; i < size; i++)
        if (arr[i] < arr[i - 1])
            return false;
    return true;
}

// Bogo sort function
void bogoSort(int arr[], int size) {
    // Seed random number generator
    srand(time(0));

    while (!isSorted(arr, size)) {
        // Shuffle array randomly
        std::random_shuffle(arr, arr + size);
    }
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

    std::cout << "Welcome to Bogo Sort!" << std::endl;
    std::cout << "Enter the number of elements: ";
    std::cin >> n;

    int* arr = new int[n];

    std::cout << "Enter " << n << " elements:" << std::endl;
    for (int i = 0; i < n; i++) {
        std::cout << "Element " << i + 1 << ": ";
        std::cin >> arr[i];
    }

    std::cout << "\nOriginal array: ";
    printArray(arr, n);

    bogoSort(arr, n);

    std::cout << "Sorted array: ";
    printArray(arr, n);

    delete[] arr;

    return 0;
}
