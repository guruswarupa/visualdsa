function cycle_sort(arr)
    local n = #arr

    for cycle_start = 1, n - 1 do
        local item = arr[cycle_start]
        local pos = cycle_start

        for i = cycle_start + 1, n do
            if arr[i] < item then
                pos = pos + 1
            end
        end

        if pos == cycle_start then
            goto continue
        end

        while item == arr[pos] do
            pos = pos + 1
        end

        arr[pos], item = item, arr[pos]

        while pos ~= cycle_start do
            pos = cycle_start

            for i = cycle_start + 1, n do
                if arr[i] < item then
                    pos = pos + 1
                end
            end

            while item == arr[pos] do
                pos = pos + 1
            end

            arr[pos], item = item, arr[pos]
        end

        ::continue::
    end
end

arr = {64, 25, 12, 22, 11}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
cycle_sort(arr)
print("Sorted array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
