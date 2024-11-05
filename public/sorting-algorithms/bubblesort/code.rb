def bubble_sort(arr)
    n = arr.size
    (0...n - 1).each do |i|
      (0...n - i - 1).each do |j|
        if arr[j] > arr[j + 1]
          arr[j], arr[j + 1] = arr[j + 1], arr[j]
        end
      end
    end
  end
  
  arr = [64, 25, 12, 22, 11]
  puts "Original array: #{arr}"
  bubble_sort(arr)
  puts "Sorted array: #{arr}"
  