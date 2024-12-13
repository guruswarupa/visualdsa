#include <stdio.h>
#include <stdlib.h>

void bucketSort(float arr[], int n) {
    int i, j, k;
    int buckets = 10; // Number of buckets
    float bucket[buckets][n];
    int count[buckets];

    for (i = 0; i < buckets; i++) {
        count[i] = 0; // Initialize counts for each bucket
    }

    // Distribute elements into buckets
    for (i = 0; i < n; i++) {
        int idx = (int)(arr[i] * buckets); // Determine the bucket index
        bucket[idx][count[idx]++] = arr[i];
    }

    // Sort individual buckets
    for (i = 0; i < buckets; i++) {
        for (j = 0; j < count[i] - 1; j++) {
            for (k = 0; k < count[i] - j - 1; k++) {
                if (bucket[i][k] > bucket[i][k + 1]) {
                    float temp = bucket[i][k];
                    bucket[i][k] = bucket[i][k + 1];
                    bucket[i][k + 1] = temp;
                }
            }
        }
    }

    // Concatenate sorted buckets into the original array
    k = 0;
    for (i = 0; i < buckets; i++) {
        for (j = 0; j < count[i]; j++) {
            arr[k++] = bucket[i][j];
        }
    }
}

void display(float arr[], int n) {
    for (int i = 0; i < n; i++) printf("%.2f ", arr[i]);
    printf("\n");
}

int main() {
    int n;
    printf("Enter the total number of elements: ");
    scanf("%d", &n);
    float arr[n];
    printf("Enter the elements (between 0 and 1): ");
    for (int i = 0; i < n; i++) scanf("%f", &arr[i]);
    bucketSort(arr, n);
    printf("Sorted elements are: ");
    display(arr, n);
    return 0;
}
