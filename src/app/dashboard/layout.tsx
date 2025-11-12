"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex flex-col flex-1">
                {/* Topbar */}
                <Topbar />

                {/* Page Content */}
                <main className="p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
