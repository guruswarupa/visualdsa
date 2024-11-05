function quick_sort(arr)
    if #arr <= 1 then
        return arr
    end
    local pivot = arr[#arr]
    local left = {}
    local right = {}
    for i = 1, #arr - 1 do
        if arr[i] < pivot then
            table.insert(left, arr[i])
        else
            table.insert(right, arr[i])
        end
    end
    return concatenate(quick_sort(left), {pivot}, quick_sort(right))
end

function concatenate(t1, t2, t3)
    local result = {}
    for _, v in ipairs(t1) do table.insert(result, v) end
    for _, v in ipairs(t2) do table.insert(result, v) end
    for _, v in ipairs(t3) do table.insert(result, v) end
    return result
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
sorted_arr = quick_sort(arr)
print("Sorted array:")
for _, v in ipairs(sorted_arr) do
    io.write(v .. " ")
end
print()
