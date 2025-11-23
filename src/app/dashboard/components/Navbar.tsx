"use client";

import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="w-full bg-blue-600 text-white p-4 flex items-center justify-between">
            {/* Left */}
            <h1 className="text-lg font-semibold">SecureBank Dashboard</h1>

            {/* Right */}
            <div className="flex items-center gap-4">
                <button className="hover:underline">Logout</button>

                <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                        src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white"
                    />
                    <span className="hidden sm:inline font-medium">John Doe</span>
                </div>
            </div>
        </nav>
    );
}
