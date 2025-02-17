import java.util.Arrays;

public class Introsort {

    private static final int SIZE_THRESHOLD = 16;

    public static void introsort(int[] array) {
        introsort(array, 0, array.length, 2 * (int) Math.floor(Math.log(array.length) / Math.log(2)));
    }

    private static void introsort(int[] array, int start, int end, int depthLimit) {
        if (end - start < SIZE_THRESHOLD) {
            insertionSort(array, start, end);
        } else if (depthLimit == 0) {
            heapsort(array, start, end);
        } else {
            int pivot = partition(array, start, end);
            introsort(array, start, pivot, depthLimit - 1);
            introsort(array, pivot + 1, end, depthLimit - 1);
        }
    }

    private static void insertionSort(int[] array, int start, int end) {
        for (int i = start + 1; i < end; i++) {
            int key = array[i];
            int j = i - 1;
            while (j >= start && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
    }

    private static void heapsort(int[] array, int start, int end) {
        for (int i = (end + start) / 2 - 1; i >= start; i--) {
            maxHeapify(array, i, end, start);
        }
        for (int i = end - 1; i > start; i--) {
            swap(array, start, i);
            maxHeapify(array, start, i, start);
        }
    }

    private static void maxHeapify(int[] array, int i, int end, int start) {
        int largest = i;
        int left = 2 * (i - start) + 1 + start;
        int right = 2 * (i - start) + 2 + start;

        if (left < end && array[left] > array[largest]) {
            largest = left;
        }
        if (right < end && array[right] > array[largest]) {
            largest = right;
        }
        if (largest != i) {
            swap(array, i, largest);
            maxHeapify(array, largest, end, start);
        }
    }

    private static int partition(int[] array, int start, int end) {
        int pivot = array[end - 1];
        int i = start - 1;
        for (int j = start; j < end - 1; j++) {
            if (array[j] <= pivot) {
                i++;
                swap(array, i, j);
            }
        }
        swap(array, i + 1, end - 1);
        return i + 1;
    }

    private static void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    public static void main(String[] args) {
        int[] array = {3, 6, 8, 10, 1, 2, 1};
        introsort(array);
        System.out.println(Arrays.toString(array));
    }
}
