def introsort(arr)
    max_depth = Math.log(arr.size, 2).to_i * 2
    introsort_util(arr, 0, arr.size - 1, max_depth)
end

def introsort_util(arr, start, end_index, max_depth)
    size = end_index - start + 1
    if size < 16
        insertion_sort(arr, start, end_index)
        return
    end

    if max_depth == 0
        heapsort(arr, start, end_index)
        return
    end

    pivot_index = partition(arr, start, end_index)
    introsort_util(arr, start, pivot_index - 1, max_depth - 1)
    introsort_util(arr, pivot_index + 1, end_index, max_depth - 1)
end

def partition(arr, start, end_index)
    pivot = arr[end_index]
    i = start - 1
    (start...end_index).each do |j|
        if arr[j] < pivot
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
        end
    end
    arr[i + 1], arr[end_index] = arr[end_index], arr[i + 1]
    i + 1
end

def insertion_sort(arr, start, end_index)
    (start + 1..end_index).each do |i|
        key = arr[i]
        j = i - 1
        while j >= start && arr[j] > key
            arr[j + 1] = arr[j]
            j -= 1
        end
        arr[j + 1] = key
    end
end

def heapsort(arr, start, end_index)
    n = end_index - start + 1
    (n / 2 - 1).downto(0) do |i|
        heapify(arr, n, i, start)
    end
    (n - 1).downto(1) do |i|
        arr[start], arr[start + i] = arr[start + i], arr[start]
        heapify(arr, i, 0, start)
    end
end

def heapify(arr, n, i, start)
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    largest = left if left < n && arr[start + left] > arr[start + largest]
    largest = right if right < n && arr[start + right] > arr[start + largest]

    if largest != i
        arr[start + i], arr[start + largest] = arr[start + largest], arr[start + i]
        heapify(arr, n, largest, start)
    end
end

arr = [64, 25, 12, 22, 11]
puts "Original array: #{arr}"
introsort(arr)
puts "Sorted array: #{arr}"
