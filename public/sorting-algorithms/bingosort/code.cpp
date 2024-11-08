#include <iostream>
#include <cstdlib>
#include <ctime>

// Function to generate a random index
int getRandomIndex(int size) {
    return rand() % size;
}

// Bingo Sort function
void bingoSort(int arr[], int size) {
    bool isSorted = false;

    // Seed random number generator
    srand(time(0));

    while (!isSorted) {
        isSorted = true;

        // Shuffle array randomly
        for (int i = 0; i < size; i++) {
            int randomIndex = getRandomIndex(size);
            int temp = arr[i];
            arr[i] = arr[randomIndex];
            arr[randomIndex] = temp;
        }

        // Check if array is sorted
        for (int i = 1; i < size; i++) {
            if (arr[i] < arr[i - 1]) {
                isSorted = false;
                break;
            }
        }
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

    std::cout << "Welcome to Bingo Sort!" << std::endl;
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

    bingoSort(arr, n);

    std::cout << "Sorted array: ";
    printArray(arr, n);

    delete[] arr;

    return 0;
}