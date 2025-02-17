def pigeonhole_sort(arr):
    min_val = min(arr)
    max_val = max(arr)
    size = max_val - min_val + 1

    holes = [0] * size

    for x in arr:
        holes[x - min_val] += 1

    sorted_arr = []
    for count in range(size):
        while holes[count] > 0:
            sorted_arr.append(count + min_val)
            holes[count] -= 1

    return sorted_arr

# Example usage
arr = [8, 3, 2, 7, 4, 6, 8]
sorted_arr = pigeonhole_sort(arr)
print("Sorted array:", sorted_arr)