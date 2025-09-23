"use client";

import { Bell } from "lucide-react";

export default function Topbar() {
    return (
        <header className="flex justify-end items-center bg-white shadow px-6 py-3">
            <div className="flex items-center gap-6">
                {/* Notification bell */}
                <button className="relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User info */}
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-gray-300"></div>
                    <div className="text-sm">
                        <p className="font-medium">Abigail Thompson</p>
                        <p className="text-xs text-gray-500">feliceneobank@gmail.com</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
