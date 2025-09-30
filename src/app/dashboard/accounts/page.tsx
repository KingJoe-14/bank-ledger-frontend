"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type Account = {
    name?: string;
    email?: string;
    account_number: string;
    account_type?: string;
    balance: number;
    is_active?: boolean;
};

export default function MyAccountPage() {
    const [account, setAccount] = useState<Account | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAccount() {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/accounts/accounts/my/", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });

                if (!res.ok) throw new Error(`Error ${res.status}: Failed to fetch accounts`);

                const data = await res.json();
                if (data.results && data.results.length > 0) {
                    const acc = data.results[0];
                    setAccount({
                        name: acc.name ?? "N/A",
                        email: acc.email ?? "N/A",
                        account_number: acc.account_number,
                        account_type: acc.account_type ?? "N/A",
                        balance: parseFloat(acc.balance),
                        is_active: acc.is_active ?? false,
                    });
                } else {
                    setError("No account found.");
                }
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError(err.message);
            }
        }

        fetchAccount();
    }, []);

    if (error) return <p className="p-6 text-red-500">{error}</p>;
    if (!account) return <p className="p-6">Loading account details...</p>;

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Header */}
            <div className="bg-blue-600 text-white rounded-lg p-6 shadow">
                <h1 className="text-2xl font-bold">Welcome back, {account.name || "User"}!</h1>
                <p className="text-sm">Here’s your account overview</p>
            </div>

            {/* Account Card */}
            <Card className="shadow-lg border rounded-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">{account.account_number}</h2>
                            <p className="text-gray-500">{account.account_type}</p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                account.is_active ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                        >
                            {account.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Current Balance</p>
                            <p className="text-3xl font-bold text-gray-900">
                                ${account.balance.toFixed(2)}
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2">
                            <Link href="/dashboard/deposit">
                                <Button className="w-full">Deposit Funds</Button>
                            </Link>
                            <Link href="/dashboard/withdraw">
                                <Button variant="outline" className="w-full">
                                    Withdraw Money
                                </Button>
                            </Link>
                            <Link href="/dashboard/transfer">
                                <Button variant="outline" className="w-full">
                                    Transfer Money
                                </Button>
                            </Link>
                            <Link href="/statement">
                                <Button variant="ghost" className="w-full">
                                    Download Statement
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
