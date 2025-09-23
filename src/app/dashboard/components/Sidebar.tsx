"use client";

import {
    Home,
    Wallet,
    CreditCard,
    Send,
    BarChart,
    Settings,
} from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-blue-900 text-white flex flex-col">
            {/* Logo */}
            <div className="p-4 text-lg font-bold">KingYaw Bank</div>

            {/* Nav Links */}
            <nav className="flex-1 space-y-2">
                {[
                    { icon: Home, label: "Dashboard" },
                    { icon: Wallet, label: "My Accounts" },
                    { icon: CreditCard, label: "Transactions" },
                    { icon: Send, label: "Transfer Money" },
                    { icon: BarChart, label: "Analytics" },
                    { icon: Settings, label: "Settings" },
                ].map((item) => (
                    <button
                        key={item.label}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-blue-800 w-full text-left"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Profile */}
            <div className="p-4 border-t border-blue-700">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                        <p className="text-sm font-medium">Abigail Thompson</p>
                        <p className="text-xs text-gray-300">SAVINGS Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
