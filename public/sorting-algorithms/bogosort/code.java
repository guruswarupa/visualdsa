import java.util.Arrays;
import java.util.Random;

public class BogoSort {

    // Function to check if array is sorted
    public static boolean isSorted(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            if (array[i] > array[i + 1]) {
                return false;
            }
        }
        return true;
    }

    // Function to shuffle the array
    public static void shuffle(int[] array) {
        Random random = new Random();
        for (int i = 0; i < array.length; i++) {
            int randomIndex = random.nextInt(array.length);
            int temp = array[i];
            array[i] = array[randomIndex];
            array[randomIndex] = temp;
        }
    }

    // BogoSort function
    public static void bogoSort(int[] array) {
        while (!isSorted(array)) {
            shuffle(array);
        }
    }

    // Main method to test the BogoSort
    public static void main(String[] args) {
        int[] array = {3, 2, 5, 1, 4};
        System.out.println("Unsorted array: " + Arrays.toString(array));
        bogoSort(array);
        System.out.println("Sorted array: " + Arrays.toString(array));
    }
}