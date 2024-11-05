def cycle_sort(arr)
    n = arr.size
  
    (0...(n - 1)).each do |cycle_start|
      item = arr[cycle_start]
      pos = cycle_start
  
      (cycle_start + 1...n).each do |i|
        pos += 1 if arr[i] < item
      end
  
      next if pos == cycle_start
  
      while item == arr[pos]
        pos += 1
      end
  
      arr[pos], item = item, arr[pos]
  
      while pos != cycle_start
        pos = cycle_start
  
        (cycle_start + 1...n).each do |i|
          pos += 1 if arr[i] < item
        end
  
        while item == arr[pos]
          pos += 1
        end
  
        arr[pos], item = item, arr[pos]
      end
    end
  end
  
  arr = [64, 25, 12, 22, 11]
  puts "Original array: #{arr}"
  cycle_sort(arr)
  puts "Sorted array: #{arr}"
  