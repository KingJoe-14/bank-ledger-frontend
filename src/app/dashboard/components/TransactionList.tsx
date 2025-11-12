// src/app/dashboard/components/TransactionList.tsx
"use client";

interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: "credit" | "debit";
}

const sampleTransactions: Transaction[] = [
    { id: 1, date: "2025-09-20", description: "ATM Withdrawal", amount: -200, type: "debit" },
    { id: 2, date: "2025-09-18", description: "Salary deposit", amount: 1500, type: "credit" },
    { id: 3, date: "2025-09-15", description: "Online Purchase", amount: -75, type: "debit" },
];

export default function TransactionList() {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                <tr>
                    <th className="p-2 border-b">Date</th>
                    <th className="p-2 border-b">Description</th>
                    <th className="p-2 border-b">Amount</th>
                </tr>
                </thead>
                <tbody>
                {sampleTransactions.map((tx) => (
                    <tr key={tx.id}>
                        <td className="p-2 border-b">{tx.date}</td>
                        <td className="p-2 border-b">{tx.description}</td>
                        <td
                            className={`p-2 border-b font-semibold ${
                                tx.type === "credit" ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {tx.type === "credit" ? "+" : "-"}${Math.abs(tx.amount)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
