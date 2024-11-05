"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { FaArrowUp, FaArrowDown, FaEye, FaTrash, FaInfoCircle, FaSearch } from "react-icons/fa";

export default function StackVisualization() {
    const [stackInput, setStackInput] = useState<string>("");
    const [stack, setStack] = useState<number[]>([]);
    const [searchValue, setSearchValue] = useState<number | string>("");
    const [operationMessage, setOperationMessage] = useState<string>("");

    const codeBlockRef = useRef<HTMLPreElement | null>(null);

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
                        <pre ref={codeBlockRef} className="text-sm text-gray-300">{operationMessage}</pre>
                    </div>
                </div>
            </motion.div>
            <Toaster position="top-right" />
        </div>
    );
}
