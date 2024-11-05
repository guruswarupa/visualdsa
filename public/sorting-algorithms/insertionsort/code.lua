function insertion_sort(arr)
    local n = #arr
    for i = 2, n do
        local key = arr[i]
        local j = i - 1
        while j > 0 and arr[j] > key do
            arr[j + 1] = arr[j]
            j = j - 1
        end
        arr[j + 1] = key
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
insertion_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
