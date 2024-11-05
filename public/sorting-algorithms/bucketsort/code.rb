def bucket_sort(arr)
    buckets = Array.new(10) { [] }
  
    arr.each do |num|
      bucket_index = (num * 10).to_i
      buckets[bucket_index] << num
    end
  
    buckets.each(&:sort!)
  
    buckets.flatten
  end
  
  arr = [0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.18, 0.23, 0.45, 0.91]
  puts "Original array: #{arr}"
  sorted_arr = bucket_sort(arr)
  puts "Sorted array: #{sorted_arr}"
  