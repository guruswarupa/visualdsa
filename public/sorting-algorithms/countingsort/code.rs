fn counting_sort(arr: &mut Vec<i32>) {
    let max = *arr.iter().max().unwrap();
    let mut count = vec![0; (max + 1) as usize];
    let mut output = vec![0; arr.len()];

    for &num in arr.iter() {
        count[num as usize] += 1;
    }

    for i in 1..=max {
        count[i as usize] += count[(i - 1) as usize];
    }

    for i in (0..arr.len()).rev() {
        output[count[arr[i] as usize] as usize - 1] = arr[i];
        count[arr[i] as usize] -= 1;
    }

    arr.copy_from_slice(&output);
}

fn main() {
    let mut arr = vec![4, 2, 2, 8, 3, 3, 1];
    println!("Original array: {:?}", arr);
    counting_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
