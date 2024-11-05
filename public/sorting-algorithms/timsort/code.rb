def insertion_sort(arr, left, right)
    (left + 1..right).each do |i|
        temp = arr[i]
        j = i - 1
        while j >= left && arr[j] > temp
            arr[j + 1] = arr[j]
            j -= 1
        end
        arr[j + 1] = temp
    end
end

def merge(arr, left, mid, right)
    len1 = mid - left + 1
    len2 = right - mid
    left_arr = arr[left, len1]
    right_arr = arr[mid + 1, len2]
    i = 0
    j = 0
    k = left
    while i < len1 && j < len2
        if left_arr[i] <= right_arr[j]
            arr[k] = left_arr[i]
            i += 1
        else
            arr[k] = right_arr[j]
            j += 1
        end
        k += 1
    end
    while i < len1
        arr[k] = left_arr[i]
        i += 1
        k += 1
    end
    while j < len2
        arr[k] = right_arr[j]
        j += 1
        k += 1
    end
end

def tim_sort(arr)
    n = arr.length
    min_run = 32
    (0...n).step(min_run) do |i|
        insertion_sort(arr, i, [i + min_run - 1, n - 1].min)
    end
    size = min_run
    while size < n
        (0...n).step(size * 2) do |left|
            mid = left + size - 1
            right = [left + 2 * size - 1, n - 1].min
            merge(arr, left, mid, right) if mid < right
        end
        size *= 2
    end
end

arr = [64, 25, 12, 22, 11]
puts "Original array: #{arr}"
tim_sort(arr)
puts "Sorted array: #{arr}"
