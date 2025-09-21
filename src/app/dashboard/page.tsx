"use client";

import { useAuth } from "@/app/hooks/useAuth";

export default function DashboardPage() {
    const { isAuthenticated } = useAuth(true);

    if (isAuthenticated === null) {
        return <p className="p-6">Checking authentication...</p>;
    }

    if (!isAuthenticated) {
        return <p className="p-6">Redirecting to login...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
            <p>Welcome back! You are logged in ✅</p>
        </div>
    );
}
