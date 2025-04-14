"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "./../context/LoginContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useLogin();

  const handleLogin = () => {
    login();              // Set login state
    router.push("/dashboard"); // Navigate to dashboard
  };

  return (
    <section className="px-6 py-20 bg-white text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Login</h1>
      <p className="text-gray-600 mb-4">Please log in to continue.</p>
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded border border-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded border border-gray-300"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </div>
    </section>
  );
}
