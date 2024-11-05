def bingo_sort(arr)
    return if arr.empty?
  
    max_value = arr.max
    min_value = arr.min
    range = max_value - min_value + 1
    count = Array.new(range, 0)
  
    arr.each { |num| count[num - min_value] += 1 }
  
    index = 0
    count.each_with_index do |c, i|
      c.times { arr[index] = i + min_value; index += 1 }
    end
  end
  
  arr = [64, 25, 12, 22, 11, 12, 25, 64]
  puts "Original array: #{arr}"
  bingo_sort(arr)
  puts "Sorted array: #{arr}"
  