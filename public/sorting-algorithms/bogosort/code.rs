use rand::seq::SliceRandom;
use rand::thread_rng;

fn is_sorted(arr: &[i32]) -> bool {
    for i in 1..arr.len() {
        if arr[i] < arr[i - 1] {
            return false;
        }
    }
    true
}

fn bogo_sort(arr: &mut Vec<i32>) {
    let mut rng = thread_rng();
    while !is_sorted(arr) {
        arr.shuffle(&mut rng);
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    bogo_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
