"use client";

import WithdrawForm from "@/components/WithdrawForm";

export default function WithdrawPage() {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Withdraw Money</h1>
            <WithdrawForm />
        </div>
    );
}
