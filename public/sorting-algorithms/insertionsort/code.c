#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int n;
    printf("enter the total no. of elements:");
    scanf("%d", &n);
    int arr[n];
    printf("enter the elements:");
    for(int i = 0; i < n; i++) 
    {
        scanf("%d", &arr[i]);
    }
    insertionSort(arr, n);
    printf("sorted list:");
    display(arr, n);
    return 0;
}
