#include <stdio.h>

void cycleSort(int arr[], int n) {
    for (int start = 0; start < n - 1; start++) {
        int item = arr[start];
        int pos = start;

        for (int i = start + 1; i < n; i++) {
            if (arr[i] < item) pos++;
        }

        if (pos == start) continue;

        while (item == arr[pos]) pos++;
        int temp = arr[pos];
        arr[pos] = item;
        item = temp;

        while (pos != start) {
            pos = start;

            for (int i = start + 1; i < n; i++) {
                if (arr[i] < item) pos++;
            }

            while (item == arr[pos]) pos++;
            temp = arr[pos];
            arr[pos] = item;
            item = temp;
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
    cycleSort(arr, n);
    printf("Sorted elements are: ");
    display(arr, n);
    return 0;
}
