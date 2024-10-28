"use client";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { Toaster, toast } from "sonner";

///////////////////////////////initialize colors for buckets/////////////////////////////////////
const bucketColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F3FF33",
  "#FF33A1",
  "#33FFF3",
];

///////////////////////////////initialize all sorting algorithms for dropdown////////////////////
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
  "Bogo Sort",
];

/////////////////////////////////////speed declaration///////////////////////////////////////////
const speedOptions = [
  { label: "Slow", value: 2000 }, // 2 seconds
  { label: "Medium", value: 1000 }, // 1 second
  { label: "Fast", value: 500 }, // 0.5 seconds
  { label: "Instant", value: 0 }, //immediate
];

///////////////////////////////////////interface for storing code///////////////////////////////////
interface CodeFiles {
  c: string | null;
  java: string | null;
  python: string | null;
  javascript: string | null;
  typescript: string | null;
  csharp: string | null;
  cplusplus: string | null;
  rust: string | null;
  ruby: string | null;
  lua: string | null;
}

export default function SortingAlgorithms() {
  //////////////////////////////////////adding states for functionality///////////////////////////
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  const [arrayInput, setArrayInput] = useState<string>("");
  const [array, setArray] = useState<number[]>([]);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [currentPair, setCurrentPair] = useState<[number, number] | null>(null);
  const [sortedIndex, setSortedIndex] = useState<number[]>([]);
  const [speed, setSpeed] = useState(speedOptions[1].value);
  const speedRef = useRef(speed);
  const [iterationCount, setIterationCount] = useState(0);
  const [advantages, setAdvantages] = useState<string[]>([]);
  const [disadvantages, setDisadvantages] = useState<string[]>([]);
  const [algorithmImage, setAlgorithmImage] = useState<string | null>(null);
  const [codeFiles, setCodeFiles] = useState<CodeFiles>({
    c: null,
    java: null,
    python: null,
    javascript: null,
    typescript: null,
    csharp: null,
    cplusplus: null,
    rust: null,
    ruby: null,
    lua: null,
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const codeBlockRef = useRef<HTMLElement | null>(null); // Reference to the code block
  const isPausedRef = useRef(false);
  const isStoppedRef = useRef(false);

  /////////////////////////////////adding states for each algorithm////////////////////////////////////
  const [bubbleSortIndex, setBubbleSortIndex] = useState({ i: 0, j: 0 });
  const [insertionSortIndex, setInsertionSortIndex] = useState({ i: 1, j: 0 });
  const [selectionSortIndex, setSelectionSortIndex] = useState({ i: 0, j: 0 });
  const [bingoSortState, setBingoSortState] = useState({
    i: 0,
    phase: "marking",
    result: [] as number[],
    sorted: [] as boolean[],
  });
  const [bucketSortState, setBucketSortState] = useState({
    i: 0,
    j: 0,
    phase: "filling",
    result: [] as number[],
    buckets: [] as number[][],
  });

  ///////////////////update speed as it changes//////////////
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  ////////////////load the website with all the data required/////////////////
  useEffect(() => {
    const fetchAlgorithmData = async () => {
      try {
        const response = await fetch(
          `/sorting-algorithms/${selectedAlgorithm
            .toLowerCase()
            .replace(/\s+/g, "")}/info.json`
        );
        if (response.ok) {
          const data = await response.json();
          setAdvantages(data.advantages);
          setDisadvantages(data.disadvantages);

          const imageResponse = await fetch(
            `/sorting-algorithms/${selectedAlgorithm
              .toLowerCase()
              .replace(/\s+/g, "")}/${selectedAlgorithm
              .toLowerCase()
              .replace(/\s+/g, "")}.png`
          );
          if (imageResponse.ok) {
            const imageBlob = await imageResponse.blob();
            setAlgorithmImage(URL.createObjectURL(imageBlob));
          }

          const languages = [
            "c",
            "java",
            "py",
            "js",
            "ts",
            "cs",
            "cpp",
            "rs",
            "rb",
            "lua",
          ];
          const codeData: CodeFiles = {
            c: null,
            java: null,
            python: null,
            javascript: null,
            typescript: null,
            csharp: null,
            cplusplus: null,
            rust: null,
            ruby: null,
            lua: null,
          };
          for (const lang of languages) {
            const codeResponse = await fetch(
              `/sorting-algorithms/${selectedAlgorithm
                .toLowerCase()
                .replace(/\s+/g, "")}/code.${lang}`
            );
            if (codeResponse.ok) {
              const codeText = await codeResponse.text();
              switch (lang) {
                case "c":
                  codeData.c = codeText;
                  break;
                case "java":
                  codeData.java = codeText;
                  break;
                case "py":
                  codeData.python = codeText;
                  break;
                case "js":
                  codeData.javascript = codeText;
                  break;
                case "ts":
                  codeData.typescript = codeText;
                  break;
                case "cs":
                  codeData.csharp = codeText;
                  break;
                case "cpp":
                  codeData.cplusplus = codeText;
                  break;
                case "rs":
                  codeData.rust = codeText;
                  break;
                case "rb":
                  codeData.ruby = codeText;
                  break;
                case "lua":
                  codeData.lua = codeText;
                  break;
                default:
                  break;
              }
            }
          }
          setCodeFiles(codeData);
        } else {
          console.error("Failed to fetch algorithm info.json");
        }
      } catch (error) {
        console.error("Error fetching algorithm data:", error);
      }
    };

    fetchAlgorithmData();
  }, [selectedAlgorithm]);

  ////////////////////////load the code as language changes////////////////////////
  useEffect(() => {
    if (codeBlockRef.current) {
      // Unset 'data-highlighted' attribute if previously set
      if (codeBlockRef.current.getAttribute("data-highlighted") === "yes") {
        codeBlockRef.current.removeAttribute("data-highlighted");
      }

      // Apply new highlighting
      hljs.highlightElement(codeBlockRef.current);

      // Set 'data-highlighted' to mark it as highlighted
      codeBlockRef.current.setAttribute("data-highlighted", "yes");
    }
  }, [codeFiles, selectedLanguage]);

  // Function to copy code to clipboard
  const copyToClipboard = () => {
    const code = codeFiles[selectedLanguage as keyof CodeFiles]; // Get the code for the selected language
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        toast("Code copied to clipboard!");
      });
    }
  };

  // Handle language selection
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleArrayInput = () => {
    const numbers = arrayInput.split(",").map((num) => parseFloat(num.trim())); // Parse decimal and negative numbers
    setArray(numbers);
    setOriginalArray(numbers); // Store original array
    setSorting(false);
    setSortedIndex([]);
    setCurrentPair(null);
  };

  const handleVisualizeSorting = () => {
    setIterationCount(0);
    setBubbleSortIndex({ i: 0, j: 0 });
    setInsertionSortIndex({ i: 1, j: 0 });
    setSelectionSortIndex({ i: 0, j: 0 });
    setBingoSortState({
      i: 0,
      phase: "marking",
      result: [] as number[],
      sorted: [] as boolean[],
    });
    setBucketSortState({
      i: 0,
      j: 0,
      phase: "filling",
      result: [] as number[],
      buckets: [] as number[][],
    });

    handleArrayInput(); // Set the input array
    setSorting(true); // Start sorting
    isStoppedRef.current = false; // Ensure sorting isn't stopped
    isPausedRef.current = false; // Reset paused state
  };

  const playSorting = () => {
    isPausedRef.current = false; // Set paused to false

    // If sorting was stopped, prepare to restart
    if (isStoppedRef.current) {
      handleArrayInput(); // Reset current state for sorting
      setSorting(true); // Start sorting
      isStoppedRef.current = false; // Reset the stop state
    } else if (!sorting) {
      // If it wasn't stopped but paused, we need to continue
      setSorting(true); // Resume sorting
    }
  };

  const pauseSorting = () => {
    isPausedRef.current = true; // Mark sorting as paused
    setSorting(false); // Stop the rendering loop
  };

  const stopSorting = () => {
    setIterationCount(0);
    isStoppedRef.current = true; // Mark sorting as stopped
    setSorting(false); // Stop sorting
    setArray(originalArray); // Reset to the original array
    setCurrentPair(null);
    setSortedIndex([]);
  };

  //////////////////handle change of algorithm////////////////////
  useEffect(() => {
    const sort = async () => {
      if (!sorting || isStoppedRef.current) return;
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
    };
    sort();
  }, [sorting, selectedAlgorithm]);
  /////////////////////////////////////bubble sort///////////////////////////////////////////
  const bubbleSort = async (arr: number[]) => {
    const newArr = [...arr];
    const n = newArr.length;
    let { i, j } = bubbleSortIndex;
    if (i === undefined || j === undefined) {
      i = 0;
      j = 0;
    }
    while (i < n - 1) {
      if (isPausedRef.current || isStoppedRef.current) {
        setBubbleSortIndex({ i, j });
        return;
      }
      if (j < n - i - 1) {
        setCurrentPair([j, j + 1]);
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
        if (newArr[j] > newArr[j + 1]) {
          [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
          setArray([...newArr]);
        }
        j++;
      } else {
        setSortedIndex((prev) => [...prev, n - i - 1]); // Mark current index as sorted
        await delay(200); // Pause to visualize sorting
        i++;
        j = 0;
      }
    }
    setSortedIndex((prev) => [...prev, 0]); // Mark the last element as sorted
    setCurrentPair(null);
    setSorting(false);
  };
  /////////////////////////////////////insertion sort///////////////////////////////////////////
  const insertionSort = async (arr: number[]) => {
    const newArr = [...arr];
    const n = newArr.length;
    let { i, j } = insertionSortIndex;
    if (i === undefined || j === undefined) {
      i = 0;
      j = 0;
    }
    while (i < n) {
      if (isPausedRef.current || isStoppedRef.current) {
        setInsertionSortIndex({ i, j });
        return;
      }
      const key = newArr[i];
      j = i - 1;
      while (j >= 0 && newArr[j] > key) {
        if (isPausedRef.current || isStoppedRef.current) {
          setInsertionSortIndex({ i, j });
          return;
        }
        setCurrentPair([j, j + 1]);
        await delay(speedRef.current);

        newArr[j + 1] = newArr[j];
        setArray([...newArr]);
        setIterationCount((prev) => prev + 1);
        j--;
      }
      newArr[j + 1] = key;
      setArray([...newArr]);
      setIterationCount((prev) => prev + 1);
      setSortedIndex((prev) => [...prev, i]); // Mark current element as sorted
      await delay(200); // Pause to visualize sorting
      i++;
    }
    if (!sortedIndex.includes(0)) {
      setSortedIndex((prev) => [...prev, 0]); // Mark first element as sorted
    }
    setCurrentPair(null);
    setSorting(false);
  };
  ///////////////////////////////////////selection sort///////////////////////////////////////////
  const selectionSort = async (arr: number[]) => {
    const newArr = [...arr];
    const n = newArr.length;
    // Initialize indices from the state
    let { i, j } = selectionSortIndex;
    // Ensure we start from the last known state if resuming
    while (i < n - 1) {
      // If paused or stopped, exit to resume later
      if (isPausedRef.current || isStoppedRef.current) {
        setSelectionSortIndex({ i, j }); // Save current indices before exiting
        return;
      }
      let minIndex = i;
      j = i + 1; // Start inner loop
      // Inner loop to find the minimum element
      while (j < n) {
        setCurrentPair([minIndex, j]); // Highlight the current comparison pair
        await delay(speedRef.current); // Slow down the sorting
        setIterationCount((prev) => prev + 1); // Increment comparison count
        // Update minIndex if a new minimum is found
        if (newArr[j] < newArr[minIndex]) {
          minIndex = j;
        }
        j++; // Move to the next element
      }
      // After inner loop, check if a swap is needed
      if (minIndex !== i) {
        // Perform the swap
        [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
        setArray([...newArr]); // Update the displayed array
        setIterationCount((prev) => prev + 1); // Increment swap count
      }
      // Mark the current index as sorted
      setSortedIndex((prev) => [...prev, i]); // Highlight the sorted element
      i++; // Move to the next outer loop iteration
      await delay(200); // Delay before the next iteration
    }
    // Mark the last element as sorted
    setSortedIndex((prev) => [...prev, n - 1]); // Mark last element as sorted
    setCurrentPair(null); // Clear current pair to avoid type issue
    setSorting(false);
  };
  /////////////////////////////////////bingo sort///////////////////////////////////////////
  const bingoSort = async (arr: number[]) => {
    const newArr = [...arr];
    const max = Math.max(...newArr);
    const min = Math.min(...newArr);
    const offset = Math.abs(min); // Offset for negative numbers
    let { i, phase, result, sorted } = bingoSortState;
    // Initialize `sorted` array if it's empty (first run or after reset)
    if (sorted.length === 0) {
      sorted = Array(max + offset + 1).fill(false);
    }
    // Phase 1: Mark each number in the sorted array
    if (phase === "marking") {
      for (; i < newArr.length; i++) {
        if (isPausedRef.current || isStoppedRef.current) {
          setBingoSortState({ i, phase: "marking", result, sorted });
          return;
        }
        // Highlight the current element being read
        setCurrentPair([newArr[i], -1]); // Use -1 as the second value to avoid type error
        await delay(speedRef.current / 2); // Show the current element before marking it
        // Mark the current number in the sorted array
        sorted[newArr[i] + offset] = true; // Adjust index for negative numbers
        setIterationCount((prev) => prev + 1);
        // Remove highlight after marking
        setCurrentPair(null);
        await delay(speedRef.current / 2);
      }
      // Move to the collecting phase after marking
      i = 0;
      phase = "collecting";
      setBingoSortState({ i, phase, result, sorted });
    }
    // Phase 2: Collect sorted numbers
    if (phase === "collecting") {
      for (; i < sorted.length; i++) {
        if (isPausedRef.current || isStoppedRef.current) {
          setBingoSortState({ i, phase: "collecting", result, sorted });
          return;
        }
        if (sorted[i]) {
          result = [...result, i - offset]; // Adjust index back to original value
          setArray(result); // Update displayed array with the current state of sorted results
          setCurrentPair([result.length - 1, i - offset]); // Highlight the last collected number
          await delay(speedRef.current); // Slow down the visualization
          setIterationCount((prev) => prev + 1);
        }
      }
    }
    // After collecting all numbers, update the sorted index
    setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
    setCurrentPair(null);
    setSorting(false);
  };
  /////////////////////////////////////bucket sort///////////////////////////////////////////
  const bucketSort = async (arr: number[]) => {
    const newArr = arr.map(Math.floor); // Ensure all numbers are integers
    const max = Math.max(...newArr);
    const bucketCount = max + 1; // Buckets for integers from 0 to max
    let { i, j, phase, result, buckets } = bucketSortState;
    // Initialize buckets if they are empty (first run or after reset)
    if (buckets.length === 0) {
      buckets = Array.from({ length: bucketCount }, () => []);
    }
    // Phase 1: Fill the buckets with a visual highlight for reading each element
    if (phase === "filling") {
      for (; i < newArr.length; i++) {
        if (isPausedRef.current || isStoppedRef.current) {
          setBucketSortState({ i, j, phase: "filling", result, buckets });
          return;
        }
        // Highlight the current element being read
        setCurrentPair([newArr[i], -1]); // Use -1 as the second value to indicate no comparison
        await delay(speedRef.current / 2); // Delay for the highlight effect
        // Place the element in the appropriate bucket
        const bucketIndex = Math.floor(newArr[i]);
        buckets[bucketIndex].push(newArr[i]);
        setIterationCount((prev) => prev + 1);
        // Clear highlight after placing in the bucket
        setCurrentPair(null); // Remove highlighting
        await delay(speedRef.current / 2);
      }
      // Move to the collecting phase after filling buckets
      i = 0;
      j = 0;
      phase = "collecting";
      setBucketSortState({ i, j, phase, result, buckets });
    }
    // Phase 2: Sort buckets and collect numbers into the result
    if (phase === "collecting") {
      for (; i < buckets.length; i++) {
        const bucket = buckets[i];
        if (bucket.length > 0) {
          if (j === 0) {
            bucket.sort((a, b) => a - b); // Sort each bucket only once
          }
          // Collect sorted elements from the current bucket into the result
          for (; j < bucket.length; j++) {
            if (isPausedRef.current || isStoppedRef.current) {
              setBucketSortState({
                i,
                j,
                phase: "collecting",
                result,
                buckets,
              });
              return;
            }
            result = [...result, bucket[j]]; // Add current element to the result
            setArray(result); // Update displayed array
            setCurrentPair([bucket[j], -1]); // Highlight the current collected element
            await delay(speedRef.current); // Delay for visualization
            setIterationCount((prev) => prev + 1);
          }
          j = 0; // Reset inner loop index after finishing the current bucket
        }
      }
    }
    // Finalize by marking the array as fully sorted
    setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
    setCurrentPair(null);
    setSorting(false);
  };
  /////////////////////////////////////counting sort///////////////////////////////////////////
  const countingSort = async (arr: number[]) => {
    const newArr = arr.map(Math.floor); // Ensure all numbers are integers
    const max = Math.max(...newArr);
    const count: number[] = Array(max + 1).fill(0); // Only non-negative integers
    const result: number[] = [];

    // Count each number's occurrences
    for (const num of newArr) {
      while (isPausedRef.current) {
        await delay(100); // Polling interval while paused
      }

      if (isStoppedRef.current) return; // If sorting was stopped, exit

      count[num]++;
      setIterationCount((prev) => prev + 1);
    }

    // Build the sorted array
    for (let i = 0; i < count.length; i++) {
      while (count[i] > 0) {
        while (isPausedRef.current) {
          await delay(100); // Polling interval while paused
        }

        if (isStoppedRef.current) return; // If sorting was stopped, exit

        result.push(i);
        setArray([...result]); // Update the displayed array
        setCurrentPair([result.length - 1, i]); // Visualize current element being added

        // Change the color for the visual representation of sorting
        // Assuming you have a way to manage the colors in your array
        setSortedIndex((prev) => [...prev, result.length - 1]); // Mark as sorted
        await delay(speedRef.current); // Slow down the visualization
        setIterationCount((prev) => prev + 1);
        count[i]--;
      }
    }

    setCurrentPair(null);
    setSorting(false);
  };
  /////////////////////////////////////heap sort///////////////////////////////////////////
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
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
        if (isPausedRef.current || isStoppedRef.current) return;
        await heapify(arr, n, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(newArr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      if (isPausedRef.current || isStoppedRef.current) return;
      [newArr[0], newArr[i]] = [newArr[i], newArr[0]];
      setArray([...newArr]);
      setIterationCount((prev) => prev + 1);
      setSortedIndex((prev) => [...prev, i]);
      await delay(speedRef.current);
      if (isPausedRef.current || isStoppedRef.current) return;
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
    const merge = async (
      left: number[],
      right: number[]
    ): Promise<number[]> => {
      const result: number[] = [];
      while (left.length || right.length) {
        if (isPausedRef.current || isStoppedRef.current) return result;
        if (left.length && (!right.length || left[0] < right[0])) {
          result.push(left.shift()!); // Use '!' to assert that shift does not return undefined
        } else {
          result.push(right.shift()!);
        }
        setArray([...result, ...left, ...right]);
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
      }
      return result;
    };

    // Explicitly define return type as Promise<number[]>
    const sort = async (arr: number[]): Promise<number[]> => {
      if (isPausedRef.current || isStoppedRef.current) return arr;
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
      if (isPausedRef.current || isStoppedRef.current) return;
      if (low < high) {
        const pi = await partition(arr, low, high);
        if (pi === undefined) return; // Handle the case where partition returns undefined
        await sort(arr, low, pi - 1);
        await sort(arr, pi + 1, high);
      }
    };

    const partition = async (arr: number[], low: number, high: number) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (isPausedRef.current || isStoppedRef.current) return undefined; // Return undefined to indicate interruption
        setCurrentPair([i + 1, j]);
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setArray([...arr]);
      setSortedIndex((prev) => [...prev, i + 1]);
      await delay(speedRef.current);
      return i + 1; // Return the partition index
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
      if (isPausedRef.current || isStoppedRef.current) return;
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
      if (isPausedRef.current || isStoppedRef.current) return;
      output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
      count[Math.floor(arr[i] / exp) % 10]--;
      setArray([...output]); // Update the displayed array
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
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
          await delay(speedRef.current); // Delay for visualization
          newArr[j] = newArr[j - gap]; // Move the element
          setArray([...newArr]); // Update the displayed array
          setIterationCount((prev) => prev + 1);
          j -= gap;
        }
        newArr[j] = temp; // Place the temp in its correct position
        setArray([...newArr]); // Update the displayed array
        setIterationCount((prev) => prev + 1);
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

    const insertionSort = async (
      subArr: number[],
      left: number,
      right: number
    ) => {
      for (let i = left + 1; i <= right; i++) {
        const key = subArr[i];
        let j = i - 1;
        while (j >= left && subArr[j] > key) {
          setCurrentPair([j, j + 1]);
          setIterationCount((prev) => prev + 1);
          await delay(speedRef.current);
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
      let i = 0,
        j = 0,
        k = left;

      while (i < leftArr.length && j < rightArr.length) {
        setCurrentPair([k, left + i]);
        await delay(speedRef.current);
        if (leftArr[i] <= rightArr[j]) {
          newArr[k++] = leftArr[i++];
        } else {
          newArr[k++] = rightArr[j++];
        }
        setArray([...newArr]);
        setIterationCount((prev) => prev + 1);
      }
      while (i < leftArr.length) {
        newArr[k++] = leftArr[i++];
        setArray([...newArr]);
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
      }
      while (j < rightArr.length) {
        newArr[k++] = rightArr[j++];
        setArray([...newArr]);
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
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
    const compAndSwap = async (
      a: number[],
      i: number,
      j: number,
      dir: boolean
    ) => {
      setCurrentPair([i, j]);
      setIterationCount((prev) => prev + 1); // Increment iteration count
      await delay(speedRef.current);

      // Swap based on the direction (true for ascending, false for descending)
      if ((dir && a[i] > a[j]) || (!dir && a[i] < a[j])) {
        [a[i], a[j]] = [a[j], a[i]]; // Swap elements
        setArray([...a]); // Update array state for visualization
      }
    };

    // Recursively merges the bitonic sequence
    const bitonicMerge = async (
      a: number[],
      low: number,
      cnt: number,
      dir: boolean
    ) => {
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
    const bitonicSortHelper = async (
      a: number[],
      low: number,
      cnt: number,
      dir: boolean
    ) => {
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
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
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
          setIterationCount((prev) => prev + 1);
          await delay(speedRef.current);
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
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
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
          setIterationCount((prev) => prev + 1);
          await delay(speedRef.current);
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
        // Use Heapsort when depth is 0
        await heapsort(newArr, start, end);
      } else {
        const pivotIndex = await partition(newArr, start, end);
        setArray([...newArr]); // Update state to visualize
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current); // Delay for visualization

        // Recursively sort the left and right partitions
        await sort(start, pivotIndex, depth - 1); // Sort left partition
        await sort(pivotIndex + 1, end, depth - 1); // Sort right partition
      }
    };

    await sort(0, newArr.length, maxDepth); // Start the sorting
    setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
    setCurrentPair(null); // Clear current pair
    setSorting(false); // Update sorting state
  };

  // Helper Function for Heapsort
  const heapsort = async (arr: number[], start: number, end: number) => {
    const n = end - start;

    const heapify = async (n: number, i: number) => {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[start + left] > arr[start + largest]) {
        largest = left;
      }

      if (right < n && arr[start + right] > arr[start + largest]) {
        largest = right;
      }

      if (largest !== i) {
        [arr[start + i], arr[start + largest]] = [
          arr[start + largest],
          arr[start + i],
        ];
        setArray([...arr]); // Update state to visualize
        setIterationCount((prev) => prev + 1);
        await delay(speedRef.current);
        await heapify(n, largest);
      }
    };

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [arr[start], arr[start + i]] = [arr[start + i], arr[start]]; // Move current root to end
      setArray([...arr]); // Update state to visualize
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
      await heapify(i, 0); // Call max heapify on the reduced heap
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
        await delay(speedRef.current);
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

      setIterationCount((prev) => prev + 1);

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
  const merge = async (
    arr: number[],
    start: number,
    mid1: number,
    mid2: number,
    end: number
  ) => {
    const left = arr.slice(start, mid1);
    const middle = arr.slice(mid1, mid2);
    const right = arr.slice(mid2, end);

    let i = 0,
      j = 0,
      k = 0,
      index = start;

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
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current); // Visualization delay
    }

    // Merge remaining elements of two arrays
    while (i < left.length && j < middle.length) {
      if (left[i] <= middle[j]) {
        arr[index++] = left[i++];
      } else {
        arr[index++] = middle[j++];
      }
      setArray([...arr]);
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
    }

    while (j < middle.length && k < right.length) {
      if (middle[j] <= right[k]) {
        arr[index++] = middle[j++];
      } else {
        arr[index++] = right[k++];
      }
      setArray([...arr]);
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
    }

    while (i < left.length && k < right.length) {
      if (left[i] <= right[k]) {
        arr[index++] = left[i++];
      } else {
        arr[index++] = right[k++];
      }
      setArray([...arr]);
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
    }

    // Merge remaining elements of individual arrays
    while (i < left.length) {
      arr[index++] = left[i++];
      setArray([...arr]);
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
    }

    while (j < middle.length) {
      arr[index++] = middle[j++];
      setArray([...arr]);
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
    }

    while (k < right.length) {
      arr[index++] = right[k++];
      setArray([...arr]);
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current);
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
      setArray([...newArr]); // Update the array for visualization
      setIterationCount((prev) => prev + 1);
      await delay(speedRef.current); // Delay to visualize each shuffle
    }

    // Once sorted, mark all as sorted
    setSortedIndex([...Array(newArr.length).keys()]); // Mark all as sorted
    setCurrentPair(null); // Clear current pair highlight
    setSorting(false); // Indicate sorting is done
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212] text-[#E0E0E0]">
      {/* Left Pane: Fixed Size */}
      <motion.div
        className="lg:w-1/4 w-full p-6 bg-[#1F1F1F] shadow-lg border-b lg:border-b-0 lg:border-r border-gray-700 lg:sticky lg:top-0 lg:h-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }} // Changed easing and adjusted duration
      >
        <h2 className="text-2xl font-bold mb-6 text-[#F5F5F5]">
          Sorting Algorithms
        </h2>

        <div className="space-y-6">
          {/* Algorithm Selection */}
          <div>
            <label className="block mb-2 text-sm text-[#F5F5F5]">
              Select Sorting Algorithm:
            </label>
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
            <label className="block mb-2 text-sm text-[#F5F5F5]">
              Select Sorting Speed:
            </label>
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
          {(selectedAlgorithm === "Bucket Sort" ||
            selectedAlgorithm === "Radix Sort" ||
            selectedAlgorithm === "Counting Sort") && (
            <p className="text-sm text-red-500">
              Note: {selectedAlgorithm} does not support negative numbers or
              decimals.
            </p>
          )}
          {selectedAlgorithm === "Bogo Sort" && (
            <p className="text-sm text-red-500">
              Note: Bogo Sort is unpredictable.
            </p>
          )}
          {selectedAlgorithm === "Bitonic Sort" && (
            <p className="text-sm text-red-500">
              Note: Bitonic Sort works only with inputs of size power of 2.
            </p>
          )}

          {/* Input Array */}
          <div>
            <h3 className="text-lg font-semibold text-[#F5F5F5]">
              Input Array
            </h3>
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
            onClick={handleVisualizeSorting}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition duration-300 ease-in-out disabled:bg-[#383838]"
            disabled={sorting}
          >
            Visualize Sorting
          </button>
          <button
            onClick={stopSorting}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md transition duration-300 ease-in-out"
          >
            Stop
          </button>
          <button
            onClick={isPausedRef.current ? playSorting : pauseSorting}
            className={`w-full py-2 px-4 text-white rounded-md transition duration-300 ease-in-out ${
              isPausedRef.current
                ? "bg-yellow-600 hover:bg-yellow-500"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {isPausedRef.current ? "Resume" : "Pause"}
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
              <p className="text-base sm:text-lg text-[#F5F5F5] mb-4">
                Iterations: {iterationCount}
              </p>
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
                      className={`${
                        sortedIndex.includes(index)
                          ? "bg-green-500"
                          : "bg-red-600"
                      } 
                                text-white text-base sm:text-xl p-2 sm:p-4 rounded-md mx-1 relative`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {num}
                      {currentPair &&
                        (currentPair[0] === index ||
                          currentPair[1] === index) && (
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
                  <h2 className="text-lg sm:text-xl font-bold mt-4 text-[#F5F5F5]">
                    Buckets
                  </h2>
                  <div className="flex justify-center mb-4">
                    {bucketSortState.buckets.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {bucketSortState.buckets.map(
                          (bucket, index) =>
                            // Render only non-empty buckets
                            bucket.length > 0 && (
                              <div
                                key={`bucket-${index}`}
                                className="flex items-center"
                              >
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{
                                    backgroundColor:
                                      bucketColors[index % bucketColors.length],
                                  }}
                                />
                                <div className="flex gap-1 ml-2">
                                  {bucket.map((num, idx) => (
                                    <span
                                      key={`bucket-${index}-item-${idx}`}
                                      className="text-white"
                                    >
                                      {num}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
              <div className="my-8 p-4 bg-[#1F1F1F] rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-[#F5F5F5]">
                  Advantages
                </h3>
                <ul className="list-disc list-inside mb-4 p-2">
                  {advantages.map((adv, index) => (
                    <li key={index} className="text-[#E0E0E0] mb-2">
                      {adv}
                    </li>
                  ))}
                </ul>

                <h3 className="text-lg font-semibold mb-2 text-[#F5F5F5]">
                  Disadvantages
                </h3>
                <ul className="list-disc list-inside mb-4 p-2">
                  {disadvantages.map((dis, index) => (
                    <li key={index} className="text-[#E0E0E0] mb-2">
                      {dis}
                    </li>
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
              <h2 className="mt-12 text-2xl font-bold mb-2 text-[#F5F5F5]">
                Source Code
              </h2>
              <label
                htmlFor="languageSelect"
                className="block mt-2 text-[#F5F5F5]"
              >
                Select Language:
              </label>
              <select
                id="languageSelect"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="mt-2 mb-4 p-2 border bg-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option>Select</option>
                <option value="c">C</option>
                <option value="cplusplus">C++</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="csharp">C#</option>
                <option value="rust">Rust</option>
                <option value="ruby">Ruby</option>
                <option value="lua">Lua</option>
              </select>

              {/* Display Code Snippet for selected language */}
              {codeFiles[selectedLanguage as keyof CodeFiles] && (
                <div className="text-left">
                  <pre className="bg-gray-800 p-4 rounded overflow-x-auto">
                    <code
                      ref={codeBlockRef}
                      className={`language-${selectedLanguage}`}
                    >
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
            <h3 className="text-base sm:text-lg text-[#E0E0E0]">
              Enter an array to visualize the sorting algorithm.
            </h3>
          )}
        </div>
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              background: "#1F1F1F",
              color: "#E0E0E0",
            },
          }}
        />
      </motion.div>
    </div>
  );
}
