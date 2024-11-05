function shell_sort(arr)
    local n = #arr
    local gap = math.floor(n / 2)
    while gap > 0 do
        for i = gap, n do
            local temp = arr[i]
            local j = i
            while j >= gap and arr[j - gap] > temp do
                arr[j] = arr[j - gap]
                j = j - gap
            end
            arr[j] = temp
        end
        gap = math.floor(gap / 2)
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
shell_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
