public class ThreeWayMergeSort {

    public static void threeWayMergeSort(int[] array) {
        if (array == null) {
            return;
        }

        int n = array.length;
        if (n < 2) {
            return;
        }

        // Create copies of the array
        int[] left = new int[n / 3];
        int[] middle = new int[n / 3];
        int[] right = new int[n - 2 * (n / 3)];

        // Split the array into three parts
        System.arraycopy(array, 0, left, 0, n / 3);
        System.arraycopy(array, n / 3, middle, 0, n / 3);
        System.arraycopy(array, 2 * (n / 3), right, 0, n - 2 * (n / 3));

        // Recursively sort the three parts
        threeWayMergeSort(left);
        threeWayMergeSort(middle);
        threeWayMergeSort(right);

        // Merge the sorted parts
        merge(array, left, middle, right);
    }

    private static void merge(int[] array, int[] left, int[] middle, int[] right) {
        int i = 0, j = 0, k = 0, l = 0;

        // Merge the three parts into the original array
        while (i < left.length && j < middle.length && k < right.length) {
            if (left[i] <= middle[j] && left[i] <= right[k]) {
                array[l++] = left[i++];
            } else if (middle[j] <= left[i] && middle[j] <= right[k]) {
                array[l++] = middle[j++];
            } else {
                array[l++] = right[k++];
            }
        }

        // Merge the remaining elements
        while (i < left.length && j < middle.length) {
            array[l++] = (left[i] <= middle[j]) ? left[i++] : middle[j++];
        }
        while (j < middle.length && k < right.length) {
            array[l++] = (middle[j] <= right[k]) ? middle[j++] : right[k++];
        }
        while (i < left.length && k < right.length) {
            array[l++] = (left[i] <= right[k]) ? left[i++] : right[k++];
        }

        // Copy the remaining elements
        while (i < left.length) {
            array[l++] = left[i++];
        }
        while (j < middle.length) {
            array[l++] = middle[j++];
        }
        while (k < right.length) {
            array[l++] = right[k++];
        }
    }

    public static void main(String[] args) {
        int[] array = {34, 7, 23, 32, 5, 62, 32, 23, 7, 34};
        threeWayMergeSort(array);
        for (int i : array) {
            System.out.print(i + " ");
        }
    }
}