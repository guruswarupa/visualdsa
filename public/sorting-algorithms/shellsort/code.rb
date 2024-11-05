def shell_sort(arr)
    n = arr.length
    gap = n / 2
    while gap > 0
        (gap...n).each do |i|
            temp = arr[i]
            j = i
            while j >= gap && arr[j - gap] > temp
                arr[j] = arr[j - gap]
                j -= gap
            end
            arr[j] = temp
        end
        gap /= 2
    end
end

arr = [64, 25, 12, 22, 11]
puts "Original array: #{arr}"
shell_sort(arr)
puts "Sorted array: #{arr}"
