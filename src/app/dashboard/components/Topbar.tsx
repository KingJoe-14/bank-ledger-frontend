"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar, User, X } from "lucide-react";

type UserProfile = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    initials: string;
};

export default function Topbar() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/users/profile/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, []);

    if (!profile) return <p>Loading...</p>;

    return (
        <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
            <h1 className="text-xl font-semibold">Dashboard</h1>

            <div>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg"
                >
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                        {profile.initials}
                    </div>
                    {/* Name + Email */}
                    <div className="text-left">
            <span className="block text-sm font-medium text-gray-800">
              {profile.first_name} {profile.last_name}
            </span>
                        <span className="block text-xs text-gray-500">{profile.email}</span>
                    </div>
                </button>
            </div>

            {/* Profile Modal */}
            {open && (
                <div className="fixed inset-0 bg-gray-700/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Avatar */}
                        <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-md">
                            {profile.initials}
                        </div>

                        <h2 className="mt-4 text-2xl font-bold text-center text-gray-800">
                            {profile.first_name} {profile.last_name}
                        </h2>
                        <p className="text-sm text-center text-gray-500">User Profile</p>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500" />
                                <span className="text-sm text-gray-700">{profile.email}</span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <Phone className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-gray-700">{profile.phone}</span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <MapPin className="w-5 h-5 text-red-500" />
                                <span className="text-sm text-gray-700">{profile.address}</span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <Calendar className="w-5 h-5 text-purple-500" />
                                <span className="text-sm text-gray-700">{profile.dob}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="mt-6 text-xs text-gray-400 text-center">
                            Profile Information
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
