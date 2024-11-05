function is_sorted(arr)
    for i = 2, #arr do
        if arr[i] < arr[i - 1] then
            return false
        end
    end
    return true
end

function shuffle(arr)
    for i = #arr, 2, -1 do
        local j = math.random(i)
        arr[i], arr[j] = arr[j], arr[i]
    end
end

function bogo_sort(arr)
    while not is_sorted(arr) do
        shuffle(arr)
    end
end

math.randomseed(os.time())
local arr = {64, 25, 12, 22, 11}
print("Original array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
bogo_sort(arr)
print("Sorted array: ")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
