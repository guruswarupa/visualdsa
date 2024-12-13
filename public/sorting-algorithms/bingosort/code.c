#include <stdio.h>

void bingoSort(int arr[], int n) {
    int max = arr[0], bingo, nextBingo, last = n - 1;
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }
    bingo = max;
    while (last > 0) {
        nextBingo = arr[0];
        for (int i = 1; i <= last; i++) {
            if (arr[i] < nextBingo) nextBingo = arr[i];
        }
        for (int i = 0; i <= last; i++) {
            if (arr[i] == bingo) {
                int temp = arr[i];
                arr[i] = arr[last];
                arr[last] = temp;
                last--;
            }
        }
        bingo = nextBingo;
    }
}

void display(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter the elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    bingoSort(arr, n);
    printf("Sorted array: ");
    display(arr, n);
    return 0;
}
