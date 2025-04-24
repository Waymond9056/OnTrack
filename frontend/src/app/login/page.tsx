"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { useLogin } from "@/app/context/LoginContext"; // Import useLogin

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLogin(); // Access login function from LoginContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      login(); // Update isLoggedIn state in LoginContext
      router.push("/dashboard");
    }
  };

  return (
    <section className="px-6 py-20 bg-white text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Login</h1>
      <p className="text-gray-600 mb-4">Please log in to continue.</p>
      <div className="text-gray-600 max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}