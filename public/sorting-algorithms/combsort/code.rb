def comb_sort(arr)
    shrink_factor = 1.3
    gap = arr.size
    sorted = false
  
    until sorted
      gap = (gap / shrink_factor).floor
      gap = 1 if gap < 1
  
      sorted = true
      (0...(arr.size - gap)).each do |i|
        if arr[i] > arr[i + gap]
          arr[i], arr[i + gap] = arr[i + gap], arr[i]
          sorted = false
        end
      end
    end
  end
  
  arr = [64, 25, 12, 22, 11]
  puts "Original array: #{arr}"
  comb_sort(arr)
  puts "Sorted array: #{arr}"
  