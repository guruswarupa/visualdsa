"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { FaArrowRight, FaArrowLeft, FaSearch, FaTrash, FaInfoCircle } from "react-icons/fa";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

const linkedListOptions = [
    "Singly Linked List",
    "Doubly Linked List",
    "Circular Singly Linked List",
    "Circular Doubly Linked List"
];

interface Node {
    value: number;
    next?: Node;
    prev?: Node;
}

export default function LinkedListVisualization() {
    const [linkedList, setLinkedList] = useState<Node | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [indexValue, setIndexValue] = useState<number | string>("");
    const [searchValue, setSearchValue] = useState<number | string>("");
    const [operationMessage, setOperationMessage] = useState<string>("");
    const [selectedDataStructure, setSelectedDataStructure] = useState("Singly Linked List");
    const [advantages, setAdvantages] = useState<string[]>([]);
    const [disadvantages, setDisadvantages] = useState<string[]>([]);
    const [codeFiles, setCodeFiles] = useState<{ [key: string]: string | null }>({});
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const codeBlockRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const fetchDSData = async () => {
            try {
                const response = await fetch(`/linkedlist/${selectedDataStructure.toLowerCase().replace(/\s+/g, "")}/info.json`);
                if (response.ok) {
                    const data = await response.json();
                    setAdvantages(data.advantages);
                    setDisadvantages(data.disadvantages);
                    const languages = ["c", "java", "py", "js", "ts", "cs", "cpp", "rs", "rb", "lua"];
                    const codeData: { [key: string]: string | null } = {};
                    for (const lang of languages) {
                        const codeResponse = await fetch(`/linkedlist/${selectedDataStructure.toLowerCase().replace(/\s+/g, "")}/code.${lang}`);
                        if (codeResponse.ok) {
                            codeData[lang] = await codeResponse.text();
                        }
                    }
                    setCodeFiles(codeData);
                } else {
                    console.error("Failed to fetch linked list info.json");
                }
            } catch (error) {
                console.error("Error fetching linked list data:", error);
            }
        };

        fetchDSData();
    }, [selectedDataStructure]);

    useEffect(() => {
        if (codeBlockRef.current) {
            hljs.highlightElement(codeBlockRef.current);
        }
    }, [codeFiles, selectedLanguage]);

    const copyToClipboard = () => {
        const code = codeFiles[selectedLanguage as keyof typeof codeFiles];
        if (code) {
            navigator.clipboard.writeText(code).then(() => {
                toast("Code copied to clipboard!");
            });
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(e.target.value);
    };

    const insertNode = (position: "beginning" | "end" | "index", index?: number) => {
        if (inputValue) {
            const newNode: Node = { value: parseFloat(inputValue) };
            if (!linkedList) {
                setLinkedList(newNode);
            } else {
                if (position === "beginning") {
                    newNode.next = linkedList;
                    if (selectedDataStructure === "Doubly Linked List") {
                        linkedList.prev = newNode;
                    }
                    setLinkedList(newNode);
                } else if (position === "end") {
                    let current: Node = linkedList;
                    while (current.next) {
                        current = current.next || null;
                    }
                    current.next = newNode;
                    if (selectedDataStructure === "Doubly Linked List") {
                        newNode.prev = current;
                    }
                } else if (position === "index" && index !== undefined) {
                    if (index === 0) {
                        insertNode("beginning");
                    } else {
                        let current = linkedList;
                        let currentIndex = 0;
                        while (current.next && currentIndex < index - 1) {
                            current = current.next ?? null;
                            currentIndex++;
                        }
                        newNode.next = current.next;
                        if (selectedDataStructure === "Doubly Linked List" && current.next) {
                            current.next.prev = newNode;
                        }
                        current.next = newNode;
                        if (selectedDataStructure === "Doubly Linked List") {
                            newNode.prev = current;
                        }
                    }
                }
            }
            setOperationMessage(`Inserted: ${inputValue}`);
            setInputValue("");
        }
    };

    const deleteNode = (position: "beginning" | "end" | "index", index?: number) => {
        if (linkedList) {
            if (position === "beginning") {
                setOperationMessage(`Deleted: ${linkedList.value}`);
                setLinkedList(linkedList.next || null);
                if (linkedList.next && selectedDataStructure === "Doubly Linked List") {
                    linkedList.next.prev = undefined;
                }
            } else if (position === "end") {
                let current = linkedList;
                if (!current.next) {
                    setOperationMessage(`Deleted: ${current.value}`);
                    setLinkedList(null);
                } else {
                    while (current.next && current.next.next) {
                        current = current.next ?? null;
                    }
                    setOperationMessage(`Deleted: ${current.next?.value}`);
                    current.next = undefined;
                }
            } else if (position === "index" && index !== undefined) {
                if (index === 0) {
                    deleteNode("beginning");
                } else {
                    let current = linkedList;
                    let currentIndex = 0;
                    while (current.next && currentIndex < index - 1) {
                        current = current.next ?? null;
                        currentIndex++;
                    }
                    if (current.next) {
                        setOperationMessage(`Deleted: ${current.next.value}`);
                        current.next = current.next.next;
                        if (selectedDataStructure === "Doubly Linked List" && current.next) {
                            current.next.prev = current;
                        }
                    } else {
                        setOperationMessage(`Index ${index} out of bounds`);
                    }
                }
            }
        }
    };

    const searchNode = () => {
        const valueToSearch = parseFloat(searchValue as string);
        let current = linkedList;
        while (current) {
            if (current.value === valueToSearch) {
                setOperationMessage(`Found: ${valueToSearch}`);
                return;
            }
            current = current.next ?? null;
        }
        setOperationMessage(`Value ${valueToSearch} not found`);
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#121212] text-[#E0E0E0]">
            <motion.div
                className="lg:w-1/4 w-full p-6 bg-[#1F1F1F] shadow-lg border-b lg:border-b-0 lg:border-r border-gray-700 lg:sticky lg:top-0 lg:h-screen overflow-y-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <h2 className="text-2xl font-bold mb-6 text-[#F5F5F5]">Linked List Operations</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-[#F5F5F5]">Input Value:</h3>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Enter a number"
                            className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-[#F5F5F5]">Index Value:</h3>
                        <input
                            type="number"
                            value={indexValue}
                            onChange={(e) => setIndexValue(e.target.value)}
                            placeholder="Enter index"
                            className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                        />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <button onClick={() => insertNode("beginning")} className="bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2">Insert at Beginning</button>
                        <button onClick={() => insertNode("end")} className="bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2">Insert at End</button>
                        <button onClick={() => insertNode("index", parseInt(indexValue as string))} className="bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2">Insert at Index</button>
                        <button onClick={() => deleteNode("beginning")} className="bg-red-600 hover:bg-red-500 text-white rounded-md py-2">Delete at Beginning</button>
                        <button onClick={() => deleteNode("end")} className="bg-red-600 hover:bg-red-500 text-white rounded-md py-2">Delete at End</button>
                        <button onClick={() => deleteNode("index", parseInt(indexValue as string))} className="bg-red-600 hover:bg-red-500 text-white rounded-md py-2">Delete at Index</button>
                        <div>
                            <h3 className="text-lg font-semibold text-[#F5F5F5]">Search Value:</h3>
                            <input
                                type="number"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Enter a number to search"
                                className="w-full mt-2 p-2 bg-[#121212] border border-[#383838] text-white rounded-md"
                            />
                        </div>
                        <button onClick={searchNode} className="bg-orange-600 hover:bg-orange-500 text-white rounded-md py-2">Search</button>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="w-full lg:w-3/4 p-6 bg-[#121212] overflow-y-auto rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center bg-[#1F1F1F] p-6 sm:p-8 rounded-lg min-h-[300px] w-[100%]">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#F5F5F5]">Linked List Visualization</h2>
                    <div className="flex items-center justify-center mb-4">
                        {linkedList ? (
                            <div className="flex">
                                {(() => {
                                    const nodes = [];
                                    let current: Node | null = linkedList;
                                    while (current) {
                                        nodes.push(
                                            <motion.div
                                                key={current.value}
                                                className="text-white text-base sm:text-xl p-5 rounded-md mx-2 bg-gradient-to-b from-green-500 to-green-700"
                                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                {current.value}
                                            </motion.div>
                                        );
                                        if (current.next) {
                                            nodes.push(
                                                <motion.div
                                                    key={`arrow-${current.value}`}
                                                    className="text-white text-base sm:text-xl p-5 rounded-md mx-2"
                                                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                >
                                                    {selectedDataStructure === "Singly Linked List" ? (
                                                        <FaArrowRight />
                                                    ) : (
                                                        <>
                                                            <FaArrowLeft />
                                                            <FaArrowRight />
                                                        </>
                                                    )}
                                                </motion.div>
                                            );
                                            current = current.next;
                                        } else {
                                            current = null;
                                        }
                                    }
                                    return nodes;
                                })()}
                            </div>
                        ) : (
                            <motion.div
                                className="text-white text-xl p-5 rounded-md mx-2 shadow-lg bg-gray-700"
                                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                Linked List is empty
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-gray-800 p-6 rounded-md w-full max-w-xl">
                        <h3 className="text-xl font-semibold text-[#F5F5F5]">Operation Result:</h3>
                        <pre className="text-sm text-gray-300 text-center">{operationMessage}</pre>
                    </div>
                </div>

                <div className="pt-12">
                    <label className="block mb-3 text-md text-[#F5F5F5]">Select Linked List Data Structure:</label>
                    <select
                        className="w-full p-3 bg-[#121212] border border-[#383838] text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={selectedDataStructure}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setSelectedDataStructure(selectedValue);
                        }}
                    >
                        {linkedListOptions.map((algorithm) => (
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

                <h2 className="mt-12 text-3xl font-bold mb-4 text-[#F5F5F5]">Source Code</h2>
                <label htmlFor="languageSelect" className="block mt-4 text-[#F5F5F5]">Select Language:</label>
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

                {codeFiles[selectedLanguage as keyof typeof codeFiles] && (
                    <div className="text-left">
                        <pre className="bg-gray-800 p-6 rounded overflow-x-auto">
                            <code
                                ref={codeBlockRef}
                                className={`language-${selectedLanguage}`}
                            >
                                {codeFiles[selectedLanguage as keyof typeof codeFiles]}
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