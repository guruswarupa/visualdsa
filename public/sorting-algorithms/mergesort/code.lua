function merge_sort(arr)
    if #arr <= 1 then
        return arr
    end
    local mid = math.floor(#arr / 2)
    local left = merge_sort({table.unpack(arr, 1, mid)})
    local right = merge_sort({table.unpack(arr, mid + 1)})
    return merge(left, right)
end

function merge(left, right)
    local result = {}
    local i, j = 1, 1
    while i <= #left and j <= #right do
        if left[i] < right[j] then
            table.insert(result, left[i])
            i = i + 1
        else
            table.insert(result, right[j])
            j = j + 1
        end
    end
    for k = i, #left do
        table.insert(result, left[k])
    end
    for k = j, #right do
        table.insert(result, right[k])
    end
    return result
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
sorted_arr = merge_sort(arr)
print("Sorted array:")
for _, v in ipairs(sorted_arr) do
    io.write(v .. " ")
end
print()
