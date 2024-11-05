function heap_sort(arr)
    local n = #arr

    for i = math.floor(n / 2) - 1, 0, -1 do
        heapify(arr, n, i)
    end

    for i = n - 1, 1, -1 do
        arr[1], arr[i + 1] = arr[i + 1], arr[1]
        heapify(arr, i + 1, 1)
    end
end

function heapify(arr, n, i)
    local largest = i
    local left = 2 * i
    local right = 2 * i + 1

    if left <= n and arr[left] > arr[largest] then
        largest = left
    end

    if right <= n and arr[right] > arr[largest] then
        largest = right
    end

    if largest ~= i then
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
heap_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
