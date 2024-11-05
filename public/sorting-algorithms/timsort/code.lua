function insertion_sort(arr, left, right)
    for i = left + 1, right do
        local temp = arr[i]
        local j = i - 1
        while j >= left and arr[j] > temp do
            arr[j + 1] = arr[j]
            j = j - 1
        end
        arr[j + 1] = temp
    end
end

function merge(arr, left, mid, right)
    local len1 = mid - left + 1
    local len2 = right - mid
    local left_arr = {}
    local right_arr = {}
    for i = 1, len1 do left_arr[i] = arr[left + i - 1] end
    for i = 1, len2 do right_arr[i] = arr[mid + i] end
    local i, j, k = 1, 1, left
    while i <= len1 and j <= len2 do
        if left_arr[i] <= right_arr[j] then
            arr[k] = left_arr[i]
            i = i + 1
        else
            arr[k] = right_arr[j]
            j = j + 1
        end
        k = k + 1
    end
    while i <= len1 do
        arr[k] = left_arr[i]
        i = i + 1
        k = k + 1
    end
    while j <= len2 do
        arr[k] = right_arr[j]
        j = j + 1
        k = k + 1
    end
end

function tim_sort(arr)
    local n = #arr
    local min_run = 32
    for i = 1, n, min_run do
        insertion_sort(arr, i, math.min(i + min_run - 1, n))
    end
    local size = min_run
    while size < n do
        for left = 1, n, size * 2 do
            local mid = left + size - 1
            local right = math.min(left + 2 * size - 1, n)
            if mid < right then
                merge(arr, left, mid, right)
            end
        end
        size = size * 2
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do io.write(v .. " ") end
print()
tim_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do io.write(v .. " ") end
print()
