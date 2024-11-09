"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { FaArrowUp, FaArrowDown, FaEye, FaTrash, FaInfoCircle, FaSearch } from "react-icons/fa";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // You can choose any theme

const queueOptions = [
    "Simple Queue",
    "Parallel Queue",
    "Circular Queue",
    "Double Ended Queue",
    "Double Ended Priority Queue",
    "Input Resisted Queue",
    "Multi Queue",
    "Output Restricted Queue",
    "Priority Queue",
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

export default function QueueVisualization() {
    const [queueInput, setQueueInput] = useState<string>("");
    const [queue, setQueue] = useState<number[]>([]);
    const [searchValue, setSearchValue] = useState<number | string>("");
    const [operationMessage, setOperationMessage] = useState<string>("");

    const [selectedDataStructure, setSelectedDataStructure] = useState("Simple Queue");
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
    const codeBlockRef = useRef<HTMLElement | null>(null);

    ////////////////load the website with all the data required/////////////////
    useEffect(() => {
        const fetchDSData = async () => {
            try {
                const response = await fetch(
                    `/queue/${selectedDataStructure
                        .toLowerCase()
                        .replace(/\s+/g, "")}/info.json`
                );
                if (response.ok) {
                    const data = await response.json();
                    setAdvantages(data.advantages);
                    setDisadvantages(data.disadvantages);

                    const imageResponse = await fetch(
                        `/queue/${selectedDataStructure
                            .toLowerCase()
                            .replace(/\s+/g, "")}/${selectedDataStructure
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
                            `/queue/${selectedDataStructure
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

        fetchDSData();
    }, [selectedDataStructure]);

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

    const performOperation = (operation: string) => {
        switch (operation) {
            case "Enqueue":
                if (queueInput) {
                    const numbersToEnqueue = queueInput
                    .split(/\s+/)
                    .filter(num => num) // Remove empty strings
                    .map(num => parseFloat(num.trim()));
                    const newQueue = [...queue, ...numbersToEnqueue];
                    setQueue(newQueue);
                    setOperationMessage(`Enqueued: ${numbersToEnqueue.join(", ")}`);
                    setQueueInput("");
                }
                break;

            case "Dequeue":
                if (queue.length > 0) {
                    const dequeuedValue = queue[0];
                    const newQueue = queue.slice(1);
                    setQueue(newQueue);
                    setOperationMessage(`Dequeued: ${dequeuedValue}`);
                } else {
                    setOperationMessage("Queue is empty");
                }
                break;

            case "Peek":
                if (queue.length > 0) {
                    const frontValue = queue[0];
                    setOperationMessage(`Front value is: ${frontValue}`);
                } else {
                    setOperationMessage("Queue is empty");
                }
                break;

            case "Clear":
                setQueue([]);
                setOperationMessage("Queue cleared");
                break;

            case "IsEmpty":
                setOperationMessage(queue.length === 0 ? "Queue is empty" : "Queue is not empty");
                break;

            case "Size":
                setOperationMessage(`Queue size is: ${queue.length}`);
                break;

            case "Contains":
                const numToSearch = Number(searchValue);
                setOperationMessage(queue.includes(numToSearch) ? `Queue contains: ${numToSearch}` : `Queue does not contain: ${numToSearch}`);
                break;

            default:
                break;
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212] text-[#E0E0E0]">
            <motion.div
                className="lg:w-1/4 w-full p-6 bg-[#1F1F1F] shadow-lg border-b lg:border-b-0 lg:border-r border-gray-700 lg:sticky lg:top-0 lg:h-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <h2 className="text-2xl font-bold mb-6 text-[#F5F5F5]">Queue Operations</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-[#F5F5F5]">Input Queue (for enqueue):</h3>
                        <input
                            type="text"
                            value={queueInput}
                            onChange={(e) => setQueueInput(e.target.value)}
                            placeholder="Enter numbers separated by space"
                            className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-3">
                        {["Enqueue", "Dequeue", "Peek", "Clear", "IsEmpty", "Size"].map((operation) => (
                            <button
                                key={operation}
                                onClick={() => performOperation(operation)}
                                className={`flex items-center justify-center w-full py-2 px-4 
            ${operation === "Enqueue" ? "bg-blue-600 hover:bg-blue-500" : ""}
            ${operation === "Dequeue" ? "bg-red-600 hover:bg-red-500" : ""}
            ${operation === "Peek" ? "bg-green-600 hover:bg-green-500" : ""}
            ${operation === "Clear" ? "bg-gray-600 hover:bg-gray-500" : ""}
            ${operation === "IsEmpty" ? "bg-yellow-600 hover:bg-yellow-500" : ""}
            ${operation === "Size" ? "bg-purple-600 hover:bg-purple-500" : ""}
            text-white rounded-md transition duration-200 ease-in-out shadow-md`}
                            >
                                {operation === "Enqueue" && <FaArrowUp className="mr-2" />}
                                {operation === "Dequeue" && <FaArrowDown className="mr-2" />}
                                {operation === "Peek" && <FaEye className="mr-2" />}
                                {operation === "Clear" && <FaTrash className="mr-2" />}
                                {operation === "IsEmpty" && <FaInfoCircle className="mr-2" />}
                                {operation === "Size" && <FaInfoCircle className="mr-2" />}
                                {operation}
                            </button>
                        ))}

                        <div>
                            <h3 className="text-lg font-semibold text-[#F5F5F5]">Search Value:</h3>
                            <input
                                type="number"
                                value={searchValue}
                                onChange={handleSearchChange}
                                placeholder="Enter a number to search"
                                className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                            />
                        </div>

                        <button
                            onClick={() => performOperation("Contains")}
                            className={`flex items-center justify-center w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 text-white rounded-md transition duration-200 ease-in-out shadow-md`}
                        >
                            <FaSearch className="mr-2" />
                            Contains
                        </button>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="w-full lg:w-3/4 p-6 bg-[#121212] overflow-y-auto rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Centered Queue visualization and operation result */}
                <div className="flex flex-col items-center bg-[#1F1F1F] p-6 sm:p-8 rounded-lg min-h-[300px] w-[100%]">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#F5F5F5]">Queue Visualization</h2>
                    <div className="flex items-center justify-center mb-4">
                        {queue.length > 0 ? (
                            queue.map((num, index) => (
                                <motion.div
                                    key={index}
                                    className={`text-white text-base sm:text-xl p-5 rounded-md mx-2 shadow-lg 
                    ${index === 0 ? 'bg-gradient-to-b from-blue-500 to-blue-700 relative' : ''}  // Front highlight
                    ${index === queue.length - 1 ? 'bg-gradient-to-b from-yellow-500 to-yellow-700 relative' : ''}  // Rear highlight
                    ${index !== 0 && index !== queue.length - 1 ? 'bg-gradient-to-b from-red-500 to-red-700' : ''}  // Default
                `}
                                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {/* Front Arrow */}
                                    {index === 0 && (
                                        <FaArrowUp className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-blue-300 text-xl" />
                                    )}

                                    {/* Rear Arrow */}
                                    {index === queue.length - 1 && (
                                        <FaArrowDown className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-yellow-300 text-xl" />
                                    )}

                                    {num}
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className="text-white text-xl p-5 rounded-md mx-2 shadow-lg bg-gray-700"
                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                Queue is empty
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-md w-full max-w-xl">
                        <h3 className="text-xl font-semibold text-[#F5F5F5]">Operation Result:</h3>
                        <pre className="text-sm text-gray-300 text-center">{operationMessage}</pre>
                    </div>
                </div>

                {/* Left-aligned sections below */}
                <div className="pt-12">
                    <label className="block mb-3 text-md text-[#F5F5F5]">Select Queue Data Structure:</label>
                    <select
                        className="w-full p-3 bg-[#121212] border border-[#383838] text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={selectedDataStructure}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setSelectedDataStructure(selectedValue);
                        }}
                    >
                        {queueOptions.map((algorithm) => (
                            <option key={algorithm} value={algorithm}>
                                {algorithm}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="my-10 p-6 bg-[#1F1F1F] rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-[#F5F5F5]">Advantages</h3>
                    <ul className="list-disc list-inside mb-6 p-2">
                        {advantages.map((adv, index) => (
                            <li key={index} className="text-[#E0E0E0] mb-2">{adv}</li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-semibold mb-4 text-[#F5F5F5]">Disadvantages</h3>
                    <ul className="list-disc list-inside mb-6 p-2">
                        {disadvantages.map((dis, index) => (
                            <li key={index} className="text-[#E0E0E0] mb-2">{dis}</li>
                        ))}
                    </ul>
                </div>

                {/* Algorithm Image */}
                {algorithmImage && (
                    <img
                        src={algorithmImage}
                        alt={`${selectedDataStructure} Illustration`}
                        className="my-6 w-full max-w-lg mx-auto rounded-lg object-contain"
                    />
                )}

                {/* Language Dropdown */}
                <h2 className="mt-12 text-3xl font-bold mb-4 text-[#F5F5F5]">
                    Source Code
                </h2>
                <label htmlFor="languageSelect" className="block mt-4 text-[#F5F5F5]">
                    Select Language:
                </label>
                <select
                    id="languageSelect"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="mt-3 mb-6 p-3 border bg-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                        <pre className="bg-gray-800 p-6 rounded overflow-x-auto">
                            <code
                                ref={codeBlockRef}
                                className={`language-${selectedLanguage}`}
                            >
                                {codeFiles[selectedLanguage as keyof CodeFiles]}
                            </code>
                        </pre>
                        <button
                            onClick={copyToClipboard}
                            className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                            Copy Code
                        </button>
                    </div>
                )}
            </motion.div>
            <Toaster position="bottom-right" />
        </div>
    );
}


