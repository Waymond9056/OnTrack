"use client";

import { useEffect, useState } from "react";
import { LoginProvider } from "../context/LoginContext";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function DashboardPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch session ID on load
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-session-id")
      .then((res) => res.text())
      .then(setSessionId)
      .catch(console.error);
  }, []);

  const handleSend = async () => {
    if (!input || !sessionId || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, `You: ${input}`]);

    const formData = new FormData();
    formData.append("text", input);
    formData.append("session-id", sessionId);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        body: formData,
      });
      const reply = await res.text();
      setMessages((prev) => [...prev, `Bot: ${reply}`]);
      setInput("");
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, `Bot: (error)`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Parsed syllabus:", data);
    setMessages((prev) => [...prev, "Bot: Uploaded and parsed syllabus."]);
  };

  return (
    <LoginProvider>
      <ProtectedRoute>
        <div className="flex h-[calc(100vh-72px)]">
          {/* Upload section */}
          <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6">
            <h2 className="text-2xl font-bold mb-4">Upload Your Syllabus</h2>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => {
                if (e.target.files?.[0]) handleUpload(e.target.files[0]);
              }}
            />
            {fileName && (
              <p className="mt-2 text-sm text-gray-600">Uploaded: {fileName}</p>
            )}
          </div>

          {/* Chatbot UI */}
          <div className="w-1/2 bg-white border-l flex flex-col">
            <div className="p-4 border-b bg-white shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800">
                Chat with Your Syllabus
              </h2>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto space-y-4">
              {messages.map((msg, i) => {
                const isUser = msg.startsWith("You:");
                return (
                  <div
                    key={i}
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                      isUser
                        ? "ml-auto bg-blue-600 text-white rounded-br-none"
                        : "mr-auto bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.replace(/^You:\s?|^Bot:\s?/, "")}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t bg-white flex items-center">
              <input
                className="flex-1 p-2 border rounded-full mr-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask a question..."
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isLoading ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </LoginProvider>
  );
}
