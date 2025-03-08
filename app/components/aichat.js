"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Upload, Volume2, MessageCircle } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a language model AI that can only answer questions related to Data Structures and Algorithms (DSA) and Design and Analysis of Algorithms (DAA). Please answer only within the scope of these topics.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Track whether the chat is open
  const chatContainerRef = useRef(null); // Reference for the chat container
  const chatButtonRef = useRef(null); // Reference for the chat button
  const chatInterfaceRef = useRef(null); // Reference for the entire chat interface
  const inputRef = useRef(null); // Reference for the input box
  const uploadButtonRef = useRef(null); // Reference for the upload button
  const ocrApiKey = process.env.NEXT_PUBLIC_OCR_API_KEY;

  // Speech Synthesis (TTS) function
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Set language (adjust as needed)
      utterance.volume = 1.0; // Volume (0.0 to 1.0)
      utterance.rate = 1.0; // Speed (0.1 to 10)
      utterance.pitch = 1.0; // Pitch (0 to 2)
      window.speechSynthesis.speak(utterance); // Play the speech
    } else {
      console.warn("Text-to-Speech not supported in this browser.");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(`${data.error}: ${data.details || "No additional details"}`);
      }

      const assistantMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error.message);
      const errorMessage = { role: "assistant", content: "Sorry, something went wrong: " + error.message };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "eng");

    try {
      const ocrResponse = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: { apikey: ocrApiKey },
        body: formData,
      });

      const ocrData = await ocrResponse.json();
      if (ocrData.IsErroredOnProcessing) {
        throw new Error(ocrData.ErrorMessage);
      }

      const extractedText = ocrData.ParsedResults.map((r) => r.ParsedText).join("\n");
      const userMessage = { role: "user", content: extractedText };
      setMessages((prev) => [...prev, userMessage]);

      const groqResponse = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!groqResponse.ok) {
        throw new Error(`HTTP error! Status: ${groqResponse.status}`);
      }

      const groqData = await groqResponse.json();
      if (groqData.error) {
        throw new Error(`${groqData.error}: ${groqData.details || "No additional details"}`);
      }

      const assistantMessage = { role: "assistant", content: groqData.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error.message);
      const errorMessage = {
        role: "assistant",
        content: "Failed to process the image or get a response: " + error.message,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Close chat window when clicking outside (except the chat button and chat interface)
  const handleOutsideClick = (e) => {
    if (
      chatButtonRef.current && !chatButtonRef.current.contains(e.target) && // Not the chat button
      chatInterfaceRef.current && !chatInterfaceRef.current.contains(e.target) // Not the chat interface
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div
        ref={chatButtonRef}
        onClick={toggleChat}
        className="fixed bottom-4 right-4 p-3 bg-[#E62B1E] text-white rounded-full shadow-lg cursor-pointer z-50"
      >
        <MessageCircle size={24} />
      </div>

      {isOpen && (
        <div
          ref={chatInterfaceRef}
          className="bg-[#E62B1E] rounded-lg shadow-lg flex flex-col h-[80vh] fixed bottom-4 right-4 w-full sm:w-96 z-50"
        >
          <div className="bg-[#1f1f1f] text-white p-4 rounded-t-lg flex items-center">
            <MessageSquare size={24} className="mr-2" />
            <h3 className="text-lg font-semibold">Chat with Guru AI</h3>
          </div>
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages
              .filter((msg) => msg.role !== "system")
              .map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg shadow flex items-start space-x-2 ${
                      msg.role === "user"
                        ? "bg-[#E62B1E] text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {msg.role === "user" ? "You" : "Guru AI"} •{" "}
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <button
                      onClick={() => speak(msg.content)}
                      className="p-1 text-gray-600 hover:text-[#E62B1E] focus:outline-none"
                      title="Listen to this message"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow border border-gray-200 text-gray-500">
                  Guru AI is thinking...
                </div>
              </div>
            )}
          </div>
          <div className="border-t bg-white p-4 flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1f1f1f] placeholder-white text-white"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#E62B1E] disabled:bg-gray-400"
              disabled={isLoading}
            >
              <MessageSquare size={20} />
            </button>
            <label
              ref={uploadButtonRef}
              className="p-2 bg-[#1f1f1f] text-white rounded-lg hover:bg-[#E62B1E] cursor-pointer"
            >
              <Upload size={20} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}