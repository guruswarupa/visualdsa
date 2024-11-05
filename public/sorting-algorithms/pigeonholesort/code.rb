def pigeonhole_sort(arr)
    min = arr.min
    max = arr.max
    size = max - min + 1
    holes = Array.new(size, 0)

    arr.each do |num|
        holes[num - min] += 1
    end

    index = 0
    holes.each_with_index do |count, i|
        count.times do
            arr[index] = i + min
            index += 1
        end
    end
end

arr = [64, 25, 12, 22, 11]
puts "Original array: #{arr}"
pigeonhole_sort(arr)
puts "Sorted array: #{arr}"
