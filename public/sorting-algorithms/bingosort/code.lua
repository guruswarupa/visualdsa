function bingoSort(arr)
    if #arr == 0 then return end

    local maxValue = math.max(table.unpack(arr))
    local minValue = math.min(table.unpack(arr))
    local range = maxValue - minValue + 1
    local count = {}
    for i = 1, range do count[i] = 0 end

    for _, num in ipairs(arr) do
        count[num - minValue + 1] = count[num - minValue + 1] + 1
    end

    local index = 1
    for i = 1, #count do
        while count[i] > 0 do
            arr[index] = i + minValue - 1
            index = index + 1
            count[i] = count[i] - 1
        end
    end
end

local arr = {64, 25, 12, 22, 11, 12, 25, 64}
print("Original array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
bingoSort(arr)
print("Sorted array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
