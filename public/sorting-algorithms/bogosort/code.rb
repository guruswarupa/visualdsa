def sorted?(arr)
    (1...arr.size).all? { |i| arr[i] >= arr[i - 1] }
  end
  
  def shuffle(arr)
    arr.shuffle!
  end
  
  def bogo_sort(arr)
    bogo_sort(arr) until sorted?(arr)
  end
  
  arr = [64, 25, 12, 22, 11]
  puts "Original array: #{arr}"
  bogo_sort(arr)
  puts "Sorted array: #{arr}"
  