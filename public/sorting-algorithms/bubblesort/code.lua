function bubble_sort(arr)
    local n = #arr
    for i = 1, n - 1 do
        for j = 1, n - i do
            if arr[j] > arr[j + 1] then
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            end
        end
    end
end

local arr = {64, 25, 12, 22, 11}
print("Original array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
bubble_sort(arr)
print("Sorted array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
