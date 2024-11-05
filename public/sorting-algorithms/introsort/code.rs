fn introsort(arr: &mut Vec<i32>) {
    let max_depth = (arr.len() as f64).log(2.0).floor() as usize * 2;
    introsort_util(arr, 0, arr.len() - 1, max_depth);
}

fn introsort_util(arr: &mut Vec<i32>, start: usize, end: usize, max_depth: usize) {
    let size = end - start + 1;
    if size < 16 {
        insertion_sort(arr, start, end);
        return;
    }

    if max_depth == 0 {
        heapsort(arr, start, end);
        return;
    }

    let pivot_index = partition(arr, start, end);
    introsort_util(arr, start, pivot_index.wrapping_sub(1), max_depth - 1);
    introsort_util(arr, pivot_index + 1, end, max_depth - 1);
}

fn partition(arr: &mut Vec<i32>, start: usize, end: usize) -> usize {
    let pivot = arr[end];
    let mut i = start as isize - 1;
    for j in start..end {
        if arr[j] < pivot {
            i += 1;
            arr.swap(i as usize, j);
        }
    }
    arr.swap((i + 1) as usize, end);
    (i + 1) as usize
}

fn insertion_sort(arr: &mut Vec<i32>, start: usize, end: usize) {
    for i in start + 1..=end {
        let key = arr[i];
        let mut j = i as isize - 1;
        while j >= start as isize && arr[j as usize] > key {
            arr[j as usize + 1] = arr[j as usize];
            j -= 1;
        }
        arr[(j + 1) as usize] = key;
    }
}

fn heapsort(arr: &mut Vec<i32>, start: usize, end: usize) {
    let n = end - start + 1;
    for i in (0..n / 2).rev() {
        heapify(arr, n, i, start);
    }
    for i in (1..n).rev() {
        arr.swap(start, start + i);
        heapify(arr, i, 0, start);
    }
}

fn heapify(arr: &mut Vec<i32>, n: usize, i: usize, start: usize) {
    let mut largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if left < n && arr[start + left] > arr[start + largest] {
        largest = left;
    }
    if right < n && arr[start + right] > arr[start + largest] {
        largest = right;
    }
    if largest != i {
        arr.swap(start + i, start + largest);
        heapify(arr, n, largest, start);
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    introsort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
