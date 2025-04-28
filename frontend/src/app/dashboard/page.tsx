"use client";

import { useEffect, useRef, useState } from "react";
import { LoginProvider } from "../context/LoginContext";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { supabase } from "../../../lib/supabase";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"upload" | "map" | "gpa">("upload");
  const [isClearing, setIsClearing] = useState(false);
  const [clearedMessageVisible, setClearedMessageVisible] = useState(false);
  const [customResponses, setCustomResponses] = useState<string[]>([]);
  const [mapMarkers, setMapMarkers] = useState<
    { lat: number; lng: number; name: string }[]
  >([]);

  const mapRef = useRef<google.maps.Map | null>(null);

  const gpaData = {
    labels: ["Fall 2022", "Spring 2023", "Fall 2023", "Spring 2024"],
    datasets: [
      {
        label: "GPA",
        data: [3.2, 2.8, 3.6, 4.0],
        fill: true,
        backgroundColor: "rgba(147, 197, 253, 0.3)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "white",
        pointBorderColor: "rgba(99, 102, 241, 1)",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const gpaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "gray",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    elements: {
      line: {
        tension: 0.4, // curved lines
      },
    },
    scales: {
      x: {
        ticks: {
          color: "gray",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "gray",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    },
  };

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
        const res = await fetch("https://mukils.pythonanywhere.com/get-session-id", {
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

  useEffect(() => {
    if (mapRef.current && mapMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      mapMarkers.forEach((marker) => bounds.extend(marker));
      mapRef.current.fitBounds(bounds);
    }
  }, [mapMarkers]);

  const handleSend = async () => {
    if (!input || !sessionId || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, `You: ${input}`]);

    const formData = new FormData();
    formData.append("text", input);
    formData.append("session-id", sessionId);

    try {
      const res = await fetch("https://mukils.pythonanywhere.com/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const reply = data.message;
      setMessages((prev) => [...prev, `Bot: ${reply}`]);
      setCustomResponses(data.custom_responses?.slice(0, 3) || []);

      if (data.locations && data.locations.length > 0) {
        fetchLocationsCoordinates(data.locations);
      }

      if (data.flag) {
        if (data.flag === "SYLLABUS") setViewMode("upload");
        if (data.flag === "SCHEDULE") setViewMode("map");
        if (data.flag === "PROGRESS") setViewMode("gpa");
      }

      setInput("");
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, `Bot: (error)`]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSuggestion = async (suggestion: string) => {
    if (!suggestion || !sessionId || isLoading) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, `You: ${suggestion}`]);

    const formData = new FormData();
    formData.append("text", suggestion);
    formData.append("session-id", sessionId);

    try {
      const res = await fetch("https://mukils.pythonanywhere.com/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const reply = data.message;
      setMessages((prev) => [...prev, `Bot: ${reply}`]);
      setCustomResponses(data.custom_responses?.slice(0, 3) || []);

      if (data.locations && data.locations.length > 0) {
        fetchLocationsCoordinates(data.locations);
      }

      setInput("");
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, `Bot: (error)`]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocationsCoordinates = async (locations: string[]) => {
    const promises = locations.map(async (location) => {
      const formData = new FormData();
      formData.append("query", location);

      const res = await fetch("https://mukils.pythonanywhere.com/places-search", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const firstResult = data.results[0];
        return {
          lat: firstResult.geometry.location.lat,
          lng: firstResult.geometry.location.lng,
          name: location,
        };
      }
      return null;
    });

    const results = await Promise.all(promises);
    setMapMarkers(
      results.filter(
        (r): r is { lat: number; lng: number; name: string } => r !== null
      )
    );
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

    try {
      const res = await fetch("https://mukils.pythonanywhere.com/api/upload", {
        method: "POST",
        body: formData,
      });

      const message = await res.text(); // <-- get plain text
      setMessages((prev) => [...prev, `Bot: ${message}`]); // <-- display it in chat
    } catch (err) {
      console.error("Upload failed:", err);
      setMessages((prev) => [...prev, "Bot: Failed to upload syllabus."]);
    }
  };

  const handleClearData = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    console.log(error);

    if (!user?.email) return;

    const formData = new FormData();
    formData.append("userID", user.email);

    try {
      setIsClearing(true);

      await fetch("https://mukils.pythonanywhere.com/clear_data", {
        method: "POST",
        body: formData,
      });

      setTimeout(() => {
        setMessages([]);
        setIsClearing(false);
        setCustomResponses([]);
        setMapMarkers([]);
        setClearedMessageVisible(true);
        setTimeout(() => setClearedMessageVisible(false), 2000);
      }, 300);
    } catch (err) {
      console.error("Failed to clear data:", err);
      setIsClearing(false);
    }
  };

  return (
    <LoginProvider>
      <ProtectedRoute>
        <div className="flex h-[calc(100vh-72px)]">
          {/* LEFT PANEL */}
          <div className="w-1/2 bg-gray-100 flex flex-col p-6 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Select View</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode("upload")}
                  className={`text-sm px-3 py-1 rounded ${
                    viewMode === "upload"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500`}
                >
                  Upload
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`text-sm px-3 py-1 rounded ${
                    viewMode === "map"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500`}
                >
                  Map
                </button>
                <button
                  onClick={() => setViewMode("gpa")}
                  className={`text-sm px-3 py-1 rounded ${
                    viewMode === "gpa"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-blue-500`}
                >
                  Goals
                </button>
              </div>
            </div>

            {viewMode === "upload" && (
              <>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                >
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
                {pdfUrl && fileName?.toLowerCase().endsWith(".pdf") && (
                  <iframe
                    src={pdfUrl}
                    className="w-full flex-1 border rounded"
                    style={{ minHeight: "500px" }}
                  />
                )}
              </>
            )}

            {viewMode === "map" && (
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "500px" }}
                center={mapMarkers[0] || { lat: 33.7756, lng: -84.3963 }}
                zoom={14}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
              >
                {mapMarkers.map((marker, idx) => (
                  <Marker
                    key={idx}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    title={marker.name}
                    animation={google.maps.Animation.DROP}
                  />
                ))}
              </GoogleMap>
            )}

            {viewMode === "gpa" && (
              <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl shadow-inner">
                <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center space-y-8 relative overflow-hidden">
                  {/* Animated Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-transparent to-indigo-300 opacity-20 animate-pulse rounded-3xl pointer-events-none" />

                  <div className="text-center z-10">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
                      Goals Visualizer
                    </h2>
                  </div>

                  <div className="w-full h-96 relative z-10">
                    {/* Background gradient behind the chart */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-100 via-transparent to-transparent rounded-2xl opacity-30 pointer-events-none" />
                    <Line data={gpaData} options={gpaOptions} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL */}
          {/* (Chatbot panel stays exactly like before) */}

          {/* RIGHT PANEL */}
          <div className="w-1/2 bg-white border-l flex flex-col">
            <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Chat With Your Agent
              </h2>
              <button
                onClick={handleClearData}
                className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Clear Data
              </button>
            </div>

            <div
              className={`flex-1 px-4 py-6 overflow-y-auto space-y-4 transition-opacity duration-300 ${
                isClearing ? "opacity-0" : "opacity-100"
              }`}
            >
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

              {clearedMessageVisible && (
                <div className="text-center text-sm text-gray-500 italic mt-4">
                  Chat cleared!
                </div>
              )}
            </div>

            {customResponses.length > 0 && (
              <div className="flex flex-wrap gap-2 p-4 border-t bg-white">
                {customResponses.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendSuggestion(suggestion)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-105 transform transition-all duration-200 text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

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
