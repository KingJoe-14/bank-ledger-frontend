"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TransferForm() {
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("access");
            if (!token) {
                toast.error("Please log in first.");
                return;
            }

            const res = await fetch("http://127.0.0.1:8000/api/accounts/transactions/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    transaction_type: "TRANSFER",
                    amount: parseFloat(amount),
                    to_account_number: toAccount,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Transfer failed");
            }

            toast.success(data.detail);
            setToAccount("");
            setAmount("");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleTransfer}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow"
        >
            <h2 className="text-xl font-bold mb-4">Transfer Money</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Recipient Account Number
                </label>
                <input
                    type="text"
                    value={toAccount}
                    onChange={(e) => setToAccount(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center"
            >
                {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                Transfer
            </button>
        </form>
    );
}
