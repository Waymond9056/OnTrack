"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase"; // or wherever your supabase client is

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });


    if (error) {
      alert("Password update failed: " + error.message);
    } else {
      alert("Password updated successfully!");
      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <section className="px-6 py-20 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded-lg shadow text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Reset Password</h1>
        <p className="text-gray-600 mb-6">
          Enter your new password below.
        </p>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded border border-gray-300"
        />
        <button
          onClick={handleUpdatePassword}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </section>
  );
}
