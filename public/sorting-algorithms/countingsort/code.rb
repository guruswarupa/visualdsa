def counting_sort(arr)
    max = arr.max
    count = Array.new(max + 1, 0)
    output = Array.new(arr.size)

    arr.each do |num|
        count[num] += 1
    end

    (1..max).each do |i|
        count[i] += count[i - 1]
    end

    (arr.size - 1).downto(0) do |i|
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
    end

    output.each_with_index do |val, idx|
        arr[idx] = val
    end
end

arr = [4, 2, 2, 8, 3, 3, 1]
puts "Original array: #{arr}"
counting_sort(arr)
puts "Sorted array: #{arr}"
