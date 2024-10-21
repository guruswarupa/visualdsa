"use client";

import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const bucketColors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A1", "#33FFF3"];

export default function SortingAlgorithms() {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
    const [arrayInput, setArrayInput] = useState<string>("");
    const [array, setArray] = useState<number[]>([]);
    const [originalArray, setOriginalArray] = useState<number[]>([]);
    const [sorting, setSorting] = useState(false);
    const [currentPair, setCurrentPair] = useState<[number, number] | null>(null);
    const [sortedIndex, setSortedIndex] = useState<number[]>([]);

    const handleArrayInput = () => {
        const numbers = arrayInput.split(",").map(Number);
        setArray(numbers);
        setOriginalArray(numbers); // Store original array
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
                default:
                    break;
            }
        }
    }, [sorting, selectedAlgorithm, array]);

    const bubbleSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setCurrentPair([j, j + 1]);
                await delay(1000); // Slow down the sorting

                if (newArr[j] > newArr[j + 1]) {
                    // Swap elements
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    setArray([...newArr]);
                }
            }
            setSortedIndex((prev) => [...prev, n - i - 1]); // Mark last sorted element
            await delay(500); // Small delay after each pass
        }
        setSortedIndex((prev) => [...prev, 0]); // Mark the final element as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    const insertionSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;
        for (let i = 1; i < n; i++) {
            const key = newArr[i];
            let j = i - 1;
    
            while (j >= 0 && newArr[j] > key) {
                setCurrentPair([j, j + 1]);
                await delay(1000); // Slow down the sorting
    
                newArr[j + 1] = newArr[j];
                j = j - 1;
                setArray([...newArr]);
            }
            newArr[j + 1] = key;
            setArray([...newArr]);
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
    
    const selectionSort = async (arr: number[]) => {
        const newArr = [...arr];
        const n = newArr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                setCurrentPair([minIndex, j]);
                await delay(1000); // Slow down the sorting

                if (newArr[j] < newArr[minIndex]) {
                    minIndex = j;
                }
            }
            // Swap the found minimum element with the first element
            if (minIndex !== i) {
                [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
                setArray([...newArr]);
            }
            setSortedIndex((prev) => [...prev, i]); // Mark element as sorted
            await delay(500);
        }
        setSortedIndex((prev) => [...prev, n - 1]); // Mark the final element as sorted
        setCurrentPair(null);
        setSorting(false);
    };

    const bingoSort = async (arr: number[]) => {
        const newArr = [...arr];
        const max = Math.max(...newArr);
        const sorted: boolean[] = Array(max + 1).fill(false);
    
        // Mark each number in the sorted array
        for (const num of newArr) {
            sorted[num] = true;
        }
    
        // Collect sorted numbers
        const result: number[] = [];
        for (let i = 0; i < sorted.length; i++) {
            if (sorted[i]) {
                result.push(i);
                setArray([...result]);
                setCurrentPair([result.length - 1, i]);
                await delay(1000); // Slow down the visualization
            }
        }
    
        setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };
        
    const bucketSort = async (arr: number[]) => {
        const newArr = [...arr];
        const max = Math.max(...newArr);
        const min = Math.min(...newArr);
        const bucketCount = Math.floor(max - min) + 1;
        const buckets: number[][] = Array.from({ length: bucketCount }, () => []);
    
        // Fill the buckets
        newArr.forEach(num => {
            buckets[num - min].push(num);
        });

        const result: number[] = []; // Store the sorted result
        // Sort individual buckets and collect numbers
        for (let i = 0; i < buckets.length; i++) {
            const bucket = buckets[i];
            if (bucket.length > 0) {
                bucket.sort((a, b) => a - b);
                for (const num of bucket) {
                    result.push(num); // Add to the result array
                    setArray([...result]); // Update the displayed array
                    setCurrentPair([bucket.indexOf(num), num]);
                    await delay(1000);
                }
            }
        }
    
        setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };
    
    const countingSort = async (arr: number[]) => {
        const newArr = [...arr];
        const max = Math.max(...newArr);
        const count: number[] = Array(max + 1).fill(0);
        const result: number[] = [];
    
        // Count each number's occurrences
        for (const num of newArr) {
            count[num]++;
        }
    
        // Build the sorted array
        for (let i = 0; i < count.length; i++) {
            while (count[i] > 0) {
                result.push(i);
                setArray([...result]);
                setCurrentPair([result.length - 1, i]);
                await delay(1000); // Slow down the visualization
                count[i]--;
            }
        }
    
        setSortedIndex([...Array(result.length).keys()]); // Mark all as sorted
        setCurrentPair(null);
        setSorting(false);
    };    

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    return (
        <div className="flex min-h-screen bg-[#121212] text-[#E0E0E0]">
            <motion.div
                className="w-full sm:w-1/4 p-6 bg-[#1F1F1F] border-r border-gray-700"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <h2 className="text-2xl font-bold mb-4 text-[#F5F5F5]">Sorting Algorithms</h2>
    
                <select
                    className="w-full mb-4 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                    value={selectedAlgorithm}
                    onChange={(e) => setSelectedAlgorithm(e.target.value)}
                >
                    <option value="Bubble Sort">Bubble Sort</option>
                    <option value="Insertion Sort">Insertion Sort</option>
                    <option value="Selection Sort">Selection Sort</option>
                    <option value="Bingo Sort">Bingo Sort</option>
                    <option value="Bucket Sort">Bucket Sort</option>
                    <option value="Counting Sort">Counting Sort</option>
                </select>
    
                <h3 className="text-lg font-semibold mb-2">Input Array</h3>
                <input
                    type="text"
                    value={arrayInput}
                    onChange={(e) => setArrayInput(e.target.value)}
                    placeholder="Enter numbers separated by commas"
                    className="w-full mb-4 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                />
                <button
                    onClick={() => {
                        handleArrayInput();
                        setSorting(true);
                    }}
                    className="bg-[#E62B1E] hover:bg-[#C6261A] text-white py-2 px-4 rounded-md transition"
                    disabled={sorting}
                >
                    Visualize Sorting
                </button>
            </motion.div>
    
            <motion.div
                className="w-full sm:w-3/4 p-6 bg-[#121212] flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#1F1F1F] p-8 rounded-lg">
                    {array.length > 0 ? (
                        <div className="text-center w-full">
                            <h2 className="text-xl font-bold mb-4 text-[#F5F5F5]">
                                {selectedAlgorithm} Visualization
                            </h2>
                            <div className="flex flex-col items-center">
                                <div className="flex justify-center mb-4">
                                    {/* Display original array */}
                                    {originalArray.map((num, index) => (
                                        <motion.div
                                            key={`original-${index}`}
                                            className={`bg-blue-600 text-white text-xl p-4 rounded-md mx-1`}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            {num}
                                        </motion.div>
                                    ))}
                                </div>
    
                                <div className="flex justify-center">
                                    {/* Display sorted array */}
                                    {array.map((num, index) => (
                                        <motion.div
                                            key={index}
                                            className={`${sortedIndex.includes(index) ? "bg-green-500" : "bg-red-600"}
                                            text-white text-xl p-4 rounded-md mx-1 relative`}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            {num}
                                            {currentPair && (currentPair[0] === index || currentPair[1] === index) && (
                                                <motion.div
                                                    className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <ArrowUpIcon className="w-6 h-6 text-white" />
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
    
                            {/* Display buckets only for Bucket Sort */}
                            {selectedAlgorithm === "Bucket Sort" && (
                                <>
                                    <h2 className="text-xl font-bold mt-4 text-[#F5F5F5]">Buckets</h2>
                                    <div className="flex justify-center">
                                        {array.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                {array.map((num, index) => (
                                                    <div key={`bucket-${index}`} className="flex items-center justify-center">
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
                        </div>
                    ) : (
                        <h3 className="text-lg text-[#E0E0E0]">Enter an array to visualize the sorting algorithm.</h3>
                    )}
                </div>
            </motion.div>
        </div>
    );    
}    