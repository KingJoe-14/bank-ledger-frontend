"use client";

import { useEffect, useState } from "react";
import { fetchAllTransactions, Transaction } from "@/lib/account";

import { Loader2 } from "lucide-react";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("ALL");

    useEffect(() => {
        async function loadTransactions() {
            try {
                const token = localStorage.getItem("access");
                if (!token) {
                    setError("Please log in first.");
                    return;
                }
                const res = await fetchAllTransactions(token);
                setTransactions(res);
            } catch (err: any) {
                setError(err.message || "Failed to load transactions");
            } finally {
                setLoading(false);
            }
        }
        loadTransactions();
    }, []);

    // Apply filters
    const filtered = transactions.filter((tx) => {
        const matchesSearch =
            tx.transaction_type.toLowerCase().includes(search.toLowerCase()) ||
            tx.amount.toString().includes(search) ||
            tx.account_number.toString().includes(search);

        const matchesType =
            typeFilter === "ALL" || tx.transaction_type === typeFilter;

        return matchesSearch && matchesType;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
                <p className="ml-2 text-gray-600">Loading transactions...</p>
            </div>
        );
    }

    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

    return (
        <div className="p-3 sm:p-4 md:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Transactions</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search by type, amount, or account"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-sm"
                >
                    <option value="ALL">All Types</option>
                    <option value="DEPOSIT">Deposit</option>
                    <option value="WITHDRAW">Withdraw</option>
                    <option value="TRANSFER_OUT">Transfer Out</option>
                    <option value="TRANSFER_IN">Transfer In</option>
                </select>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow p-3 sm:p-4">
                {filtered.length > 0 ? (
                    <div className="space-y-3">
                        {filtered.map((tx) => {
                            const color =
                                tx.transaction_type === "DEPOSIT"
                                    ? "text-green-500"
                                    : tx.transaction_type === "WITHDRAW" ||
                                    tx.transaction_type === "TRANSFER_OUT"
                                        ? "text-red-500"
                                        : "text-gray-500";

                            return (
                                <div
                                    key={tx.id}
                                    className="flex justify-between items-center border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium text-sm">
                                            {tx.transaction_type}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Acc {tx.account_number} •{" "}
                                            {new Date(tx.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                    <p className={`font-bold ${color}`}>
                                        {tx.transaction_type === "DEPOSIT" ? "+" : "-"}$
                                        {Number(tx.amount).toFixed(2)}
                                    </p>

                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No transactions found.</p>
                )}
            </div>
        </div>
    );
}
