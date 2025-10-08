"use client";

import { AlertTriangle } from "lucide-react";

export default function AlertsCard() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Alerts & Notifications</h2>
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                    <AlertTriangle className="w-5 h-5" />
                    <p>2 failed transactions detected today</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 text-yellow-700 rounded-lg border border-yellow-100">
                    <AlertTriangle className="w-5 h-5" />
                    <p>1 suspicious activity flagged for review</p>
                </div>
            </div>
        </div>
    );
}
