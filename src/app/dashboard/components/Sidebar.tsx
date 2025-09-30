"use client";

import Link from "next/link";
import {
    Home,
    Wallet,
    CreditCard,
    Send,
    BookText,
} from "lucide-react";

export default function Sidebar() {
    const navItems = [
        { icon: Home, label: "Dashboard", href: "/dashboard" },
        { icon: Wallet, label: "My Accounts", href: "/dashboard/accounts" },
        { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
        { icon: Send, label: "Transfer Money", href: "/dashboard/transfer" },
        { icon: BookText, label: "Bank Statement", href: "/dashboard/statement" },
    ];

    return (
        <aside className="w-64 bg-blue-900 text-white flex flex-col">
            <div className="p-4 text-lg font-bold">KingYaw Bank</div>

            <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-blue-800 w-full"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-blue-700">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                        {/*<p className="text-sm font-medium">Abigail Thompson</p>*/}
                        {/*<p className="text-xs text-gray-300">SAVINGS Account</p>*/}
                    </div>
                </div>
            </div>
        </aside>
    );
}
