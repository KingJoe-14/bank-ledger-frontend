"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/lib/api";
import { Home, Wallet, CreditCard, Send, BookText, LogOut } from "lucide-react";

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        logoutUser();
        router.push("/auth/login");
    };

    const navItems = [
        { icon: Home, label: "Dashboard", href: "/dashboard" },
        { icon: Wallet, label: "My Accounts", href: "/dashboard/accounts" },
        { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
        { icon: Send, label: "Transfer Money", href: "/dashboard/transfer" },
        { icon: BookText, label: "Bank Statement", href: "/dashboard/statement" },
    ];

    return (
        <aside className="w-64 bg-blue-900 text-white flex flex-col">
            {/* Brand */}
            <div className="p-4 text-lg font-bold">KingYaw Bank</div>

            {/* Navigation links */}
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

            {/* Logout button */}
            <div className="p-4 border-t border-blue-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
