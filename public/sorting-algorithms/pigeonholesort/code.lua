function pigeonhole_sort(arr)
    local min = math.min(table.unpack(arr))
    local max = math.max(table.unpack(arr))
    local size = max - min + 1
    local holes = {}
    for i = 1, size do
        holes[i] = 0
    end

    for _, num in ipairs(arr) do
        holes[num - min + 1] = holes[num - min + 1] + 1
    end

    local index = 1
    for i = 1, size do
        while holes[i] > 0 do
            arr[index] = i + min - 1
            index = index + 1
            holes[i] = holes[i] - 1
        end
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
pigeonhole_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
