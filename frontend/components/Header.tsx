"use client";

import { useLogin } from "@/app/context/LoginContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isLoggedIn, logout } = useLogin();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Left side: logo + nav */}
      <div className="flex space-x-4">
        <Link href="/" className="text-blue-600 font-semibold">
          Logo
        </Link>
        <Link href="/features" className="text-gray-700 hover:text-blue-600">
          Features
        </Link>
      </div>

      {/* Right side: auth buttons */}
      <div className="flex space-x-4">
        {isLoggedIn && (
          <Link
            href="/dashboard"
            className="text-gray-700 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Dashboard
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
