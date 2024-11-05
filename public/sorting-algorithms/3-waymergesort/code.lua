function mergeSort3Way(arr)
    if #arr <= 1 then return arr end

    local third = math.floor(#arr / 3)
    local left = mergeSort3Way({table.unpack(arr, 1, third)})
    local middle = mergeSort3Way({table.unpack(arr, third + 1, 2 * third)})
    local right = mergeSort3Way({table.unpack(arr, 2 * third + 1)})

    return merge3Way(left, middle, right)
end

function merge3Way(left, middle, right)
    local result = {}
    local i, j, k = 1, 1, 1

    while i <= #left or j <= #middle or k <= #right do
        local leftVal = i <= #left and left[i] or math.huge
        local middleVal = j <= #middle and middle[j] or math.huge
        local rightVal = k <= #right and right[k] or math.huge

        if leftVal <= middleVal and leftVal <= rightVal then
            table.insert(result, left[i])
            i = i + 1
        elseif middleVal <= leftVal and middleVal <= rightVal then
            table.insert(result, middle[j])
            j = j + 1
        else
            table.insert(result, right[k])
            k = k + 1
        end
    end

    return result
end

local array = {64, 25, 12, 22, 11}
local sortedArray = mergeSort3Way(array)
print("Sorted array:")
for _, value in ipairs(sortedArray) do
    print(value)
end
