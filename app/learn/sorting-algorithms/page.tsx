"use client";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { Toaster, toast } from 'sonner';

const bucketColors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A1", "#33FFF3"];

const sortingOptions = [
    "Bubble Sort",
    "Insertion Sort",
    "Selection Sort",
    "Bingo Sort",
    "Bucket Sort",
    "Counting Sort",
    "Heap Sort",
    "Merge Sort",
    "Quick Sort",
    "Radix Sort",
    "Shell Sort",
    "Tim Sort",
    "Bitonic Sort",
    "Cycle Sort",
    "Pigeonhole Sort",
    "Comb Sort",
    "Introsort",
    "3-Way Merge Sort",
    "Bogo Sort"
];

const speedOptions = [
    { label: 'Slow', value: 2000 }, // 2 seconds
    { label: 'Medium', value: 1000 }, // 1 second
    { label: 'Fast', value: 500 },  // 0.5 seconds
    { label: 'Instant', value: 0 }, //immediate
];

interface CodeFiles {
    c: string | null;
    java: string | null;
    python: string | null;
    javascript: string | null;
}

export default function SortingAlgorithms() {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
    const [arrayInput, setArrayInput] = useState<string>("");
    const [array, setArray] = useState<number[]>([]);
    const [originalArray, setOriginalArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [currentPair, setCurrentPair] = useState<[number, number] | null>(null);
    const [sortedIndex, setSortedIndex] = useState<number[]>([]);
    const [speed, setSpeed] = useState(1000); // Default speed 1s
    const [iterationCount, setIterationCount] = useState(0); // State to track number of iterations
    const [advantages, setAdvantages] = useState<string[]>([]);
    const [disadvantages, setDisadvantages] = useState<string[]>([]);
    const [algorithmImage, setAlgorithmImage] = useState<string | null>(null);
    const [codeFiles, setCodeFiles] = useState<CodeFiles>({
        c: null,
        java: null,
        python: null,
        javascript: null
    });
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const codeBlockRef = useRef<HTMLElement | null>(null); // Reference to the code block

    useEffect(() => {
        const fetchAlgorithmData = async () => {
            try {
                const response = await fetch(`/sorting-algorithms/${selectedAlgorithm.toLowerCase().replace(/\s+/g, '')}/info.json`);
                if (response.ok) {
                    const data = await response.json();
                    setAdvantages(data.advantages);
                    setDisadvantages(data.disadvantages);

                    const imageResponse = await fetch(`/sorting-algorithms/${selectedAlgorithm.toLowerCase().replace(/\s+/g, '')}/${selectedAlgorithm.toLowerCase().replace(/\s+/g, '')}.png`);
                    if (imageResponse.ok) {
                        const imageBlob = await imageResponse.blob();
                        setAlgorithmImage(URL.createObjectURL(imageBlob));
                    }

                    const languages = ["c", "java", "py", "js"];
                    const codeData: CodeFiles = { c: null, java: null, python: null, javascript: null };
                    for (const lang of languages) {
                        const codeResponse = await fetch(`/sorting-algorithms/${selectedAlgorithm.toLowerCase().replace(/\s+/g, '')}/code.${lang}`);
                        if (codeResponse.ok) {
                            const codeText = await codeResponse.text();
                            switch (lang) {
                                case 'c':
                                    codeData.c = codeText;
                                    break;
                                case 'java':
                                    codeData.java = codeText;
                                    break;
                                case 'py':
                                    codeData.python = codeText;
                                    break;
                                case 'js':
                                    codeData.javascript = codeText;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    setCodeFiles(codeData);
                } else {
                    console.error('Failed to fetch algorithm info.json');
                }
            } catch (error) {
                console.error('Error fetching algorithm data:', error);
            }
        };

        fetchAlgorithmData();
    }, [selectedAlgorithm]);

    useEffect(() => {
        if (codeBlockRef.current) {
            // Unset 'data-highlighted' attribute if previously set
            if (codeBlockRef.current.getAttribute('data-highlighted') === 'yes') {
                codeBlockRef.current.removeAttribute('data-highlighted');
            }

            // Apply new highlighting
            hljs.highlightElement(codeBlockRef.current);

            // Set 'data-highlighted' to mark it as highlighted
            codeBlockRef.current.setAttribute('data-highlighted', 'yes');
        }
    }, [codeFiles, selectedLanguage]);

    // Function to copy code to clipboard
    const copyToClipboard = () => {
        const code = codeFiles[selectedLanguage as keyof CodeFiles]; // Get the code for the selected language
        if (code) {
            navigator.clipboard.writeText(code).then(() => {
                toast('Code copied to clipboard!');
            });
        }
    };

    // Handle language selection
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
    };


    const handleArrayInput = () => {
        const numbers = arrayInput.split(",").map(num => parseFloat(num.trim())); // Parse decimal and negative numbers
        setArray(numbers);
        setOriginalArray(numbers); // Store o   riginal array
        setSorting(false);
        setSortedIndex([]);
        setCurrentPair(null);
    };

    useEffect(() => {
        if (sorting) {
            switch (selectedAlgorithm) {
                case "Bubble Sort":
                    bubbleSort(array);
                    break;
                case "Insertion Sort":
                    insertionSort(array);
                    break;
                case "Selection Sort":
                    selectionSort(array);
                    break;
                case "Bingo Sort":
                    bingoSort(array);
                    break;
                case "Bucket Sort":
                    bucketSort(array);
                    break;
                case "Counting Sort":
                    countingSort(array);
                    break;
                case "Heap Sort":
                    heapSort(array);
                    break;
                case "Merge Sort":
                    mergeSort(array);
                    break;
                case "Quick Sort":
                    quickSort(array);
                    break;
                case "Radix Sort":
                    radixSort(array);
                    break;
                case "Shell Sort":
                    shellSort(array);
                    break;
                case "Tim Sort":
                    timSort(array);
                    break;
                case "Bitonic Sort":
                    bitonicSort(array);
                    break;
                case "Cycle Sort":
                    cycleSort(array);
                    break;
                case "Pigeonhole Sort":
                    pigeonholeSort(array);
                    break;
                case "Comb Sort":
                    combSort(array);
                    break;
                case "Introsort":
                    introsort(array);
                    break;
                case "3-Way Merge Sort":
                    mergeSort3Way(array);
                    break;
                case "Bogo Sort":
                    bogoSort(array);
                    break;
                default:
                    break;
            }
        }
    }, [sorting, selectedAlgorithm]);

    //bubble sort
    const bubbleSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setCurrentPair([j, j + 1]);
                setIterationCount(prev => prev + 1);
                await delay(speed); // Slow down the sorting

                if (newArr[j] > newArr[j + 1]) {
                    // Swap elements
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    setArray([...newArr]);
                    setIterationCount(prev => prev + 1);
                }
            }
            setSortedIndex((prev) => [...prev, n - i - 1]); // Mark last sorted element
            await delay(500); // Small delay after each pass
        }
        setSortedIndex((prev) => [...prev, 0]); // Mark the final element as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //insertion sort
    const insertionSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;
        for (let i = 1; i < n; i++) {
            const key = newArr[i];
            let j = i - 1;

            while (j >= 0 && newArr[j] > key) {
                setCurrentPair([j, j + 1]);
                await delay(speed); // Slow down the sorting

                newArr[j + 1] = newArr[j];
                j = j - 1;
                setArray([...newArr]);
                setIterationCount(prev => prev + 1);
            }
            newArr[j + 1] = key;
            setArray([...newArr]);
            setIterationCount(prev => prev + 1);
            setSortedIndex((prev) => [...prev, i]); // Mark element as sorted
            await delay(500);
        }
        // Mark the first element as sorted if it's not already included
        if (!sortedIndex.includes(0)) {
            setSortedIndex((prev) => [...prev, 0]); // Mark the first element as sorted
        }
        setCurrentPair(null);
        setSorting(false);
    };

    //selection sort
    const selectionSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                setCurrentPair([minIndex, j]);
                await delay(speed); // Slow down the sorting
                setIterationCount(prev => prev + 1);

                if (newArr[j] < newArr[minIndex]) {
                    minIndex = j;
                }
            }
            // Swap the found minimum element with the first element
            if (minIndex !== i) {
                [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
                setArray([...newArr]);
                setIterationCount(prev => prev + 1);
            }
            setSortedIndex((prev) => [...prev, i]); // Mark element as sorted
            await delay(500);
        }
        setSortedIndex((prev) => [...prev, n - 1]); // Mark the final element as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //bingo sort
    const bingoSort = async (arr: number[]) => {
        const newArr = [...arr];
        const max = Math.max(...newArr);
        const min = Math.min(...newArr);
        const offset = Math.abs(min); // Offset for negative numbers
        const sorted: boolean[] = Array(max + offset + 1).fill(false);

        // Mark each number in the sorted array
        for (const num of newArr) {
            sorted[num + offset] = true; // Adjust index for negative numbers
            setIterationCount(prev => prev + 1);
        }

        const result: number[] = [];

        // Collect sorted numbers
        for (let i = 0; i < sorted.length; i++) {
            if (sorted[i]) {
                result.push(i - offset); // Adjust index back to original value
                setArray([...result]); // Update displayed array with the current state of sorted results
                setCurrentPair([result.length - 1, i - offset]); // Highlight the last collected number
                await delay(speed); // Slow down the visualization
                setIterationCount(prev => prev + 1);
            }
        }

        // After collecting all numbers, update the sorted index
        setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //bucket Sort
    const bucketSort = async (arr: number[]) => {
        const newArr = arr.map(Math.floor); // Ensure all numbers are integers
        const max = Math.max(...newArr);
        const bucketCount = max + 1; // Buckets for integers from 0 to max
        const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

        // Fill the buckets
        newArr.forEach(num => {
            const bucketIndex = Math.floor(num); // No need for min adjustment
            buckets[bucketIndex].push(num);
            setIterationCount(prev => prev + 1);
        });

        const result: number[] = []; // Store the sorted result
        // Sort individual buckets and collect numbers
        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            if (bucket.length > 0) {
                bucket.sort((a, b) => a - b); // Sort each bucket (although most will have 1 item)
                for (const num of bucket) {
                    result.push(num); // Add to the result array
                    setArray([...result]); // Update the displayed array
                    setCurrentPair([bucket.indexOf(num), num]);
                    await delay(speed);
                    setIterationCount(prev => prev + 1);
                }
            }
        }

        setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    const countingSort = async (arr: number[]) => {
        const newArr = arr.map(Math.floor); // Ensure all numbers are integers
        const max = Math.max(...newArr);
        const count: number[] = Array(max + 1).fill(0); // Only non-negative integers
        const result: number[] = [];

        // Count each number's occurrences
        for (const num of newArr) {
            count[num]++;
            setIterationCount(prev => prev + 1);
        }

        // Build the sorted array
        for (let i = 0; i < count.length; i++) {
            while (count[i] > 0) {
                result.push(i);
                setArray([...result]); // Update the displayed array
                setCurrentPair([result.length - 1, i]);
                await delay(speed); // Slow down the visualization
                setIterationCount(prev => prev + 1);
                count[i]--;
            }
        }

        setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //heap sort
    const heapSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;

        const heapify = async (arr: number[], n: number, i: number) => {
            let largest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;

            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }
            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }

            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]];
                setArray([...arr]);
                setIterationCount(prev => prev + 1);
                await delay(speed);

                await heapify(arr, n, largest);
            }
        };

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(newArr, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            [newArr[0], newArr[i]] = [newArr[i], newArr[0]];
            setArray([...newArr]);
            setIterationCount(prev => prev + 1);
            setSortedIndex((prev) => [...prev, i]);
            await delay(speed);
            await heapify(newArr, i, 0);
        }

        setSortedIndex((prev) => [...prev, 0]); // Mark the first element as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //merge sort
    const mergeSort = async (arr: number[]) => {
        const newArr = [...arr];

        // Explicitly define return type as Promise<number[]>
        const merge = async (left: number[], right: number[]): Promise<number[]> => {
            const result: number[] = [];
            while (left.length || right.length) {
                if (left.length && (!right.length || left[0] < right[0])) {
                    result.push(left.shift()!); // Use '!' to assert that shift does not return undefined
                } else {
                    result.push(right.shift()!);
                }
                setArray([...result, ...left, ...right]);
                setIterationCount(prev => prev + 1);
                await delay(speed);
            }
            return result;
        };

        // Explicitly define return type as Promise<number[]>
        const sort = async (arr: number[]): Promise<number[]> => {
            if (arr.length <= 1) return arr; // Base case: return single element or empty array
            const mid = Math.floor(arr.length / 2);

            // Explicitly define types for left and right
            const left: number[] = await sort(arr.slice(0, mid));
            const right: number[] = await sort(arr.slice(mid));

            return merge(left, right);
        };

        await sort(newArr);
        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    // Quick Sort
    const quickSort = async (arr: number[]) => {
        const newArr = [...arr];

        const sort = async (arr: number[], low: number, high: number) => {
            if (low < high) {
                const pi = await partition(arr, low, high);
                await sort(arr, low, pi - 1);
                await sort(arr, pi + 1, high);
            }
        };

        const partition = async (arr: number[], low: number, high: number) => {
            const pivot = arr[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                setCurrentPair([i + 1, j]);
                setIterationCount(prev => prev + 1);
                await delay(speed);
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    setArray([...arr]);
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            setArray([...arr]);
            setSortedIndex((prev) => [...prev, i + 1]);
            await delay(speed);
            return i + 1;
        };

        await sort(newArr, 0, newArr.length - 1);
        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    // Radix Sort
    const radixSort = async (arr: number[]) => {
        const newArr = [...arr];
        const max = Math.max(...newArr);

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            await countingSortByDigit(newArr, exp);
        }

        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    const countingSortByDigit = async (arr: number[], exp: number) => {
        const n = arr.length;
        const output = new Array(n);
        const count = new Array(10).fill(0);

        for (let i = 0; i < n; i++) {
            count[Math.floor(arr[i] / exp) % 10]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = n - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
            setArray([...output]); // Update the displayed array
            setIterationCount(prev => prev + 1);
            await delay(speed);
        }

        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    };

    // Shell Sort
    const shellSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;
        let gap = Math.floor(n / 2);

        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                const temp = newArr[i];
                let j = i;

                while (j >= gap && newArr[j - gap] > temp) {
                    setCurrentPair([j, j - gap]);
                    await delay(speed); // Delay for visualization
                    newArr[j] = newArr[j - gap]; // Move the element
                    setArray([...newArr]); // Update the displayed array
                    setIterationCount(prev => prev + 1);
                    j -= gap;
                }
                newArr[j] = temp; // Place the temp in its correct position
                setArray([...newArr]); // Update the displayed array
                setIterationCount(prev => prev + 1);
            }

            // Decrease the gap
            gap = Math.floor(gap / 2);
        }

        // Mark all elements as sorted after completion
        setSortedIndex([...Array(n).keys()]); // Mark all as sorted
        setCurrentPair(null); // Clear the current pair indicator
        setSorting(false); // Indicate sorting is complete
    };

    // Tim Sort
    const timSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length; // Define n here
        const minRun = 32;

        const insertionSort = async (subArr: number[], left: number, right: number) => {
            for (let i = left + 1; i <= right; i++) {
                const key = subArr[i];
                let j = i - 1;
                while (j >= left && subArr[j] > key) {
                    setCurrentPair([j, j + 1]);
                    setIterationCount(prev => prev + 1);
                    await delay(speed);
                    subArr[j + 1] = subArr[j];
                    j--;
                    setArray([...subArr]);
                }
                subArr[j + 1] = key;
                setArray([...subArr]);
            }
        };

        const merge = async (left: number, mid: number, right: number) => {
            const leftArr = newArr.slice(left, mid + 1);
            const rightArr = newArr.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            while (i < leftArr.length && j < rightArr.length) {
                setCurrentPair([k, left + i]);
                await delay(speed);
                if (leftArr[i] <= rightArr[j]) {
                    newArr[k++] = leftArr[i++];
                } else {
                    newArr[k++] = rightArr[j++];
                }
                setArray([...newArr]);
                setIterationCount(prev => prev + 1);
            }
            while (i < leftArr.length) {
                newArr[k++] = leftArr[i++];
                setArray([...newArr]);
                setIterationCount(prev => prev + 1);
                await delay(speed);
            }
            while (j < rightArr.length) {
                newArr[k++] = rightArr[j++];
                setArray([...newArr]);
                setIterationCount(prev => prev + 1);
                await delay(speed);
            }
        };

        for (let start = 0; start < n; start += minRun) {
            await insertionSort(newArr, start, Math.min(start + minRun - 1, n - 1));
        }

        for (let size = minRun; size < n; size *= 2) {
            for (let left = 0; left < n; left += size * 2) {
                const mid = Math.min(left + size - 1, n - 1);
                const right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) {
                    await merge(left, mid, right);
                }
            }
        }

        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //Bitonic Sort
    const bitonicSort = async (arr: number[]) => {
        const newArr = [...arr];

        // Utility function for swapping based on direction
        const compAndSwap = async (a: number[], i: number, j: number, dir: boolean) => {
            setCurrentPair([i, j]);
            setIterationCount((prev) => prev + 1); // Increment iteration count
            await delay(speed);

            // Swap based on the direction (true for ascending, false for descending)
            if ((dir && a[i] > a[j]) || (!dir && a[i] < a[j])) {
                [a[i], a[j]] = [a[j], a[i]]; // Swap elements
                setArray([...a]); // Update array state for visualization
            }
        };

        // Recursively merges the bitonic sequence
        const bitonicMerge = async (a: number[], low: number, cnt: number, dir: boolean) => {
            if (cnt > 1) {
                const k = Math.floor(cnt / 2);

                // Perform the comparison and swap in the first half of the sequence
                for (let i = low; i < low + k; i++) {
                    await compAndSwap(a, i, i + k, dir);
                }

                // Recursively merge both halves
                await bitonicMerge(a, low, k, dir);
                await bitonicMerge(a, low + k, k, dir);
            }
        };

        // Recursively sorts a bitonic sequence in ascending (dir = true) or descending (dir = false) order
        const bitonicSortHelper = async (a: number[], low: number, cnt: number, dir: boolean) => {
            if (cnt > 1) {
                const k = Math.floor(cnt / 2);

                // Sort the first half in ascending order (dir = true)
                await bitonicSortHelper(a, low, k, true);

                // Sort the second half in descending order (dir = false)
                await bitonicSortHelper(a, low + k, k, false);

                // Merge the two halves in the specified direction
                await bitonicMerge(a, low, cnt, dir);
            }
        };

        // Start the Bitonic Sort process
        await bitonicSortHelper(newArr, 0, newArr.length, true);

        // Mark all elements as sorted
        setSortedIndex([...Array(newArr.length).keys()]);
        setCurrentPair(null);
        setSorting(false);
    };

    // Cycle Sort
    const cycleSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;

        for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
            let item = newArr[cycleStart]; // Change const to let
            let pos = cycleStart;

            for (let i = cycleStart + 1; i < n; i++) {
                if (newArr[i] < item) {
                    pos++;
                }
            }

            // Only put the item in place if there are different elements
            if (pos === cycleStart) continue;

            while (item === newArr[pos]) {
                pos++;
            }

            // Put the item to the right position
            if (pos !== cycleStart) {
                [newArr[pos], item] = [item, newArr[pos]];
                setArray([...newArr]);
                setIterationCount(prev => prev + 1);
                await delay(speed);
            }

            // Rotate the rest of the cycle
            while (pos !== cycleStart) {
                pos = cycleStart;
                for (let i = cycleStart + 1; i < n; i++) {
                    if (newArr[i] < item) {
                        pos++;
                    }
                }

                while (item === newArr[pos]) {
                    pos++;
                }

                if (item !== newArr[pos]) {
                    [newArr[pos], item] = [item, newArr[pos]];
                    setArray([...newArr]);
                    setIterationCount(prev => prev + 1);
                    await delay(speed);
                }
            }
        }

        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //pigeonhole sort

    const pigeonholeSort = async (arr: number[]) => {
        const min = Math.min(...arr);
        const max = Math.max(...arr);
        const size = max - min + 1;
        const holes: number[] = Array(size).fill(0);

        // Count occurrences of each number
        for (const num of arr) {
            holes[num - min]++;
        }

        const newArr: number[] = [];
        for (let i = 0; i < holes.length; i++) {
            while (holes[i] > 0) {
                newArr.push(i + min);
                holes[i]--;
                setArray([...newArr]);
                setIterationCount(prev => prev + 1);
                await delay(speed);
            }
        }

        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //comb sort
    const combSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;
        let gap = n;
        let swapped = true;

        while (gap !== 1 || swapped) {
            gap = Math.floor(gap / 1.3); // Shrink the gap
            if (gap < 1) gap = 1; // Ensure the gap is at least 1

            swapped = false;
            for (let i = 0; i < n - gap; i++) {
                if (newArr[i] > newArr[i + gap]) {
                    [newArr[i], newArr[i + gap]] = [newArr[i + gap], newArr[i]];
                    setArray([...newArr]);
                    setIterationCount(prev => prev + 1);
                    await delay(speed);
                    swapped = true;
                }
            }
        }
        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    //intro sort
    const introsort = async (arr: number[]) => {
        const newArr = [...arr];
        const maxDepth = Math.floor(Math.log(newArr.length) * 2);

        const sort = async (start: number, end: number, depth: number) => {
            if (end - start <= 1) return;

            if (depth === 0) {
                await heapsort(newArr, start, end); // Switch to Heap Sort
            } else {
                const pivotIndex = await partition(newArr, start, end);
                setArray([...newArr]); // Update state to visualize
                setIterationCount(prev => prev + 1);
                await delay(speed); // Delay for visualization

                await sort(start, pivotIndex, depth - 1); // Sort left partition
                await sort(pivotIndex + 1, end, depth - 1); // Sort right partition
            }
        };

        await sort(0, newArr.length, maxDepth); // Start the sorting
        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null); // Clear current pair
        setSorting(false); // Update sorting state
    };

    // Helper Function for Heapsort (Make sure to include this function)
    const heapsort = async (arr: number[], start: number, end: number) => {
        const heapify = async (n: number, i: number) => {
            let largest = i; // Initialize largest as root
            const left = 2 * i + 1; // Left child index
            const right = 2 * i + 2; // Right child index

            // If left child is larger than root
            if (left < n && arr[left] > arr[largest]) {
                largest = left;
            }

            // If right child is larger than largest so far
            if (right < n && arr[right] > arr[largest]) {
                largest = right;
            }

            // If largest is not root
            if (largest !== i) {
                [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
                setArray([...arr]); // Update state to visualize
                setIterationCount(prev => prev + 1);
                await delay(speed); // Delay for visualization

                // Recursively heapify the affected sub-tree
                await heapify(n, largest);
            }
        };

        // Build heap
        for (let i = Math.floor((end - start) / 2) - 1; i >= start; i--) {
            await heapify(end - start, i);
        }

        // One by one extract elements from heap
        for (let i = end - 1; i > start; i--) {
            [arr[start], arr[i]] = [arr[i], arr[start]]; // Move current root to end
            setArray([...arr]); // Update state to visualize
            setIterationCount(prev => prev + 1);
            await delay(speed); // Delay for visualization

            await heapify(i, start); // Call max heapify on the reduced heap
        }
    };

    // Helper function for partitioning used in Introsort
    const partition = async (arr: number[], low: number, high: number) => {
        const pivot = arr[high - 1];
        let i = low - 1;

        for (let j = low; j < high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await delay(1000);
            }
        }
        [arr[i + 1], arr[high - 1]] = [arr[high - 1], arr[i + 1]];
        return i + 1;
    };

    //3 way merge sort
    const mergeSort3Way = async (arr: number[]) => {
        const newArr = [...arr];

        const sort = async (start: number, end: number) => {
            if (end - start < 2) return;

            setIterationCount(prev => prev + 1);

            // Find midpoints for 3-way partition
            const mid1 = start + Math.floor((end - start) / 3);
            const mid2 = start + 2 * Math.floor((end - start) / 3) + 1;

            // Recursively sort the three subarrays
            await sort(start, mid1);
            await sort(mid1, mid2);
            await sort(mid2, end);

            // Merge the three sorted subarrays
            await merge(newArr, start, mid1, mid2, end);
        };

        await sort(0, newArr.length);
        setSortedIndex([...Array(newArr.length).keys()]); // Mark all elements as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    // Helper function to merge three sorted subarrays
    const merge = async (arr: number[], start: number, mid1: number, mid2: number, end: number) => {
        const left = arr.slice(start, mid1);
        const middle = arr.slice(mid1, mid2);
        const right = arr.slice(mid2, end);

        let i = 0, j = 0, k = 0, index = start;

        // Merge elements from three arrays into original array
        while (i < left.length && j < middle.length && k < right.length) {
            if (left[i] <= middle[j] && left[i] <= right[k]) {
                arr[index++] = left[i++];
            } else if (middle[j] <= left[i] && middle[j] <= right[k]) {
                arr[index++] = middle[j++];
            } else {
                arr[index++] = right[k++];
            }
            setArray([...arr]);
            setIterationCount(prev => prev + 1);
            await delay(speed);  // Visualization delay
        }

        // Merge remaining elements of two arrays
        while (i < left.length && j < middle.length) {
            if (left[i] <= middle[j]) {
                arr[index++] = left[i++];
            } else {
                arr[index++] = middle[j++];
            }
            setArray([...arr]);
            setIterationCount(prev => prev + 1);
            await delay(speed);
        }

        while (j < middle.length && k < right.length) {
            if (middle[j] <= right[k]) {
                arr[index++] = middle[j++];
            } else {
                arr[index++] = right[k++];
            }
            setArray([...arr]);
            setIterationCount(prev => prev + 1);
            await delay(speed);
        }

        while (i < left.length && k < right.length) {
            if (left[i] <= right[k]) {
                arr[index++] = left[i++];
            } else {
                arr[index++] = right[k++];
            }
            setArray([...arr]);
            setIterationCount(prev => prev + 1);
            await delay(speed);
        }

        // Merge remaining elements of individual arrays
        while (i < left.length) {
            arr[index++] = left[i++];
            setArray([...arr]);
            setIterationCount(prev => prev + 1);
            await delay(speed);
        }

        while (j < middle.length) {
            arr[index++] = middle[j++];
            setArray([...arr]);
            setIterationCount(prev => prev + 1);
            await delay(speed);
        }

        while (k < right.length) {
            arr[index++] = right[k++];
            setArray([...arr]);
            setIterationCount(prev => prev + 1);
            await delay(1000);
        }
    };

    // Bogo Sort

    // Utility function to check if the array is sorted
    const isSorted = (arr: number[]) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) return false;
        }
        return true;
    };

    // Utility function to shuffle the array randomly
    const shuffleArray = (arr: number[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    };

    //bogo sort
    const bogoSort = async (arr: number[]) => {
        const newArr = [...arr];
        setSpeed(0);
        // Keep shuffling until the array is sorted
        while (!isSorted(newArr)) {
            shuffleArray(newArr);
            setArray([...newArr]);  // Update the array for visualization
            setIterationCount(prev => prev + 1);
            await delay(speed);  // Delay to visualize each shuffle
        }

        // Once sorted, mark all as sorted
        setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
        setCurrentPair(null);  // Clear current pair highlight
        setSorting(false);  // Indicate sorting is done
    };

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212] text-[#E0E0E0]">
            {/* Left Pane: Fixed Size */}
            <motion.div
                className="lg:w-1/4 w-full p-6 bg-[#1F1F1F] shadow-lg border-b lg:border-b-0 lg:border-r border-gray-700 lg:sticky lg:top-0 lg:h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }} // Changed easing and adjusted duration
            >
                <h2 className="text-2xl font-bold mb-6 text-[#F5F5F5]">Sorting Algorithms</h2>

                <div className="space-y-6">
                    {/* Algorithm Selection */}
                    <div>
                        <label className="block mb-2 text-sm text-[#F5F5F5]">Select Sorting Algorithm:</label>
                        <select
                            className="w-full p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                            value={selectedAlgorithm}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setSelectedAlgorithm(selectedValue);
                                if (selectedValue === "Bogo Sort") setSpeed(0); // Instant for Bogo Sort
                            }}
                        >
                            {sortingOptions.map((algorithm) => (
                                <option key={algorithm} value={algorithm}>
                                    {algorithm}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Speed Selection */}
                    <div>
                        <label className="block mb-2 text-sm text-[#F5F5F5]">Select Sorting Speed:</label>
                        <select
                            className="w-full p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        >
                            {speedOptions.map((option) => (
                                <option key={option.label} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Warnings */}
                    {(selectedAlgorithm === "Bucket Sort" || selectedAlgorithm === "Radix Sort" || selectedAlgorithm === "Counting Sort") && (
                        <p className="text-sm text-red-500">Note: {selectedAlgorithm} does not support negative numbers or decimals.</p>
                    )}
                    {selectedAlgorithm === "Bogo Sort" && (
                        <p className="text-sm text-red-500">Note: Bogo Sort is unpredictable.</p>
                    )}
                    {selectedAlgorithm === "Bitonic Sort" && (
                        <p className="text-sm text-red-500">Note: Bitonic Sort works only with inputs of size power of 2.</p>
                    )}

                    {/* Input Array */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#F5F5F5]">Input Array</h3>
                        <input
                            type="text"
                            value={arrayInput}
                            onChange={(e) => setArrayInput(e.target.value)}
                            placeholder="Enter numbers separated by commas"
                            className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                        />
                    </div>

                    {/* Visualize Button */}
                    <button
                        onClick={() => {
                            setIterationCount(0);
                            handleArrayInput();
                            setSorting(true);
                        }}
                        className="w-full py-2 px-4 bg-[#E62B1E] hover:bg-[#C6261A] text-white rounded-md transition duration-300 ease-in-out disabled:bg-[#383838]"
                        disabled={sorting}
                    >
                        Visualize Sorting
                    </button>
                </div>
            </motion.div>

            <motion.div
                className="w-full lg:w-3/4 p-6 bg-[#121212] overflow-y-auto rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }} // Changed easing and adjusted duration
            >
                <div className="flex flex-col items-start justify-center bg-[#1F1F1F] p-4 sm:p-8 rounded-lg">
                    {array.length > 0 ? (
                        <div className="text-left w-full">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#F5F5F5]">
                                {selectedAlgorithm} Visualization
                            </h2>
                            <p className="text-base sm:text-lg text-[#F5F5F5] mb-4">Iterations: {iterationCount}</p>
                            <div className="flex flex-col items-center mb-4">
                                <div className="flex justify-center mb-4">
                                    {/* Original Array */}
                                    {originalArray.map((num, index) => (
                                        <motion.div
                                            key={`original-${index}`}
                                            className="bg-blue-600 text-white text-base sm:text-xl p-2 sm:p-4 rounded-md mx-1"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            {num}
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                    {/* Sorted Array */}
                                    {array.map((num, index) => (
                                        <motion.div
                                            key={index}
                                            className={`${sortedIndex.includes(index) ? "bg-green-500" : "bg-red-600"} 
                                text-white text-base sm:text-xl p-2 sm:p-4 rounded-md mx-1 relative`}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            {num}
                                            {currentPair && (currentPair[0] === index || currentPair[1] === index) && (
                                                <motion.div
                                                    className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ArrowUpIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Buckets for Bucket Sort */}
                            {selectedAlgorithm === "Bucket Sort" && (
                                <>
                                    <h2 className="text-lg sm:text-xl font-bold mt-4 text-[#F5F5F5]">Buckets</h2>
                                    <div className="flex justify-center mb-4">
                                        {array.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                {array.map((num, index) => (
                                                    <div key={`bucket-${index}`} className="flex items-center">
                                                        <div
                                                            className="w-4 h-4 rounded-full"
                                                            style={{
                                                                backgroundColor: bucketColors[index % bucketColors.length],
                                                            }}
                                                        />
                                                        <span className="text-white ml-2">{num}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="my-8 p-4 bg-[#1F1F1F] rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold mb-2 text-[#F5F5F5]">Advantages</h3>
                                <ul className="list-disc list-inside mb-4 p-2">
                                    {advantages.map((adv, index) => (
                                        <li key={index} className="text-[#E0E0E0] mb-2">{adv}</li>
                                    ))}
                                </ul>

                                <h3 className="text-lg font-semibold mb-2 text-[#F5F5F5]">Disadvantages</h3>
                                <ul className="list-disc list-inside mb-4 p-2">
                                    {disadvantages.map((dis, index) => (
                                        <li key={index} className="text-[#E0E0E0] mb-2">{dis}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Algorithm Image */}
                            {algorithmImage && (
                                <img
                                    src={algorithmImage}
                                    alt={`${selectedAlgorithm} Illustration`}
                                    className="my-4 w-full max-w-lg mx-auto rounded-lg object-contain"
                                />
                            )}

                            {/* Language Dropdown */}
                            <h2 className="mt-12 text-2xl font-bold mb-2 text-[#F5F5F5]">Source Code</h2>
                            <label htmlFor="languageSelect" className="block mt-2 text-[#F5F5F5]">Select Language:</label>
                            <select
                                id="languageSelect"
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                                className="mt-2 mb-4 p-2 border bg-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                                <option>Select</option>
                                <option value="c">C</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                            </select>

                            {/* Display Code Snippet for selected language */}
                            {codeFiles[selectedLanguage as keyof CodeFiles] && (
                                <div className="text-left">
                                    <pre className="bg-gray-800 p-4 rounded overflow-x-auto">
                                        <code ref={codeBlockRef} className={`language-${selectedLanguage}`}>
                                            {codeFiles[selectedLanguage as keyof CodeFiles]}
                                        </code>
                                    </pre>
                                    <button
                                        onClick={copyToClipboard}
                                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    >
                                        Copy Code
                                    </button>
                                </div>
                            )}

                        </div>
                    ) : (
                        <h3 className="text-base sm:text-lg text-[#E0E0E0]">Enter an array to visualize the sorting algorithm.</h3>
                    )}
                </div>
                <Toaster
                    position="bottom-right"
                    richColors
                    toastOptions={{
                        style: {
                            background: '#1F1F1F',
                            color: '#E0E0E0',
                        },
                    }}
                />
            </motion.div>
        </div >
    );
}