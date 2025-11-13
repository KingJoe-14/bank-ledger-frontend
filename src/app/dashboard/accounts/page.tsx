"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
                        name: acc.owner_name ?? "N/A",
                        email: acc.owner_email ?? "N/A",
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
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold">Welcome back, {account.name || "User"} 👋</h1>
                <p className="text-sm opacity-90 mt-2">
                    Here’s your latest account overview
                </p>
            </div>

            <Card className="shadow-md border rounded-xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">{account.account_number}</CardTitle>
                            <p className="text-sm text-gray-500">{account.account_type}</p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                account.is_active
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                            }`}
                        >
                            {account.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    {/* Balance Section */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Current Balance</p>
                            <p className="text-4xl font-bold text-gray-900 mt-1">
                                ${account.balance.toFixed(2)}
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col gap-3 w-40">
                            <Link href="/dashboard/deposit">
                                <Button className="w-full">Deposit</Button>
                            </Link>
                            <Link href="/dashboard/withdraw">
                                <Button variant="outline" className="w-full">
                                    Withdraw
                                </Button>
                            </Link>
                            <Link href="/dashboard/transfer">
                                <Button variant="secondary" className="w-full">
                                    Transfer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
