"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Transaction = {
    id: number;
    transaction_type: string;
    amount: string;
    description: string | null;
    from_account: string | null;
    to_account: string | null;
    timestamp: string;
    account_number: string;
    account_type: string;
    owner_email: string;
};

type StatementResponse = {
    account: string;
    balance: number;
    transactions: Transaction[];
};

export default function StatementPage() {
    const [data, setData] = useState<StatementResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (!token) {
            setError("No access token found. Please log in.");
            setLoading(false);
            return;
        }

        fetch("http://127.0.0.1:8000/api/accounts/statement/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((json) => {
                setData(json);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="p-4">Loading statement...</p>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
    if (!data || !Array.isArray(data.transactions)) {
        return <p className="p-4">No transactions found.</p>;
    }

    const transactions = [...data.transactions].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const downloadPDF = () => {
        const doc = new jsPDF();
        let runningBalance = 0;

        doc.setFontSize(16);
        doc.text("Bank Statement", 14, 20);

        doc.setFontSize(12);
        doc.text(`Account: ${data.account}`, 14, 30);
        doc.text(`Final Balance: $${data.balance.toFixed(2)}`, 14, 38);

        const tableData = transactions.map((txn) => {
            if (txn.transaction_type === "DEPOSIT") {
                runningBalance += parseFloat(txn.amount);
            } else if (
                txn.transaction_type === "WITHDRAW" ||
                txn.transaction_type === "TRANSFER_OUT"
            ) {
                runningBalance -= parseFloat(txn.amount);
            }

            return [
                new Date(txn.timestamp).toLocaleString(),
                txn.transaction_type,
                `$${txn.amount}`,
                `$${runningBalance.toFixed(2)}`
            ];
        });

        autoTable(doc, {
            head: [["Date", "Type", "Amount", "Running Balance"]],
            body: tableData,
            startY: 50,
        });

        doc.save(`bank-statement-${data.account}-${new Date().toISOString()}.pdf`);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Bank Statement</h1>
                <button
                    onClick={downloadPDF}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Download PDF
                </button>
            </div>

            <p className="mb-4">
                <strong>Account:</strong> {data.account} <br />
                <strong>Final Balance:</strong> ${data.balance.toFixed(2)}
            </p>

            <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Amount</th>
                    <th className="px-4 py-2 border">Running Balance</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((txn, idx) => {
                    return (
                        <tr
                            key={txn.id}
                            className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <td className="px-4 py-2 border">
                                {new Date(txn.timestamp).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border">{txn.transaction_type}</td>
                            <td className="px-4 py-2 border">${txn.amount}</td>
                            <td className="px-4 py-2 border">
                                ${data.balance.toFixed(2)}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
