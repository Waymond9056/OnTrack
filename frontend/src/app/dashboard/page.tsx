"use client";

import { useEffect, useState } from "react";
import { LoginProvider } from "../context/LoginContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { supabase } from "../../../lib/supabase";

export default function DashboardPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Fetch session ID on load
  useEffect(() => {
    const fetchSessionId = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      console.log(error);

      if (!user?.email) return;

      const formData = new FormData();
      formData.append("userID", user.email);

      try {
        const res = await fetch("http://127.0.0.1:5000/get-session-id", {
          method: "POST",
          body: formData,
        });

        const id = await res.text();
        setSessionId(id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSessionId();
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

      const data = await res.json();
      const reply = data.message;
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
    setPdfUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    console.log(error);
    formData.append("userID", user?.email ?? "");

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
          {/* LEFT PANEL */}
          <div className="w-1/2 bg-gray-100 flex flex-col p-6 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {showMap ? "Google Maps" : "Upload Your Syllabus"}
              </h2>
              <button
                onClick={() => setShowMap(!showMap)}
                className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                {showMap ? "Switch to Upload" : "Switch to Map"}
              </button>
            </div>

            {showMap ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.523426031325!2d-84.39834568479647!3d33.77561728068288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f50486d70587ab%3A0xf30cc1c9b764fc01!2sGeorgia%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1614971229876!5m2!1sen!2sus"
                className="w-full border rounded"
                style={{ minHeight: "500px" }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h5v-2H4V5h8v4h4v6h-5v2h5a2 2 0 002-2V9.586a2 2 0 00-.586-1.414l-4.586-4.586A2 2 0 0013.414 3H4z" />
                  </svg>
                  Upload Syllabus
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                  }}
                  className="hidden"
                />

                {fileName && (
                  <p className="text-sm text-gray-600">Uploaded: {fileName}</p>
                )}

                {/* Show only PDF previews */}
                {pdfUrl && fileName?.toLowerCase().endsWith(".pdf") && (
                  <iframe
                    src={pdfUrl}
                    className="w-full flex-1 border rounded"
                    style={{ minHeight: "500px" }}
                  />
                )}

                {/* Fallback message for non-PDF */}
                {fileName && !fileName.toLowerCase().endsWith(".pdf") && (
                  <p className="text-gray-500 text-sm italic">
                    Preview only available for PDFs. File uploaded:{" "}
                    <strong>{fileName}</strong>
                  </p>
                )}
              </>
            )}
          </div>

          {/* RIGHT PANEL */}
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
