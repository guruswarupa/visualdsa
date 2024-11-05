def merge_sort_3way(arr)
    return arr if arr.length <= 1
  
    third = arr.length / 3
    left = merge_sort_3way(arr[0...third])
    middle = merge_sort_3way(arr[third...(2 * third)])
    right = merge_sort_3way(arr[(2 * third)...arr.length])
  
    merge_3way(left, middle, right)
  end
  
  def merge_3way(left, middle, right)
    result = []
    i, j, k = 0, 0, 0
  
    while i < left.length || j < middle.length || k < right.length
      left_val = i < left.length ? left[i] : Float::INFINITY
      middle_val = j < middle.length ? middle[j] : Float::INFINITY
      right_val = k < right.length ? right[k] : Float::INFINITY
  
      if left_val <= middle_val && left_val <= right_val
        result << left[i]
        i += 1
      elsif middle_val <= left_val && middle_val <= right_val
        result << middle[j]
        j += 1
      else
        result << right[k]
        k += 1
      end
    end
  
    result
  end
  
  array = [64, 25, 12, 22, 11]
  sorted_array = merge_sort_3way(array)
  puts "Sorted array: #{sorted_array}"
  