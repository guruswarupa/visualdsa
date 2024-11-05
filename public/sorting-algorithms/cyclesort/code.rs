fn cycle_sort(arr: &mut Vec<i32>) {
    let n = arr.len();

    for cycle_start in 0..n - 1 {
        let item = arr[cycle_start];
        let mut pos = cycle_start;

        for i in cycle_start + 1..n {
            if arr[i] < item {
                pos += 1;
            }
        }

        if pos == cycle_start {
            continue;
        }

        while item == arr[pos] {
            pos += 1;
        }

        arr.swap(pos, cycle_start);

        while pos != cycle_start {
            pos = cycle_start;

            for i in cycle_start + 1..n {
                if arr[i] < item {
                    pos += 1;
                }
            }

            while item == arr[pos] {
                pos += 1;
            }

            arr.swap(pos, cycle_start);
        }
    }
}

fn main() {
    let mut arr = vec![64, 25, 12, 22, 11];
    println!("Original array: {:?}", arr);
    cycle_sort(&mut arr);
    println!("Sorted array: {:?}", arr);
}
