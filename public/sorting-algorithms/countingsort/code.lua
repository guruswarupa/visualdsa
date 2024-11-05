function counting_sort(arr)
    local max = math.max(table.unpack(arr))
    local count = {}
    local output = {}

    for i = 0, max do
        count[i] = 0
    end

    for _, num in ipairs(arr) do
        count[num] = count[num] + 1
    end

    for i = 1, max do
        count[i] = count[i] + count[i - 1]
    end

    for i = #arr, 1, -1 do
        output[count[arr[i]] + 1] = arr[i]
        count[arr[i]] = count[arr[i]] - 1
    end

    for i = 1, #arr do
        arr[i] = output[i]
    end
end

arr = {4, 2, 2, 8, 3, 3, 1}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
counting_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
