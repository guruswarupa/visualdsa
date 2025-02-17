public class BitonicSort {

    public static void bitonicSort(int[] arr, int low, int cnt, boolean dir) {
        if (cnt > 1) {
            int k = cnt / 2;

            // Sort in ascending order since dir here is 1
            bitonicSort(arr, low, k, true);

            // Sort in descending order since dir here is 0
            bitonicSort(arr, low + k, k, false);

            // Merge the whole sequence in ascending order
            bitonicMerge(arr, low, cnt, dir);
        }
    }

    public static void bitonicMerge(int[] arr, int low, int cnt, boolean dir) {
        if (cnt > 1) {
            int k = cnt / 2;
            for (int i = low; i < low + k; i++) {
                if (dir == (arr[i] > arr[i + k])) {
                    // Swap elements
                    int temp = arr[i];
                    arr[i] = arr[i + k];
                    arr[i + k] = temp;
                }
            }
            bitonicMerge(arr, low, k, dir);
            bitonicMerge(arr, low + k, k, dir);
        }
    }

    public static void sort(int[] arr, int n, boolean up) {
        bitonicSort(arr, 0, n, up);
    }

    public static void main(String[] args) {
        int[] arr = {3, 7, 4, 8, 6, 2, 1, 5};
        int n = arr.length;

        sort(arr, n, true);

        System.out.println("Sorted array: ");
        for (int i : arr) {
            System.out.print(i + " ");
        }
    }
}