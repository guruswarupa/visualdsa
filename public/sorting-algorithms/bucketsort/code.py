def bucket_sort(arr):
    if len(arr) == 0:
        return arr

    # Determine minimum and maximum values
    min_value = min(arr)
    max_value = max(arr)

    # Initialize buckets
    bucket_count = len(arr)
    buckets = [[] for _ in range(bucket_count)]

    # Distribute input array values into buckets
    for num in arr:
        index = int((num - min_value) / (max_value - min_value + 1) * bucket_count)
        buckets[index].append(num)

    # Sort each bucket and concatenate the result
    sorted_array = []
    for bucket in buckets:
        sorted_array.extend(sorted(bucket))

    return sorted_array

# Example usage
if __name__ == "__main__":
    arr = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47, 0.51]
    print("Original array:", arr)
    sorted_arr = bucket_sort(arr)
    print("Sorted array:", sorted_arr)