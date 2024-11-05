fn quick_sort(arr: &mut Vec<i32>) {
    if arr.len() <= 1 {
        return;
    }
    let pivot = arr.len() - 1;
    let mut left = vec![];
    let mut right = vec![];
    for i in 0..pivot {
        if arr[i] < arr[pivot] {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    quick_sort(&mut left);
    quick_sort(&mut right);
    arr.clear();
    arr.extend(left);
    arr.push(arr[pivot]);
    arr.extend(right);
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    quick_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
