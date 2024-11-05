function introsort(arr)
    local max_depth = math.floor(math.log(#arr) / math.log(2)) * 2
    introsort_util(arr, 1, #arr, max_depth)
end

function introsort_util(arr, start, end_index, max_depth)
    local size = end_index - start + 1
    if size < 16 then
        insertion_sort(arr, start, end_index)
        return
    end

    if max_depth == 0 then
        heapsort(arr, start, end_index)
        return
    end

    local pivot_index = partition(arr, start, end_index)
    introsort_util(arr, start, pivot_index - 1, max_depth - 1)
    introsort_util(arr, pivot_index + 1, end_index, max_depth - 1)
end

function partition(arr, start, end_index)
    local pivot = arr[end_index]
    local i = start - 1
    for j = start, end_index - 1 do
        if arr[j] < pivot then
            i = i + 1
            arr[i], arr[j] = arr[j], arr[i]
        end
    end
    arr[i + 1], arr[end_index] = arr[end_index], arr[i + 1]
    return i + 1
end

function insertion_sort(arr, start, end_index)
    for i = start + 1, end_index do
        local key = arr[i]
        local j = i - 1
        while j >= start and arr[j] > key do
            arr[j + 1] = arr[j]
            j = j - 1
        end
        arr[j + 1] = key
    end
end

function heapsort(arr, start, end_index)
    local n = end_index - start + 1
    for i = math.floor(n / 2), 1, -1 do
        heapify(arr, n, i, start)
    end
    for i = n, 2, -1 do
        arr[start], arr[start + i - 1] = arr[start + i - 1], arr[start]
        heapify(arr, i - 1, 1, start)
    end
end

function heapify(arr, n, i, start)
    local largest = i
    local left = 2 * i
    local right = 2 * i + 1

    if left <= n and arr[start + left - 1] > arr[start + largest - 1] then
        largest = left
    end
    if right <= n and arr[start + right - 1] > arr[start + largest - 1] then
        largest = right
    end
    if largest ~= i then
        arr[start + i - 1], arr[start + largest - 1] = arr[start + largest - 1], arr[start + i - 1]
        heapify(arr, n, largest, start)
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for i, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
introsort(arr)
print("Sorted array:")
for i, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
