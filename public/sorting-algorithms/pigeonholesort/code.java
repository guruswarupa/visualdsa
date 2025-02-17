public class PigeonholeSort {
    public static void pigeonholeSort(int[] arr) {
        int min = arr[0];
        int max = arr[0];
        int range, i, j, index;

        for (int a = 0; a < arr.length; a++) {
            if (arr[a] > max) {
                max = arr[a];
            }
            if (arr[a] < min) {
                min = arr[a];
            }
        }

        range = max - min + 1;
        int[] holes = new int[range];

        for (i = 0; i < arr.length; i++) {
            holes[arr[i] - min]++;
        }

        index = 0;
        for (j = 0; j < range; j++) {
            while (holes[j]-- > 0) {
                arr[index++] = j + min;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {8, 3, 2, 7, 4, 6, 8};
        pigeonholeSort(arr);

        System.out.print("Sorted array: ");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}