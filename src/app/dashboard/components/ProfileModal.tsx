"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, IdCard, X } from "lucide-react";

type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
};

const user: User = {
    id: 3,
    first_name: "Kingsley",
    last_name: "Thompson",
    email: "kingsleyfynnthompson14@gmail.com",
    phone: "0263455232",
    address: "Adress",
};

export default function ProfileModal() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Trigger Button (top-right) */}
            <div className="absolute top-4 right-6">
                <button
                    onClick={() => setOpen(true)}
                    className="flex flex-col items-end text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    <span>{user.first_name} {user.last_name}</span>
                    <span className="text-gray-500 text-xs">{user.email}</span>
                </button>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 flex justify-center items-center z-[9999] bg-transparent">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">

                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Avatar */}
                        <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold text-gray-600">
                            {user.first_name[0]}
                            {user.last_name[0]}
                        </div>

                        {/* Name */}
                        <h2 className="mt-4 text-xl font-bold text-center text-gray-800">
                            {user.first_name} {user.last_name}
                        </h2>
                        <p className="text-sm text-center text-gray-500">User Profile</p>

                        {/* Info Section */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
                                <Mail className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-700">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
                                <Phone className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-700">{user.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
                                <MapPin className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-700">{user.address}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-md">
                                <IdCard className="w-5 h-5 text-gray-500" />
                                <span className="text-sm text-gray-700">
                  #{user.id.toString().padStart(3, "0")}
                </span>
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="mt-6 text-xs text-gray-400 text-center">
                            Profile Information
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
