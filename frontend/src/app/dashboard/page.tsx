"use client";

import ProtectedRoute from "./../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <section className="px-6 py-20 bg-white text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to your dashboard 🎉</h1>
        <p className="text-gray-600">You are successfully logged in.</p>
      </section>
    </ProtectedRoute>
  );
}
