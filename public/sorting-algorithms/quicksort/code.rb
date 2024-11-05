def quick_sort(arr)
    return arr if arr.length <= 1
    pivot = arr.last
    left = arr[0...-1].select { |x| x < pivot }
    right = arr[0...-1].select { |x| x >= pivot }
    quick_sort(left) + [pivot] + quick_sort(right)
end

arr = [64, 25, 12, 22, 11]
puts "Original array: #{arr}"
sorted_arr = quick_sort(arr)
puts "Sorted array: #{sorted_arr}"
