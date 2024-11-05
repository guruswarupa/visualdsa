fn bitonic_sort(arr: &mut Vec<i32>, low: usize, cnt: usize, dir: i32) {
    if cnt > 1 {
        let k = cnt / 2;
        bitonic_sort(arr, low, k, 1);
        bitonic_sort(arr, low + k, k, 0);
        merge(arr, low, cnt, dir);
    }
}

fn merge(arr: &mut Vec<i32>, low: usize, cnt: usize, dir: i32) {
    let k = cnt / 2;
    for i in 0..k {
        if dir == (arr[low + i] > arr[low + i + k]) as i32 {
            arr.swap(low + i, low + i + k);
        }
    }
    if k > 1 {
        merge(arr, low, k, dir);
        merge(arr, low + k, k, dir);
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    bitonic_sort(&mut arr, 0, arr.len(), 1);
    println!("Sorted array: {:?}", arr);
}
