fn comb_sort(arr: &mut Vec<i32>) {
    let shrink_factor = 1.3;
    let mut gap = arr.len();
    let mut sorted = false;

    while !sorted {
        gap = (gap as f64 / shrink_factor).floor() as usize;
        if gap < 1 {
            gap = 1;
        }

        sorted = true;
        for i in 0..arr.len() - gap {
            if arr[i] > arr[i + gap] {
                arr.swap(i, i + gap);
                sorted = false;
            }
        }
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    comb_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
