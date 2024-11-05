fn shell_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    let mut gap = n / 2;
    while gap > 0 {
        for i in gap..n {
            let temp = arr[i];
            let mut j = i;
            while j >= gap && arr[j - gap] > temp {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap /= 2;
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    shell_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
