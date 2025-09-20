"use client";

import LeftSection from "@/components/auth/LeftSection";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen">
            <LeftSection />
            <RegisterForm />
        </div>
    );
}
