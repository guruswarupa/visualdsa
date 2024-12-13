#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int isSorted(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) if (arr[i] > arr[i + 1]) return 0;
    return 1;
}

void shuffle(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        int j = rand() % n;
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

void bogoSort(int arr[], int n) {
    while (!isSorted(arr, n)) shuffle(arr, n);
}

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    srand(time(0));
    int n;
    printf("Enter the total number of elements: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter the elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    bogoSort(arr, n);
    printf("Sorted elements are: ");
    display(arr, n);
    return 0;
}
