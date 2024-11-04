"use client";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
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
                    linearSearch(array, parsedKey);
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