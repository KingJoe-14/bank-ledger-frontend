// src/app/dashboard/transfer/page.tsx
"use client";

import TransferForm from "../components/TransferForm";

export default function TransferPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Transfer Money</h1>
            <TransferForm />
        </div>
    );
}
