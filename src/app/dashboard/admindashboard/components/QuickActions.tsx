"use client";

import { Plus, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
    const actions = [
        { label: "Add New User", icon: Users, href: "/dashboard/users/create" },
        { label: "Add Account", icon: Plus, href: "/dashboard/accounts/create" },
        { label: "Post Announcement", icon: FileText, href: "/dashboard/announcements" },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
                    >
                        <action.icon className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
