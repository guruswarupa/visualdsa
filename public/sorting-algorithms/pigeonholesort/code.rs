fn pigeonhole_sort(arr: &mut Vec<i32>) {
    let min = *arr.iter().min().unwrap();
    let max = *arr.iter().max().unwrap();
    let size = (max - min + 1) as usize;
    let mut holes = vec![0; size];

    for &num in arr.iter() {
        holes[(num - min) as usize] += 1;
    }

    let mut index = 0;
    for i in 0..size {
        while holes[i] > 0 {
            arr[index] = (i as i32) + min;
            index += 1;
            holes[i] -= 1;
        }
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    pigeonhole_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
