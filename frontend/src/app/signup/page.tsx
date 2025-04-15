"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert("Account created! Check your email to verify.");
      router.push("/login");
    }
  };

  return (
    <section className="px-6 py-20 bg-white text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign Up</h1>
      <p className="text-gray-600 mb-4">Create your account to get started.</p>
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
          onClick={handleSignup}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}
