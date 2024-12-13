#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void countingSort(int arr[], int n, int max) {
    int count[max + 1];
    memset(count, 0, sizeof(count)); // Initialize count array to 0

    // Count each element
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    // Update the original array with sorted elements
    int index = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i] > 0) {
            arr[index++] = i;
            count[i]--;
        }
    }
}

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int n, max = 0;
    printf("Enter the total number of elements: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter the elements: ");
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if (arr[i] > max) max = arr[i]; // Find the maximum element
    }
    countingSort(arr, n, max);
    printf("Sorted elements are: ");
    display(arr, n);
    return 0;
}
