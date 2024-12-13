#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int left, int mid1, int mid2, int right) {
    int n1 = mid1 - left + 1, n2 = mid2 - mid1, n3 = right - mid2;
    int L[n1], M[n2], R[n3];

    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int i = 0; i < n2; i++) M[i] = arr[mid1 + 1 + i];
    for (int i = 0; i < n3; i++) R[i] = arr[mid2 + 1 + i];

    int i = 0, j = 0, k = 0, l = left;
    while (i < n1 && j < n2 && k < n3) {
        if (L[i] <= M[j] && L[i] <= R[k]) arr[l++] = L[i++];
        else if (M[j] <= L[i] && M[j] <= R[k]) arr[l++] = M[j++];
        else arr[l++] = R[k++];
    }

    while (i < n1 && j < n2) arr[l++] = (L[i] <= M[j]) ? L[i++] : M[j++];
    while (j < n2 && k < n3) arr[l++] = (M[j] <= R[k]) ? M[j++] : R[k++];
    while (i < n1 && k < n3) arr[l++] = (L[i] <= R[k]) ? L[i++] : R[k++];
    while (i < n1) arr[l++] = L[i++];
    while (j < n2) arr[l++] = M[j++];
    while (k < n3) arr[l++] = R[k++];
}

void threeWayMergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid1 = left + (right - left) / 3;
        int mid2 = left + 2 * (right - left) / 3;

        threeWayMergeSort(arr, left, mid1);
        threeWayMergeSort(arr, mid1 + 1, mid2);
        threeWayMergeSort(arr, mid2 + 1, right);

        merge(arr, left, mid1, mid2, right);
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
    threeWayMergeSort(arr, 0, n - 1);
    printf("Sorted elements are: ");
    display(arr, n);
    return 0;
}
