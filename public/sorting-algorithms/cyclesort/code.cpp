#include <iostream>

// Function to sort array using Cycle Sort
void cycleSort(int arr[], int n) {
    for (int cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        int item = arr[cycleStart];
        int position = cycleStart;

        // Find item's correct position
        for (int i = cycleStart + 1; i < n; i++)
            if (arr[i] < item)
                position++;

        // Item already in correct position
        if (position == cycleStart)
            continue;

        // Skip duplicates
        while (item == arr[position])
            position++;

        // Put item in its correct position
        if (position != cycleStart) {
            std::swap(item, arr[position]);
        }

        // Rotate remaining elements in the cycle
        while (position != cycleStart) {
            position = cycleStart;

            for (int i = cycleStart + 1; i < n; i++)
                if (arr[i] < item)
                    position++;

            while (item == arr[position])
                position++;

            // Swap to place the item correctly
            if (item != arr[position]) {
                std::swap(item, arr[position]);
            }
        }
    }
}

// Function to print array
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        std::cout << arr[i] << " ";
    std::cout << std::endl;
}

// Driver code
int main() {
    int numElements;

    std::cout << "Welcome to Cycle Sort!" << std::endl;

    // Input validation
    while (true) {
        std::cout << "Enter the number of elements (positive integer): ";
        std::cin >> numElements;

        if (numElements > 0)
            break;

        std::cout << "Invalid input. Please try again." << std::endl;
    }

    int* array = new (std::nothrow) int[numElements];

    if (!array) {
        std::cerr << "Memory allocation failed." << std::endl;
        return 1;
    }

    std::cout << "Enter " << numElements << " elements:" << std::endl;
    for (int i = 0; i < numElements; i++) {
        std::cout << "Element " << i + 1 << ": ";
        std::cin >> array[i];
    }

    std::cout << "\nOriginal Array:" << std::endl;
    printArray(array, numElements);

    cycleSort(array, numElements);

    std::cout << "\nSorted Array:" << std::endl;
    printArray(array, numElements);

    delete[] array;

    return 0;
}
