"use client";

import { useAuth } from "";

export default function DashboardPage() {
    const { isAuthenticated } = useAuth(true); // true = redirect if not logged in

    if (!isAuthenticated) return null; // prevent flicker

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
            <p>Welcome back! You are logged in ✅</p>
        </div>
    );
}
