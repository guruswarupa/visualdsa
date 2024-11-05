def selection_sort(arr)
    n = arr.length
  
    (0...n - 1).each do |i|
      min_index = i
      ((i + 1)...n).each do |j|
        min_index = j if arr[j] < arr[min_index]
      end
  
      arr[i], arr[min_index] = arr[min_index], arr[i] if min_index != i
    end
  
    arr
  end
  
  array = [64, 25, 12, 22, 11]
  sorted_array = selection_sort(array)
  puts "Sorted array: #{sorted_array}"
  