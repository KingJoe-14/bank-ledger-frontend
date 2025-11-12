"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth(redirectIfNotLoggedIn: boolean = false) {
    const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (redirectIfNotLoggedIn) {
            if (!token) {
                router.push("/auth/login");
            }
        }

        setIsAuthenticated(!!token);
    }, [redirectIfNotLoggedIn, router]);

    return { isAuthenticated };
}
