function comb_sort(arr)
    local shrink_factor = 1.3
    local gap = #arr
    local sorted = false

    while not sorted do
        gap = math.floor(gap / shrink_factor)
        if gap < 1 then gap = 1 end

        sorted = true
        for i = 1, #arr - gap do
            if arr[i] > arr[i + gap] then
                arr[i], arr[i + gap] = arr[i + gap], arr[i]
                sorted = false
            end
        end
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
comb_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
