function selectionSort(arr)
    local n = #arr

    for i = 1, n - 1 do
        local minIndex = i
        for j = i + 1, n do
            if arr[j] < arr[minIndex] then
                minIndex = j
            end
        end

        if minIndex ~= i then
            arr[i], arr[minIndex] = arr[minIndex], arr[i]
        end
    end

    return arr
end

local array = {64, 25, 12, 22, 11}
local sortedArray = selectionSort(array)
print("Sorted array:")
for _, value in ipairs(sortedArray) do
    print(value)
end
