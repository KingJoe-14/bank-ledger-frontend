"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface DistributionChartProps {
    data?: any[];
}

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"];

export default function DistributionChart({ data }: DistributionChartProps) {
    const chartData =
        data && data.length > 0
            ? data.map((item) => ({
                name: item.account_type,
                value: item.count,
            }))
            : [
                { name: "Savings", value: 50 },
                { name: "Current", value: 30 },
                { name: "Business", value: 20 },
            ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
