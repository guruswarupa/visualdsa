fn selection_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    for i in 0..n - 1 {
        let mut min_idx = i;
        for j in i + 1..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        arr.swap(i, min_idx);
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    selection_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
