"use client";

import LeftSection from "@/components/auth/LeftSection";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            <LeftSection />
            <LoginForm />
        </div>
    );
}
