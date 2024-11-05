fn get_max(arr: &Vec<i32>) -> i32 {
    *arr.iter().max().unwrap()
}

fn counting_sort(arr: &mut Vec<i32>, exp: i32) {
    let mut output = vec![0; arr.len()];
    let mut count = vec![0; 10];

    for &num in arr.iter() {
        count[(num / exp % 10) as usize] += 1;
    }

    for i in 1..10 {
        count[i] += count[i - 1];
    }

    for i in (0..arr.len()).rev() {
        output[count[(arr[i] / exp % 10) as usize] as usize - 1] = arr[i];
        count[(arr[i] / exp % 10) as usize] -= 1;
    }

    arr.copy_from_slice(&output);
}

fn radix_sort(arr: &mut Vec<i32>) {
    let max = get_max(arr);
    let mut exp = 1;
    while max / exp > 0 {
        counting_sort(arr, exp);
        exp *= 10;
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    radix_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
