fn merge_sort_3way(arr: &mut [i32]) -> Vec<i32> {
    if arr.len() <= 1 {
        return arr.to_vec();
    }

    let third = arr.len() / 3;
    let left = merge_sort_3way(&mut arr[..third].to_vec());
    let middle = merge_sort_3way(&mut arr[third..2 * third].to_vec());
    let right = merge_sort_3way(&mut arr[2 * third..].to_vec());

    merge_3way(&left, &middle, &right)
}

fn merge_3way(left: &[i32], middle: &[i32], right: &[i32]) -> Vec<i32> {
    let mut result = Vec::with_capacity(left.len() + middle.len() + right.len());
    let (mut i, mut j, mut k) = (0, 0, 0);

    while i < left.len() || j < middle.len() || k < right.len() {
        let left_val = if i < left.len() { left[i] } else { i32::MAX };
        let middle_val = if j < middle.len() { middle[j] } else { i32::MAX };
        let right_val = if k < right.len() { right[k] } else { i32::MAX };

        if left_val <= middle_val && left_val <= right_val {
            result.push(left[i]);
            i += 1;
        } else if middle_val <= left_val && middle_val <= right_val {
            result.push(middle[j]);
            j += 1;
        } else {
            result.push(right[k]);
            k += 1;
        }
    }

    result
}

fn main() {
    let mut array = vec![64, 25, 12, 22, 11];
    let sorted_array = merge_sort_3way(&mut array);
    println!("Sorted array: {:?}", sorted_array);
}
