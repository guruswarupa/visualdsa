fn insertion_sort(arr: &mut Vec<i32>, left: usize, right: usize) {
    for i in left + 1..=right {
        let temp = arr[i];
        let mut j = i;
        while j > left && arr[j - 1] > temp {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = temp;
    }
}

fn merge(arr: &mut Vec<i32>, left: usize, mid: usize, right: usize) {
    let len1 = mid - left + 1;
    let len2 = right - mid;
    let left_arr: Vec<i32> = arr[left..=mid].to_vec();
    let right_arr: Vec<i32> = arr[mid + 1..=right].to_vec();
    let (mut i, mut j, mut k) = (0, 0, left);
    while i < len1 && j < len2 {
        if left_arr[i] <= right_arr[j] {
            arr[k] = left_arr[i];
            i += 1;
        } else {
            arr[k] = right_arr[j];
            j += 1;
        }
        k += 1;
    }
    while i < len1 {
        arr[k] = left_arr[i];
        i += 1;
        k += 1;
    }
    while j < len2 {
        arr[k] = right_arr[j];
        j += 1;
        k += 1;
    }
}

fn tim_sort(arr: &mut Vec<i32>) {
    let n = arr.len();
    let min_run = 32;
    for i in (0..n).step_by(min_run) {
        insertion_sort(arr, i, usize::min(i + min_run - 1, n - 1));
    }
    let mut size = min_run;
    while size < n {
        for left in (0..n).step_by(size * 2) {
            let mid = left + size - 1;
            let right = usize::min(left + 2 * size - 1, n - 1);
            if mid < right {
                merge(arr, left, mid, right);
            }
        }
        size *= 2;
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    tim_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
