"use client";

import { useLogin } from "../context/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login"); // Redirect to login if not logged in
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Optionally, return a loading spinner or placeholder
  }

  return <>{children}</>;
}
