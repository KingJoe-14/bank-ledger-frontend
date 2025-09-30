"use client";

import { useEffect, useState } from "react";

type Account = {
    id: number;
    account_number: string;
    account_type: string;
    balance: string;
    is_active: boolean;
};

export default function WithdrawPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        async function fetchAccounts() {
            try {
                const res = await fetch(
                    "http://127.0.0.1:8000/api/accounts/accounts/my/",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access")}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch accounts");
                const data = await res.json();
                setAccounts(data.results); // same as deposit
            } catch (err) {
                console.error(err);
            }
        }

        fetchAccounts();
    }, []);

    async function handleWithdraw(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch(
                "http://127.0.0.1:8000/api/accounts/transactions/create/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                    body: JSON.stringify({
                        transaction_type: "WITHDRAW", // 👈 key difference
                        account_id: selectedAccount,
                        amount: parseFloat(amount),
                        description,
                    }),
                }
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Withdrawal failed");

            alert(`✅ Withdrawal successful! New balance: ${data.new_balance}`);
            setAmount("");
            setDescription("");
        } catch (err: any) {
            alert(`❌ ${err.message}`);
        }
    }

    return (
        <form
            onSubmit={handleWithdraw}
            className="space-y-4 max-w-md mx-auto mt-10 p-6 border rounded-lg"
        >
            <h2 className="text-lg font-bold">Withdraw Money</h2>

            <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                required
            >
                <option value="">Select Account</option>
                {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                        {acc.account_number} ({acc.account_type})
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
                required
            />

            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
            />

            <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded"
            >
                Withdraw
            </button>
        </form>
    );
}
