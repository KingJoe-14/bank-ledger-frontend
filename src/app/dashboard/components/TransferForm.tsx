"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function TransferForm() {
    const [toAccount, setToAccount] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("access");
            if (!token) {
                setModal({ type: "error", message: "Please log in first." });
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

            if (!res.ok) throw new Error(data.detail || "Transfer failed");

            setModal({ type: "success", message: data.detail || "Transfer successful!" });
            setToAccount("");
            setAmount("");
        } catch (err: any) {
            setModal({ type: "error", message: err.message || "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                        className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center hover:bg-blue-700 transition"
                >
                    {loading && <Loader2 className="animate-spin w-4 h-4 mr-2" />}
                    Transfer
                </button>
            </form>

            {modal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-[320px] p-6 text-center">
                        {modal.type === "success" ? (
                            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                        ) : (
                            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                        )}
                        <h3 className="text-lg font-semibold mb-1">
                            {modal.type === "success" ? "Success" : "Error"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">{modal.message}</p>
                        <button
                            onClick={() => setModal(null)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
