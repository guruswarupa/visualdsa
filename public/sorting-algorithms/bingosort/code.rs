fn bingo_sort(arr: &mut Vec<i32>) {
    if arr.is_empty() { return; }

    let max_value = *arr.iter().max().unwrap();
    let min_value = *arr.iter().min().unwrap();
    let range = (max_value - min_value + 1) as usize;
    let mut count = vec![0; range];

    for &num in arr.iter() {
        count[(num - min_value) as usize] += 1;
    }

    let mut index = 0;
    for (i, &c) in count.iter().enumerate() {
        for _ in 0..c {
            arr[index] = (i as i32 + min_value);
            index += 1;
        }
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11, 12, 25, 64];
    println!("Original array: {:?}", arr);
    bingo_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
