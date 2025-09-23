"use client";

// @ts-ignore
import { Button } from "@/components/ui/button";
// @ts-ignore
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
            <h1 className="font-bold text-lg">SecureBank</h1>
            <Button onClick={handleLogout} variant="outline">
                Logout
            </Button>
        </nav>
    );
}
