#include <stdio.h>
#include <stdlib.h>

void pigeonholeSort(int arr[], int n) {
    int min = arr[0], max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    int range = max - min + 1;
    int holes[range];
    for (int i = 0; i < range; i++) holes[i] = 0;

    for (int i = 0; i < n; i++) holes[arr[i] - min]++;

    int index = 0;
    for (int i = 0; i < range; i++) {
        while (holes[i]-- > 0) {
            arr[index++] = i + min;
        }
    }
}

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int n;
    printf("Enter the total number of elements: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter the elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    pigeonholeSort(arr, n);
    printf("Sorted elements are: ");
    display(arr, n);
    return 0;
}
