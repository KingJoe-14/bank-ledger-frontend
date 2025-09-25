"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Account = {
    id: number;
    account_number: string;
    account_type: string;
};

export default function DepositPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [accountId, setAccountId] = useState<number | null>(null);
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    // Load accounts (so user can select where to deposit)
    useEffect(() => {
        async function fetchAccounts() {
            try {
                const token = localStorage.getItem("access");
                if (!token) {
                    setError("Please log in first.");
                    return;
                }

                const res = await fetch("http://localhost:8000/api/accounts/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to load accounts");
                }

                const data = await res.json();
                setAccounts(data);
            } catch (err: any) {
                setError(err.message);
            }
        }

        fetchAccounts();
    }, []);

    async function handleDeposit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const token = localStorage.getItem("access");
            if (!token) {
                setError("Please log in first.");
                return;
            }

            const res = await fetch("http://localhost:8000/api/transactions/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    transaction_type: "DEPOSIT",
                    account_id: accountId,
                    amount,
                    description,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "deposit failed");
            }

            setMessage(data.detail + " New balance: $" + data.new_balance.toFixed(2));
            setAmount("");
            setDescription("");
            setAccountId(null);

            // Optionally redirect back to dashboard after success
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Deposit Money</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {message && <p className="text-green-600 mb-4">{message}</p>}

            <form onSubmit={handleDeposit} className="space-y-4">
                {/* Account Select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Select Account</label>
                    <select
                        value={accountId ?? ""}
                        onChange={(e) => setAccountId(Number(e.target.value))}
                        className="w-full border rounded-lg p-2"
                        required
                    >
                        <option value="">-- Choose Account --</option>
                        {accounts.map((acc) => (
                            <option key={acc.id} value={acc.id}>
                                {acc.account_type} - {acc.account_number}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Enter amount"
                        required
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg p-2"
                        placeholder="Optional"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white rounded-lg py-2 font-medium hover:bg-green-700 disabled:opacity-50"
                >
                    {loading ? "Processing..." : "deposit"}
                </button>
            </form>
        </div>
    );
}
