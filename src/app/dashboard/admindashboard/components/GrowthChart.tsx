"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface GrowthChartProps {
    data?: {
        deposits: number;
        withdrawals: number;
        transfers: number;
        total: number;
    };
}

export default function GrowthChart({ data }: GrowthChartProps) {
    // Mock data if API not yet ready
    const chartData = [
        { name: "Mon", deposits: 1200, withdrawals: 800 },
        { name: "Tue", deposits: 900, withdrawals: 600 },
        { name: "Wed", deposits: 1300, withdrawals: 1000 },
        { name: "Thu", deposits: 700, withdrawals: 500 },
        { name: "Fri", deposits: 1600, withdrawals: 900 },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="deposits" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="withdrawals" stroke="#f43f5e" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
