function get_max(arr)
    local max = arr[1]
    for i = 2, #arr do
        if arr[i] > max then
            max = arr[i]
        end
    end
    return max
end

function counting_sort(arr, exp)
    local output = {}
    for i = 1, #arr do
        output[i] = 0
    end
    local count = {}
    for i = 0, 9 do
        count[i] = 0
    end

    for _, num in ipairs(arr) do
        count[math.floor(num / exp) % 10] = count[math.floor(num / exp) % 10] + 1
    end

    for i = 1, 10 do
        count[i] = count[i] + count[i - 1]
    end

    for i = #arr, 1, -1 do
        output[count[math.floor(arr[i] / exp) % 10]] = arr[i]
        count[math.floor(arr[i] / exp) % 10] = count[math.floor(arr[i] / exp) % 10] - 1
    end

    for i = 1, #arr do
        arr[i] = output[i]
    end
end

function radix_sort(arr)
    local max = get_max(arr)
    for exp = 1, max, exp * 10 do
        counting_sort(arr, exp)
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
radix_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
