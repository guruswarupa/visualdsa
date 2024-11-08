#include <iostream>

// Comb sort function
void combSort(int arr[], int n) {
    int gap = n;
    bool swapped = true;

    while (gap != 1 || swapped) {
        gap = std::max(1, int(gap / 1.3));
        swapped = false;

        for (int i = 0; i < n - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                // Swap elements
                int temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                swapped = true;
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

    std::cout << "Welcome to Comb Sort!" << std::endl;
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

    combSort(arr, n);

    std::cout << "Sorted array: ";
    printArray(arr, n);

    delete[] arr;

    return 0;
}
