import math

def introsort(arr):
    max_depth = 2 * math.log2(len(arr))
    _introsort(arr, 0, len(arr) - 1, max_depth)

def _introsort(arr, start, end, max_depth):
    if start < end:
        if max_depth == 0:
            heapsort(arr, start, end)
        else:
            pivot = partition(arr, start, end)
            _introsort(arr, start, pivot - 1, max_depth - 1)
            _introsort(arr, pivot + 1, end, max_depth - 1)

def partition(arr, start, end):
    pivot = arr[end]
    i = start - 1
    for j in range(start, end):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[end] = arr[end], arr[i + 1]
    return i + 1

def heapsort(arr, start, end):
    build_max_heap(arr, start, end)
    for i in range(end, start, -1):
        arr[start], arr[i] = arr[i], arr[start]
        max_heapify(arr, index=start, end=i - 1)

def build_max_heap(arr, start, end):
    length = end - start + 1
    for i in range(start + length // 2 - 1, start - 1, -1):
        max_heapify(arr, i, end)

def max_heapify(arr, index, end):
    largest = index
    left = 2 * index + 1
    right = 2 * index + 2
    if left <= end and arr[left] > arr[largest]:
        largest = left
    if right <= end and arr[right] > arr[largest]:
        largest = right
    if largest != index:
        arr[index], arr[largest] = arr[largest], arr[index]
        max_heapify(arr, largest, end)

# Example usage
if __name__ == "__main__":
    arr = [3, 6, 8, 10, 1, 2, 1]
    introsort(arr)
    print("Sorted array:", arr)