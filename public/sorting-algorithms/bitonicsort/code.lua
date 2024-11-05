function bitonic_sort(arr, low, cnt, dir)
    if cnt <= 1 then return end
    local k = math.floor(cnt / 2)
    bitonic_sort(arr, low, k, 1)
    bitonic_sort(arr, low + k, k, 0)
    merge(arr, low, cnt, dir)
end

function merge(arr, low, cnt, dir)
    local k = math.floor(cnt / 2)
    for i = low, low + k - 1 do
        if dir == (arr[i] > arr[i + k] and 1 or 0) then
            arr[i], arr[i + k] = arr[i + k], arr[i]
        end
    end
    if k > 1 then
        merge(arr, low, k, dir)
        merge(arr, low + k, k, dir)
    end
end

function sort(arr)
    bitonic_sort(arr, 1, #arr, 1)
end

local arr = {64, 25, 12, 22, 11}
print("Original array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
sort(arr)
print("Sorted array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
