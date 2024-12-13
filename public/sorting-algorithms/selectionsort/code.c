#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}

int main() {
    int n;
    printf("enter total no. of elements:");
    scanf("%d", &n);
    int arr[n];
    printf("enter the elements:");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    selectionSort(arr, n);
    printf("sorted list is:");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    return 0;
}
