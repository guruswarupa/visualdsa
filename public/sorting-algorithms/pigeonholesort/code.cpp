#include <iostream>
#include <vector>
#include <algorithm>

// Pigeonhole sort function
void pigeonholeSort(std::vector<int>& arr) {
    int myMin = *std::min_element(arr.begin(), arr.end());
    int myMax = *std::max_element(arr.begin(), arr.end());
    int size = myMax - myMin + 1;

    std::vector<int> holes(size, 0);

    for (int x : arr)
        holes[x - myMin]++;

    int i = 0;
    for (int count = 0; count < size; count++) {
        while (holes[count] > 0) {
            holes[count]--;
            arr[i] = count + myMin;
            i++;
        }
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

    std::cout << "Welcome to Pigeonhole Sort!" << std::endl;
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

    pigeonholeSort(arr);

    std::cout << "Sorted array: ";
    printArray(arr);

    return 0;
}
