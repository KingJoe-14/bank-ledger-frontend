"use client";

import React from "react";

interface SummaryCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
}

export default function SummaryCard({ title, value, subtitle }: SummaryCardProps) {
    return (
        <div className="bg-white shadow-md rounded-xl p-5 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
    );
}
