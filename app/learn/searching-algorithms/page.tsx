"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { Toaster, toast } from "sonner";

///////////////////////////////initialize all sorting algorithms for dropdown////////////////////
const searchingOptions = [
    "Linear Search",
    "Sentinel Linear Search",
    "Binary Search",
    "Meta Binary Search",
    "Ternary Search",
    "Jump Search",
    "Interpolation Search",
    "Exponential Search",
    "Fibonacci Search",
    "The Ubiquitous Binary Search",
    "Two Pointers Technique",
];

/////////////////////////////////////speed declaration///////////////////////////////////////////
const speedOptions = [
    { label: "Slow", value: 2000 },
    { label: "Medium", value: 1000 },
    { label: "Fast", value: 500 },
    { label: "Instant", value: 0 },
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

export default function SearchingAlgorithms() {
    //////////////////////////////////////adding states for functionality///////////////////////////
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Linear Search");
    const [arrayInput, setArrayInput] = useState<string>("");
    const [searchKey, setSearchKey] = useState<string>("");
    const [array, setArray] = useState<number[]>([]);
    const [originalArray, setOriginalArray] = useState<number[]>([]);
    const [searching, setSearching] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [foundIndex, setFoundIndex] = useState<number | null>(null);
    const [stepCount, setStepCount] = useState(0);
    const [speed, setSpeed] = useState(speedOptions[1].value);
    const speedRef = useRef(speed);
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
    const codeBlockRef = useRef<HTMLPreElement | null>(null);
    const isPausedRef = useRef(false);
    const isStoppedRef = useRef(false);

    /////////////////////////////////adding states for each algorithm////////////////////////////////////
    const [linearSearchState, setLinearSearchState] = useState({ index: 0, stepCount: 0 });
    const [sentinelLinearSearchState, setSentinelLinearSearchState] = useState({ index: 0, stepCount: 0 });
    const [binarySearchState, setBinarySearchState] = useState({ low: 0, high: 0, stepCount: 0 });
    const [metaBinarySearchState, setMetaBinarySearchState] = useState({
        low: 0,
        high: 0,
        stepCount: 0,
    });
    const [ternarySearchState, setTernarySearchState] = useState({
        low: 0,
        high: 0,
        stepCount: 0,
    });
    const [jumpSearchState, setJumpSearchState] = useState({
        stepCount: 0,
        prev: 0,
        step: 0,
    });
    const [interpolationSearchState, setInterpolationSearchState] = useState({
        low: 0,
        high: 0,
        stepCount: 0,
    });
    const [exponentialSearchState, setExponentialSearchState] = useState({
        bound: 0,
        stepCount: 0,
    });
    const [fibonacciSearchState, setFibonacciSearchState] = useState({
        fibM2: 0, // (m-2)'th Fibonacci number
        fibM1: 1, // (m-1)'th Fibonacci number
        fibM: 1,  // m'th Fibonacci number
        offset: -1, // Offset for the current search range
        stepCount: 0,
    });
    // State for Ubiquitous Binary Search
    const [ubiquitousBinarySearchState, setUbiquitousBinarySearchState] = useState({
        low: 0,        // Lower bound of the search range
        high: 0,      // Upper bound of the search range
        stepCount: 0, // Step counter to track number of steps
    });
    // State for Two Pointers Technique
    const [twoPointersTechniqueState, setTwoPointersTechniqueState] = useState({
        left: 0,       // Left pointer
        right: 0,      // Right pointer
        stepCount: 0,  // Step counter to track number of steps
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
                    `/searching-algorithms/${selectedAlgorithm
                        .toLowerCase()
                        .replace(/\s+/g, "")}/info.json`
                );
                if (response.ok) {
                    const data = await response.json();
                    setAdvantages(data.advantages);
                    setDisadvantages(data.disadvantages);

                    const imageResponse = await fetch(
                        `/searching-algorithms/${selectedAlgorithm
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
                            `/searching-algorithms/${selectedAlgorithm
                                .toLowerCase()
                                .replace(/\s+/g, "")}/code.${lang}`
                        );
                        if (codeResponse.ok) {
                            const codeText = await codeResponse.text();
                            codeData[lang as keyof CodeFiles] = codeText;
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
            hljs.highlightElement(codeBlockRef.current);
        }
    }, [codeFiles, selectedLanguage]);

    const copyToClipboard = () => {
        const code = codeFiles[selectedLanguage as keyof CodeFiles];
        if (code) {
            navigator.clipboard.writeText(code).then(() => {
                toast("Code copied to clipboard!");
            });
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
    };

    const handleArrayInput = (input: string) => {
        const numbers = input.split(",").map((num) => parseFloat(num.trim()));
        setArray(numbers);
        setOriginalArray(numbers);
        setSearching(false);
        setCurrentIndex(null);
        setFoundIndex(null);
    };

    const handleSearchKeyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(e.target.value);
    };

    useEffect(() => {
        handleArrayInput(arrayInput); // Automatically update array when input changes
    }, [arrayInput]);

    const handleVisualizeSearching = () => {
        setStepCount(0);
        setLinearSearchState({ index: 0, stepCount: 0 });
        setSentinelLinearSearchState({ index: 0, stepCount: 0 });
        setBinarySearchState({ low: 0, high: 0, stepCount: 0 });
        setMetaBinarySearchState({
            low: 0,
            high: 0,
            stepCount: 0,
        });
        setTernarySearchState({
            low: 0,
            high: 0,
            stepCount: 0,
        });
        setJumpSearchState({
            stepCount: 0,
            prev: 0,
            step: 0,
        });
        setInterpolationSearchState({
            low: 0,
            high: 0,
            stepCount: 0,
        });
        setExponentialSearchState({
            bound: 0,
            stepCount: 0,
        });
        setFibonacciSearchState({
            fibM2: 0,
            fibM1: 1,
            fibM: 1,
            offset: -1,
            stepCount: 0,
        });
        setUbiquitousBinarySearchState({
            low: 0,
            high: 0,
            stepCount: 0,
        });
        setTwoPointersTechniqueState({
            left: 0,
            right: 0,
            stepCount: 0,
        });

        setFoundIndex(null);
        const parsedKey = parseFloat(searchKey);
        if (isNaN(parsedKey)) {
            toast.error("Please enter a valid number");
            return;
        }
        setSearching(true);
        isStoppedRef.current = false;
        isPausedRef.current = false;
    };

    const playSearching = () => {
        isPausedRef.current = false;
        if (isStoppedRef.current) {
            handleArrayInput(arrayInput);
            setSearching(true);
            isStoppedRef.current = false;
        } else if (!searching) {
            setSearching(true);
        }
    };

    const pauseSearching = () => {
        isPausedRef.current = true;
        setSearching(false);
    };

    const stopSearching = () => {
        isStoppedRef.current = true;
        setSearching(false);
        setArray(originalArray);
        setCurrentIndex(null);
        setFoundIndex(null);
    };

    //////////////////handle change of algorithm////////////////////
    useEffect(() => {
        const search = async () => {
            if (!searching || isStoppedRef.current) return;

            const parsedKey = parseFloat(searchKey);
            if (isNaN(parsedKey)) {
                toast.error("Please enter a valid number for the search key");
                setSearching(false);
                return;
            }

            switch (selectedAlgorithm) {
                case "Linear Search":
                    await linearSearch(array, parsedKey);
                    break;
                case "Sentinel Linear Search":
                    await sentinelLinearSearch(array, parsedKey);
                    break;
                case "Binary Search":
                    await binarySearch(array, parsedKey);
                    break;
                case "Meta Binary Search":
                    await metaBinarySearch(array, parsedKey);
                    break;
                case "Ternary Search":
                    await ternarySearch(array, parsedKey);
                    break;
                case "Jump Search":
                    await jumpSearch(array, parsedKey);
                    break;
                case "Interpolation Search":
                    await interpolationSearch(array, parsedKey);
                    break;
                case "Exponential Search":
                    await exponentialSearch(array, parsedKey);
                    break;
                case "Fibonacci Search":
                    await fibonacciSearch(array, parsedKey);
                    break;
                case "The Ubiquitous Binary Search":
                    await ubiquitousBinarySearch(array, parsedKey);
                    break;
                case "Two Pointers Technique":
                    await twoPointersTechnique(array, parsedKey);
                    break;
                default:
                    break;
            }
        };

        search();
    }, [searching, selectedAlgorithm]);

    //////////////////////////////////////// Linear Search //////////////////////////////////////////////
    const linearSearch = async (array: number[], key: number | null) => {
        if (key === null) return;

        let { index } = linearSearchState; // Destructure index from state

        while (index < array.length) {
            if (isPausedRef.current || isStoppedRef.current) {
                setLinearSearchState({ index, stepCount: linearSearchState.stepCount }); // Save state on pause
                return; // Exit if paused or stopped
            }

            setCurrentIndex(index); // Update the current index to visualize
            setStepCount((prevCount) => prevCount + 1); // Increment step count
            await delay(speedRef.current); // Wait based on the speed setting

            if (array[index] === key) {
                setFoundIndex(index); // If found, update found index
                break; // Exit loop if the key is found
            }

            index++; // Move to the next index
        }

        // Update state to indicate search completion
        setLinearSearchState({ index: 0, stepCount: 0 }); // Reset state
        setSearching(false); // Set searching to false after the search completes
    };

    //////////////////////////////////////// Sentinel Linear Search //////////////////////////////////////////////
    const sentinelLinearSearch = async (array: number[], key: number | null) => {
        if (key === null) return;

        let { index } = sentinelLinearSearchState;

        // Add the sentinel at the end of the array
        const last = array[array.length - 1];
        array[array.length - 1] = key;

        while (array[index] !== key) {
            if (isPausedRef.current || isStoppedRef.current) {
                setSentinelLinearSearchState({ index, stepCount: sentinelLinearSearchState.stepCount });
                return;
            }

            setCurrentIndex(index);
            setStepCount((prevCount) => prevCount + 1);
            await delay(speedRef.current);

            index++;
        }

        array[array.length - 1] = last; // Restore the last element

        // Check if the element was found
        if (index < array.length - 1 || last === key) {
            setFoundIndex(index);
        }

        setSentinelLinearSearchState({ index: 0, stepCount: 0 });
        setSearching(false);
    };

    //////////////////////////////////////// Binary Search //////////////////////////////////////////////
    const binarySearch = async (array: number[], key: number | null) => {
        if (key === null) return;

        let { low, high } = binarySearchState;
        low = 0;
        high = array.length - 1;

        while (low <= high) {
            if (isPausedRef.current || isStoppedRef.current) {
                setBinarySearchState({ low, high, stepCount: binarySearchState.stepCount });
                return;
            }

            const mid = Math.floor((low + high) / 2);
            setCurrentIndex(mid);
            setStepCount((prevCount) => prevCount + 1);
            await delay(speedRef.current);

            if (array[mid] === key) {
                setFoundIndex(mid);
                break;
            } else if (array[mid] < key) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        setBinarySearchState({ low: 0, high: array.length - 1, stepCount: 0 });
        setSearching(false);
    };

    //////////////////////////////////////// Meta Binary Search //////////////////////////////////////////////
    const metaBinarySearch = async (array: number[], key: number | null) => {
        if (key === null) return;

        let { low, high, stepCount } = metaBinarySearchState; // Destructure the state

        // Initialize low and high for the first run if not set yet
        if (low === 0 && high === 0) {
            low = 0;
            high = array.length - 1;
        }

        while (low <= high) {
            if (isPausedRef.current || isStoppedRef.current) {
                setMetaBinarySearchState({ low, high, stepCount }); // Save state on pause/stop
                return;
            }

            const mid = low + ((high - low) >> 1); // Bit-shift for dividing by 2 (optimized)
            setCurrentIndex(mid); // Visualize the current index
            setStepCount(stepCount + 1);
            await delay(speedRef.current); // Control the speed

            if (array[mid] === key) {
                setFoundIndex(mid);
                break;
            } else if (array[mid] < key) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }

            stepCount++;
        }

        // Reset state after search completes or if the element isn't found
        setMetaBinarySearchState({ low: 0, high: array.length - 1, stepCount: 0 });
        setSearching(false);
    };

    //////////////////////////////////////// Ternary Search //////////////////////////////////////////////
    const ternarySearch = async (array: number[], key: number | null) => {
        if (key === null) return;

        let { low, high, stepCount } = ternarySearchState; // Destructure the state

        // Initialize low and high for the first run if not set yet
        if (low === 0 && high === 0) {
            low = 0;
            high = array.length - 1;
        }

        while (low <= high) {
            if (isPausedRef.current || isStoppedRef.current) {
                setTernarySearchState({ low, high, stepCount }); // Save state on pause/stop
                return;
            }

            // Divide the array into three parts
            const mid1 = low + Math.floor((high - low) / 3);
            const mid2 = high - Math.floor((high - low) / 3);

            // Visualize mid1
            setCurrentIndex(mid1);
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            // Check if the key is at mid1
            if (array[mid1] === key) {
                setFoundIndex(mid1);
                break;
            }

            // Visualize mid2
            setCurrentIndex(mid2);
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            // Check if the key is at mid2
            if (array[mid2] === key) {
                setFoundIndex(mid2);
                break;
            }

            // If the key is smaller than mid1, search the left third
            if (key < array[mid1]) {
                high = mid1 - 1;
            }
            // If the key is greater than mid2, search the right third
            else if (key > array[mid2]) {
                low = mid2 + 1;
            }
            // Otherwise, search the middle third
            else {
                low = mid1 + 1;
                high = mid2 - 1;
            }

            stepCount++;
        }

        // Reset state after search completes or if the element isn't found
        setTernarySearchState({ low: 0, high: array.length - 1, stepCount: 0 });
        setSearching(false);
    };
    //////////////////////////////////////// Jump Search //////////////////////////////////////////////
    const jumpSearch = async (array: number[], key: number | null) => {
        if (key === null) return;
    
        const length = array.length;
        const { stepCount, prev, step } = jumpSearchState;
    
        // Initialize the step and prev if not already set
        let currentStep = step;
        let currentPrev = prev;
    
        if (currentStep === 0 && currentPrev === 0) {
            currentStep = Math.floor(Math.sqrt(length)); // Jump size is sqrt of array length
            currentPrev = 0;
        }
    
        while (currentPrev < length) {
            if (isPausedRef.current || isStoppedRef.current) {
                setJumpSearchState({ stepCount, prev: currentPrev, step: currentStep });
                return;
            }
    
            setCurrentIndex(Math.min(currentStep, length) - 1); // Visualize the current block's last element
            setStepCount(stepCount + 1);
            await delay(speedRef.current);
    
            if (array[Math.min(currentStep, length) - 1] >= key) {
                // Perform linear search within the identified block
                for (let i = currentPrev; i < Math.min(currentStep, length); i++) {
                    if (isPausedRef.current || isStoppedRef.current) {
                        setJumpSearchState({ stepCount, prev: currentPrev, step: currentStep });
                        return;
                    }
    
                    setCurrentIndex(i);
                    setStepCount(stepCount + 1);
                    await delay(speedRef.current);
    
                    if (array[i] === key) {
                        setFoundIndex(i);
                        break;
                    }
                }
                break;
            }
    
            currentPrev = currentStep;
            currentStep += Math.floor(Math.sqrt(length));
        }
    
        // Reset state after search completes
        setJumpSearchState({ stepCount: 0, prev: 0, step: 0 });
        setSearching(false);
    };
    
    //////////////////////////////////////// Interpolation Search //////////////////////////////////////////////
    const interpolationSearch = async (array: number[], key: number | null) => {
        if (key === null || array.length === 0) return;

        let { low, high, stepCount } = interpolationSearchState;

        // Initialize low and high for the first run if not set yet
        if (low === 0 && high === 0) {
            low = 0;
            high = array.length - 1;
        }

        while (low <= high && key >= array[low] && key <= array[high]) {
            if (isPausedRef.current || isStoppedRef.current) {
                setInterpolationSearchState({ low, high, stepCount }); // Save state on pause/stop
                return;
            }

            // Estimate the position using interpolation formula
            const pos: number = low + Math.floor(((high - low) / (array[high] - array[low])) * (key - array[low]));

            // Visualize the current position
            setCurrentIndex(pos);
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            if (array[pos] === key) {
                setFoundIndex(pos);
                break;
            }

            if (array[pos] < key) {
                low = pos + 1;
            } else {
                high = pos - 1;
            }

            stepCount++;
        }

        // Reset state after search completes
        setInterpolationSearchState({ low: 0, high: array.length - 1, stepCount: 0 });
        setSearching(false);
    };

    //////////////////////////////////////// Exponential Search //////////////////////////////////////////////
    const exponentialSearch = async (array: number[], key: number | null) => {
        if (key === null || array.length === 0) return;

        let { bound, stepCount } = exponentialSearchState; // Destructure state

        if (bound === 0) bound = 1; // Start with bound = 1 if not already set

        // Find the range by exponentially increasing the bound
        while (bound < array.length && array[bound] < key) {
            if (isPausedRef.current || isStoppedRef.current) {
                setExponentialSearchState({ bound, stepCount }); // Save state on pause/stop
                return;
            }

            setCurrentIndex(bound); // Visualize current bound
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            bound *= 2; // Double the bound
        }

        // Perform Binary Search in the found range
        let low = Math.floor(bound / 2);
        let high = Math.min(bound, array.length - 1);

        while (low <= high) {
            if (isPausedRef.current || isStoppedRef.current) {
                setExponentialSearchState({ bound, stepCount }); // Save state on pause/stop
                return;
            }

            const mid = low + Math.floor((high - low) / 2);
            setCurrentIndex(mid); // Visualize the current mid
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            if (array[mid] === key) {
                setFoundIndex(mid);
                break;
            } else if (array[mid] < key) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }

            stepCount++;
        }

        // Reset state after search completes
        setExponentialSearchState({ bound: 0, stepCount: 0 });
        setSearching(false);
    };

    //////////////////////////////////////// Fibonacci Search //////////////////////////////////////////////
    const fibonacciSearch = async (array: number[], key: number | null) => {
        if (key === null || array.length === 0) return;

        let { fibM2, fibM1, fibM, offset, stepCount } = fibonacciSearchState; // Destructure state

        // Initialize Fibonacci numbers if not already set
        if (fibM === 0) {
            fibM2 = 0; // (m-2)'th Fibonacci number
            fibM1 = 1; // (m-1)'th Fibonacci number
            fibM = fibM2 + fibM1; // m'th Fibonacci number
        }

        // Find the smallest Fibonacci number greater than or equal to array.length
        while (fibM < array.length) {
            if (isPausedRef.current || isStoppedRef.current) {
                setFibonacciSearchState({ fibM2, fibM1, fibM, offset, stepCount }); // Save state on pause/stop
                return;
            }

            fibM2 = fibM1;
            fibM1 = fibM;
            fibM = fibM2 + fibM1;
        }

        while (fibM > 1) {
            if (isPausedRef.current || isStoppedRef.current) {
                setFibonacciSearchState({ fibM2, fibM1, fibM, offset, stepCount }); // Save state on pause/stop
                return;
            }

            const i = Math.min(offset + fibM2, array.length - 1);
            setCurrentIndex(i); // Visualize the current index
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            if (array[i] === key) {
                setFoundIndex(i);
                break;
            } else if (array[i] < key) {
                fibM = fibM1;
                fibM1 = fibM2;
                fibM2 = fibM - fibM1;
                offset = i;
            } else {
                fibM = fibM2;
                fibM1 -= fibM2;
                fibM2 = fibM - fibM1;
            }

            stepCount++;
        }

        // Check if the last element is the key
        if (fibM1 && array[offset + 1] === key) {
            setFoundIndex(offset + 1);
        }

        // Reset state after search completes
        setFibonacciSearchState({
            fibM2: 0,
            fibM1: 1,
            fibM: 1,
            offset: -1,
            stepCount: 0,
        });
        setSearching(false);
    };
    //////////////////////////////////////// Ubiquitous Binary Search //////////////////////////////////////////////
    const ubiquitousBinarySearch = async (array: number[], key: number | null) => {
        if (key === null || array.length === 0) return;

        let { low, high, stepCount } = ubiquitousBinarySearchState;

        // Initialize low and high for the first run if not set yet
        if (low === 0 && high === 0) {
            low = 0;
            high = array.length - 1;
        }

        while (low <= high) {
            if (isPausedRef.current || isStoppedRef.current) {
                setUbiquitousBinarySearchState({ low, high, stepCount }); // Save state on pause/stop
                return;
            }

            const mid = Math.floor((low + high) / 2);
            setCurrentIndex(mid); // Highlight the mid index
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            if (array[mid] === key) {
                setFoundIndex(mid);
                break;
            } else if (array[mid] < key) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }

            stepCount++;
        }

        // Reset state after search completes
        setUbiquitousBinarySearchState({ low: 0, high: array.length - 1, stepCount: 0 });
        setSearching(false);
    };
    //////////////////////////////////////// Two Pointers Technique //////////////////////////////////////////////
    const twoPointersTechnique = async (array: number[], key: number | null) => {
        if (key === null || array.length === 0) return;

        let { left, right, stepCount } = twoPointersTechniqueState;

        // Initialize left and right pointers for the first run if not set yet
        if (left === 0 && right === 0) {
            left = 0;
            right = array.length - 1;
        }

        while (left <= right) {
            if (isPausedRef.current || isStoppedRef.current) {
                setTwoPointersTechniqueState({ left, right, stepCount }); // Save state on pause/stop
                return;
            }

            setCurrentIndex(left); // Highlight the left pointer
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            if (array[left] === key) {
                setFoundIndex(left);
                break;
            }

            setCurrentIndex(right); // Highlight the right pointer
            setStepCount(stepCount + 1);
            await delay(speedRef.current);

            if (array[right] === key) {
                setFoundIndex(right);
                break;
            }

            left++;
            right--;
            stepCount++;
        }

        // Reset state after search completes
        setTwoPointersTechniqueState({ left: 0, right: array.length - 1, stepCount: 0 });
        setSearching(false);
    };

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212] text-[#E0E0E0]">
            {/* Left Pane: Fixed Size */}
            <motion.div
                className="lg:w-1/4 w-full p-6 bg-[#1F1F1F] shadow-lg border-b lg:border-b-0 lg:border-r border-gray-700 lg:sticky lg:top-0 lg:h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h2 className="text-2xl font-bold mb-6 text-[#F5F5F5]">Searching Algorithms</h2>

                <div className="space-y-6">
                    {/* Algorithm Selection */}
                    <div>
                        <label className="block mb-2 text-sm text-[#F5F5F5]">Select Searching Algorithm:</label>
                        <select
                            className="w-full p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                            value={selectedAlgorithm}
                            onChange={(e) => setSelectedAlgorithm(e.target.value)}
                        >
                            {searchingOptions.map((algorithm) => (
                                <option key={algorithm} value={algorithm}>{algorithm}</option>
                            ))}
                        </select>
                    </div>

                    {/* Speed Selection */}
                    <div>
                        <label className="block mb-2 text-sm text-[#F5F5F5]">Select Searching Speed:</label>
                        <select
                            className="w-full p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        >
                            {speedOptions.map((option) => (
                                <option key={option.label} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

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

                    {/* Search Key */}
                    <div>
                        <h3 className="text-lg font-semibold text-[#F5F5F5]">Search Key</h3>
                        <input
                            type="text"
                            value={searchKey ?? ""}
                            onChange={handleSearchKeyInput}
                            placeholder="Enter key to search"
                            className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                        />
                    </div>

                    {/* Visualize Button */}
                    <button
                        onClick={handleVisualizeSearching}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition duration-300 ease-in-out disabled:bg-[#383838]"
                        disabled={searching}
                    >
                        Visualize Searching
                    </button>
                    <button
                        onClick={stopSearching}
                        className="w-full py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md transition duration-300 ease-in-out"
                    >
                        Stop
                    </button>
                    <button
                        onClick={isPausedRef.current ? playSearching : pauseSearching}
                        className={`w-full py-2 px-4 text-white rounded-md transition duration-300 ease-in-out ${isPausedRef.current ? "bg-yellow-600 hover:bg-yellow-500" : "bg-green-600 hover:bg-green-500"}`}
                    >
                        {isPausedRef.current ? "Resume" : "Pause"}
                    </button>
                </div>
            </motion.div>
            <motion.div
                className="w-full lg:w-3/4 p-6 bg-[#121212] overflow-y-auto rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col items-start justify-center bg-[#1F1F1F] p-4 sm:p-8 rounded-lg">
                    {array.length > 0 ? (
                        <div className="text-left w-full">
                            <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#F5F5F5]">{selectedAlgorithm} Visualization</h2>
                            <p className="text-base sm:text-lg text-[#F5F5F5] mb-4">Steps: {stepCount}</p>
                            <div className="flex justify-center mb-4">
                                {array.map((num, index) => {
                                    const isCurrentIndex = currentIndex === index;
                                    const isFoundIndex = foundIndex === index;
                                    return (
                                        <motion.div
                                            key={index}
                                            className={`${isFoundIndex ? "bg-green-500" : isCurrentIndex ? "bg-orange-500" : "bg-red-600"} text-white text-base sm:text-xl p-2 sm:p-4 rounded-md mx-1`}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            {num}
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Additional UI elements such as advantages and disadvantages */}
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
                        <h3 className="text-base sm:text-lg text-[#E0E0E0]">Enter an array and key to visualize the searching algorithm.</h3>
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