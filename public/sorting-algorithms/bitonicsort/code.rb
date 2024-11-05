def bitonic_sort(arr, low, cnt, dir)
    return if cnt <= 1
    k = cnt / 2
    bitonic_sort(arr, low, k, 1)
    bitonic_sort(arr, low + k, k, 0)
    merge(arr, low, cnt, dir)
  end
  
  def merge(arr, low, cnt, dir)
    k = cnt / 2
    (0...k).each do |i|
      if dir == (arr[low + i] > arr[low + i + k] ? 1 : 0)
        arr[low + i], arr[low + i + k] = arr[low + i + k], arr[low + i]
      end
    end
    merge(arr, low, k, dir) if k > 1
    merge(arr, low + k, k, dir) if k > 1
  end
  
  def sort(arr)
    bitonic_sort(arr, 0, arr.size, 1)
  end
  
  arr = [64, 25, 12, 22, 11]
  puts "Original array: #{arr}"
  sort(arr)
  puts "Sorted array: #{arr}"
  