fn merge_sort(arr: &mut Vec<i32>) {
    let len = arr.len();
    if len <= 1 {
        return;
    }
    let mid = len / 2;
    let mut left = arr[0..mid].to_vec();
    let mut right = arr[mid..len].to_vec();
    merge_sort(&mut left);
    merge_sort(&mut right);
    merge(arr, left, right);
}

fn merge(arr: &mut Vec<i32>, left: Vec<i32>, right: Vec<i32>) {
    let mut i = 0;
    let mut j = 0;
    let mut k = 0;
    let left_len = left.len();
    let right_len = right.len();
    while i < left_len && j < right_len {
        if left[i] <= right[j] {
            arr[k] = left[i];
            i += 1;
        } else {
            arr[k] = right[j];
            j += 1;
        }
        k += 1;
    }
    while i < left_len {
        arr[k] = left[i];
        i += 1;
        k += 1;
    }
    while j < right_len {
        arr[k] = right[j];
        j += 1;
        k += 1;
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    merge_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
