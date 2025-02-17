import java.util.Scanner;

public class BingoSort {

    public static void bingoSort(int[] arr, int n) {
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

    public static void display(int[] arr, int n) {
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the number of elements: ");
        int n = scanner.nextInt();
        int[] arr = new int[n];
        System.out.print("Enter the elements: ");
        for (int i = 0; i < n; i++) {
            arr[i] = scanner.nextInt();
        }
        bingoSort(arr, n);
        System.out.print("Sorted array: ");
        display(arr, n);
        scanner.close();
    }
}