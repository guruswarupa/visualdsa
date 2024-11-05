def get_max(arr)
    arr.max
end

def counting_sort(arr, exp)
    output = Array.new(arr.length)
    count = Array.new(10, 0)

    arr.each do |num|
        count[(num / exp) % 10] += 1
    end

    (1...10).each do |i|
        count[i] += count[i - 1]
    end

    (arr.length - 1).downto(0) do |i|
        output[count[(arr[i] / exp) % 10] - 1] = arr[i]
        count[(arr[i] / exp) % 10] -= 1
    end

    arr.replace(output)
end

def radix_sort(arr)
    max = get_max(arr)
    exp = 1
    while max / exp > 0
        counting_sort(arr, exp)
        exp *= 10
    end
end

arr = [64, 25, 12, 22, 11]
puts "Original array: #{arr}"
radix_sort(arr)
puts "Sorted array: #{arr}"
