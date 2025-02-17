// C# program for implementation
// of Selection Sort
using System;

class SelectionSort {

    static void selectionSort(int[] arr){
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++) {

            // Assume the current position holds
            // the minimum element
            int min_idx = i;

            // Iterate through the unsorted portion
            // to find the actual minimum
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[min_idx]) {

                    // Update min_idx if a smaller element
                    // is found
                    min_idx = j;
                }
            }

           // Move minimum element to its
           // correct position
           int temp = arr[i];
           arr[i] = arr[min_idx];
           arr[min_idx] = temp;         
        }
    }

    static void printArray(int[] arr){
        foreach(int val in arr){
            Console.Write(val + " ");
        }
        Console.WriteLine();
    }

    public static void Main(){
        int[] arr = { 64, 25, 12, 22, 11 };

        Console.Write("Original array: ");
        printArray(arr);

        selectionSort(arr);

        Console.Write("Sorted array: ");
        printArray(arr);
    }
}
