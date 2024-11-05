"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { FaArrowUp, FaArrowDown, FaEye, FaTrash, FaInfoCircle, FaSearch } from "react-icons/fa";
import hljs from "highlight.js";

const stackOptions = [
    "Simple Stack",
    "Parallel Stack",
    "Circular Stack",
    "Double Ended Stack",
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

export default function StackVisualization() {
    const [stackInput, setStackInput] = useState<string>("");
    const [stack, setStack] = useState<number[]>([]);
    const [searchValue, setSearchValue] = useState<number | string>("");
    const [operationMessage, setOperationMessage] = useState<string>("");

    const [selectedDataStructure, setSelectedDataStructure] = useState("Simple Stack");
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
                    `/stack/${selectedDataStructure
                        .toLowerCase()
                        .replace(/\s+/g, "")}/info.json`
                );
                if (response.ok) {
                    const data = await response.json();
                    setAdvantages(data.advantages);
                    setDisadvantages(data.disadvantages);

                    const imageResponse = await fetch(
                        `/stack/${selectedDataStructure
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
                            `/stack/${selectedDataStructure
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
            case "Push":
                if (stackInput) {
                    const numbersToPush = stackInput.split(",").map((num) => parseFloat(num.trim()));
                    const newStack = [...stack];

                    // Removed max size check
                    numbersToPush.forEach(num => {
                        newStack.push(num); // Just push without checking size
                    });

                    setStack(newStack);
                    setOperationMessage(`Pushed: ${numbersToPush.join(", ")}`);
                    setStackInput(""); // Clear the input after pushing
                }
                break;

            case "Pop":
                if (stack.length > 0) {
                    const poppedValue = stack[stack.length - 1];
                    const newStack = stack.slice(0, -1);
                    setStack(newStack);
                    setOperationMessage(`Popped: ${poppedValue}`);
                } else {
                    setOperationMessage("Stack is empty");
                }
                break;

            case "Peek":
                if (stack.length > 0) {
                    const topValue = stack[stack.length - 1];
                    setOperationMessage(`Top value is: ${topValue}`);
                } else {
                    setOperationMessage("Stack is empty");
                }
                break;

            case "Clear":
                setStack([]);
                setOperationMessage("Stack cleared");
                break;

            case "IsEmpty":
                setOperationMessage(stack.length === 0 ? "Stack is empty" : "Stack is not empty");
                break;

            case "Size":
                setOperationMessage(`Stack size is: ${stack.length}`);
                break;

            case "Contains":
                const numToSearch = Number(searchValue);
                setOperationMessage(stack.includes(numToSearch) ? `Stack contains: ${numToSearch}` : `Stack does not contain: ${numToSearch}`);
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
                <h2 className="text-2xl font-bold mb-6 text-[#F5F5F5]">Stack Operations</h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-[#F5F5F5]">Input Stack (for push):</h3>
                        <input
                            type="text"
                            value={stackInput}
                            onChange={(e) => setStackInput(e.target.value)}
                            placeholder="Enter numbers separated by commas"
                            className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                        />
                    </div>

                    <div className="flex flex-col space-y-3">
                        {["Push", "Pop", "Peek", "Clear", "IsEmpty", "Size"].map((operation) => (
                            <button
                                key={operation}
                                onClick={() => performOperation(operation)}
                                className={`flex items-center justify-center w-full py-2 px-4 
            ${operation === "Push" ? "bg-blue-600 hover:bg-blue-500" : ""}
            ${operation === "Pop" ? "bg-red-600 hover:bg-red-500" : ""}
            ${operation === "Peek" ? "bg-green-600 hover:bg-green-500" : ""}
            ${operation === "Clear" ? "bg-gray-600 hover:bg-gray-500" : ""}
            ${operation === "IsEmpty" ? "bg-yellow-600 hover:bg-yellow-500" : ""}
            ${operation === "Size" ? "bg-purple-600 hover:bg-purple-500" : ""}
            text-white rounded-md transition duration-200 ease-in-out shadow-md`}
                            >
                                {operation === "Push" && <FaArrowUp className="mr-2" />}
                                {operation === "Pop" && <FaArrowDown className="mr-2" />}
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
                className="w-full lg:w-3/4 p-6 bg-[#121212] overflow-y-auto rounded-lg shadow-lg flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center justify-center bg-[#1F1F1F] p-4 sm:p-8 rounded-lg min-h-[300px] w-[90%]">
                    <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#F5F5F5]">Stack Visualization</h2>
                    <div className="flex items-center mb-4">
                        {stack.length > 0 ? (
                            stack.map((num, index) => (
                                <motion.div
                                    key={index}
                                    className={`text-white text-base sm:text-xl p-4 rounded-md mx-1 shadow-lg 
                        ${index === stack.length - 1 ? 'bg-gradient-to-b from-yellow-500 to-yellow-700' : 'bg-gradient-to-b from-red-500 to-red-700'}`}
                                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, y: 20 }} // Animation for removal
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    {num}
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                className="text-white text-xl p-4 rounded-md mx-1 shadow-lg bg-gray-700"
                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                Stack is empty
                            </motion.div>
                        )}
                    </div>
                    <div className="bg-gray-800 p-4 rounded-md w-full">
                        <h3 className="text-lg font-semibold text-[#F5F5F5]">Operation Result:</h3>
                        <pre className="text-sm text-gray-300">{operationMessage}</pre>
                    </div>
                    <div className="pt-10">
                        <label className="block mb-2 text-sm text-[#F5F5F5]">
                            Select Stack Data Structure:
                        </label>
                        <select
                            className="w-full p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                            value={selectedDataStructure}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                setSelectedDataStructure(selectedValue);
                            }}
                        >
                            {stackOptions.map((algorithm) => (
                                <option key={algorithm} value={algorithm}>
                                    {algorithm}
                                </option>
                            ))}
                        </select>
                    </div>
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
                            alt={`${selectedDataStructure} Illustration`}
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
            </motion.div>
            <Toaster position="bottom-right" />
        </div>
    );
}
