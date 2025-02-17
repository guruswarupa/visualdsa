def bitonic_sort(arr):
    def compare_and_swap(arr, i, j, direction):
        if (direction == 1 and arr[i] > arr[j]) or (direction == 0 and arr[i] < arr[j]):
            arr[i], arr[j] = arr[j], arr[i]

    def bitonic_merge(arr, low, cnt, direction):
        if cnt > 1:
            k = cnt // 2
            for i in range(low, low + k):
                compare_and_swap(arr, i, i + k, direction)
            bitonic_merge(arr, low, k, direction)
            bitonic_merge(arr, low + k, k, direction)

    def bitonic_sort_recursive(arr, low, cnt, direction):
        if cnt > 1:
            k = cnt // 2
            bitonic_sort_recursive(arr, low, k, 1)  # Sort in ascending order
            bitonic_sort_recursive(arr, low + k, k, 0)  # Sort in descending order
            bitonic_merge(arr, low, cnt, direction)

    n = len(arr)
    bitonic_sort_recursive(arr, 0, n, 1)
    return arr

# Example usage
arr = [3, 7, 4, 8, 6, 2, 1, 5]
sorted_arr = bitonic_sort(arr)
print("Sorted array:", sorted_arr)