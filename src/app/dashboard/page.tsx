"use client";

import { useEffect, useState } from "react";
import { PlusCircle, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { fetchDashboardData, DashboardResponse } from "@/lib/account";

export default function DashboardPage() {
    const [data, setData] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const token = localStorage.getItem("access");
                if (!token) {
                    setError("Please log in first.");
                    return;
                }

                const res = await fetchDashboardData(token); // ✅ pass token
                setData(res);
            } catch (err: any) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <p className="p-6">Loading dashboard...</p>;
    if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
    if (!data) return <p className="p-6">No data available.</p>;

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleTimeString()}
                </p>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-600 text-white rounded-xl p-4">
                    <p>Total Balance</p>
                    <h2 className="text-2xl font-bold">
                        ${data.total_balance.toFixed(2)}
                    </h2>
                    <p className="text-sm text-green-300">+2.25% from last month</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                    <p>First Account</p>
                    <h2 className="text-2xl font-bold text-gray-800">
                        ${data.accounts[0]?.balance.toFixed(2) || 0}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {data.accounts[0]?.account_type} - {data.accounts[0]?.account_number}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow">
                    <p>Accounts Count</p>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {data.accounts.length}
                    </h2>
                    <p className="text-sm text-orange-500">Total accounts</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <button className="flex-1 bg-green-500 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2">
                    <PlusCircle /> Deposit Money
                </button>
                <button className="flex-1 bg-red-500 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2">
                    <ArrowDownCircle /> Withdraw Money
                </button>
                <button className="flex-1 bg-purple-500 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-2">
                    <ArrowUpCircle /> Transfer Money
                </button>
            </div>

            {/* My Accounts + Recent Transactions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* My Accounts */}
                <div className="bg-white rounded-xl p-4 shadow">
                    <h3 className="text-lg font-bold mb-4">My Accounts</h3>
                    <div className="space-y-3">
                        {data.accounts.map((acc) => (
                            <div
                                key={acc.account_number}
                                className="flex items-center justify-between border p-3 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium">{acc.account_type}</p>
                                    <p className="text-xs text-gray-500">
                                        Account: {acc.account_number}
                                    </p>
                                </div>
                                <p className="font-bold">${acc.balance.toFixed(2)}</p>
                            </div>
                        ))}
                        <button className="w-full border rounded-lg py-2 text-sm text-gray-500 hover:bg-gray-100">
                            + Open New Account
                        </button>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-xl p-4 shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Recent Transactions</h3>
                        <button className="text-sm text-blue-600">View All</button>
                    </div>
                    <div className="space-y-3">
                        {data.recent_transactions.map((tx) => {
                            const color =
                                tx.transaction_type === "DEPOSIT"
                                    ? "text-green-500"
                                    : tx.transaction_type === "WITHDRAW" || tx.transaction_type === "TRANSFER_OUT"
                                        ? "text-red-500"
                                        : "text-gray-500";

                            return (
                                <div
                                    key={tx.id}
                                    className="flex justify-between border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium">{tx.transaction_type}</p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(tx.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                    <p className={`font-bold ${color}`}>
                                        {tx.transaction_type === "DEPOSIT" ? "+" : "-"}$
                                        {tx.amount.toFixed(2)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
