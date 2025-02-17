def merge_sort_3way(arr):
    if len(arr) < 2:
        return arr

    third_len = len(arr) // 3
    left = arr[:third_len]
    middle = arr[third_len:2 * third_len]
    right = arr[2 * third_len:]

    left = merge_sort_3way(left)
    middle = merge_sort_3way(middle)
    right = merge_sort_3way(right)

    return merge_3way(left, middle, right)

def merge_3way(left, middle, right):
    merged = []
    i = j = k = 0

    while i < len(left) and j < len(middle) and k < len(right):
        if left[i] < middle[j]:
            if left[i] < right[k]:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[k])
                k += 1
        else:
            if middle[j] < right[k]:
                merged.append(middle[j])
                j += 1
            else:
                merged.append(right[k])
                k += 1

    while i < len(left) and j < len(middle):
        if left[i] < middle[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(middle[j])
            j += 1

    while j < len(middle) and k < len(right):
        if middle[j] < right[k]:
            merged.append(middle[j])
            j += 1
        else:
            merged.append(right[k])
            k += 1

    while i < len(left) and k < len(right):
        if left[i] < right[k]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[k])
            k += 1

    merged.extend(left[i:])
    merged.extend(middle[j:])
    merged.extend(right[k:])

    return merged

# Example usage
arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
sorted_arr = merge_sort_3way(arr)
print(sorted_arr)