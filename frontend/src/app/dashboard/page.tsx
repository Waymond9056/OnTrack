"use client";

import { useState } from "react";
import ProtectedRoute from "./../components/ProtectedRoute";

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages((prev) => [...prev, `You: ${input}`, `Bot: Echo - ${input}`]);
      setInput("");
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-[calc(100vh-72px)]">
        {" "}
        {/* adjust height below header */}
        {/* Left: Upload Syllabus */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            {/* Upload Icon */}
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0-8l-3.5 3.5M12 12l3.5 3.5M12 4v4"
                />
              </svg>
            </div>

            {/* Text & Input */}
            <h2 className="text-2xl font-bold mb-2">Upload Your Syllabus</h2>
            <p className="text-gray-600 mb-4">PDF, DOCX, or TXT formats</p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="mb-4"
            />
            {selectedFile && (
              <p className="text-gray-700">
                Selected File: {selectedFile.name}
              </p>
            )}
          </div>
        </div>
        {/* Right: Chatbot */}
        <div className="w-1/2 bg-gray-50 border-l border-gray-300 flex flex-col">
          <div className="p-6 border-b bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800">
              Chat with your Syllabus
            </h2>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 px-4 py-6 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => {
              const isUser = msg.startsWith("You:");
              const content = msg.replace(/^You:\s?|^Bot:\s?/, "");

              return (
                <div
                  key={idx}
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    isUser
                      ? "ml-auto bg-blue-600 text-white rounded-br-none"
                      : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {content}
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t bg-white flex items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-full mr-2 outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
