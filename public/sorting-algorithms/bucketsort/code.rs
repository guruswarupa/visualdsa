use std::collections::HashMap;

fn bucket_sort(arr: &mut Vec<f64>) {
    let mut buckets: Vec<Vec<f64>> = vec![vec![]; 10];

    for &num in arr.iter() {
        let bucket_index = (num * 10.0) as usize;
        buckets[bucket_index].push(num);
    }

    for bucket in buckets.iter_mut() {
        bucket.sort_by(|a, b| a.partial_cmp(b).unwrap());
    }

    arr.clear();
    for bucket in buckets {
        arr.extend(bucket);
    }
}

fn main() {
    let mut arr = vec![0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.18, 0.23, 0.45, 0.91];
    println!("Original array: {:?}", arr);
    bucket_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
