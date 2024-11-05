import std.studio;
import std.random;
import std.algorithm;

bool sorted(int[] arr){
    for(int i = 1; i < arr.length; i++){
        if(arr[i] < arr[i - 1]){
            return false;
        }
    }
    return true;
}

void bogosort(int[] arr){
    while(!sorted(arr)){
        shuffle(arr);
    }
}