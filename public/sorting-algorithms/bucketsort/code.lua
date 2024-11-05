function bucket_sort(arr)
    local buckets = {}
    local num_buckets = 10

    for i = 1, num_buckets do
        buckets[i] = {}
    end

    for _, num in ipairs(arr) do
        local bucket_index = math.floor(num * num_buckets) + 1
        table.insert(buckets[bucket_index], num)
    end

    for i = 1, num_buckets do
        table.sort(buckets[i])
    end

    local sorted_array = {}
    for i = 1, num_buckets do
        for _, num in ipairs(buckets[i]) do
            table.insert(sorted_array, num)
        end
    end

    return sorted_array
end

arr = {0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.18, 0.23, 0.45, 0.91}
print("Original array:")
for _, v in ipairs(arr) do
    io.write(v .. " ")
end
print()

local sorted_arr = bucket_sort(arr)
print("Sorted array:")
for _, v in ipairs(sorted_arr) do
    io.write(v .. " ")
end
print()
