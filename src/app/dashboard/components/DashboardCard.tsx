"use client";

interface DashboardCardProps {
    title: string;
    value: string | number;
}

export default function DashboardCard({ title, value }: DashboardCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-gray-700 font-semibold">{title}</h2>
            <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
    );
}
