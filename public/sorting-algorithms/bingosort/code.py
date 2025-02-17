def bingo_sort(arr):
    n = len(arr)
    while True:
        max_val = max(arr)
        next_max = max(val for val in arr if val != max_val)
        for i in range(n):
            if arr[i] == max_val:
                arr[i] = next_max
        if max_val == next_max:
            break
    return arr

# Example usage
arr = [5, 3, 2, 6, 4, 1]
sorted_arr = bingo_sort(arr)
print(sorted_arr)