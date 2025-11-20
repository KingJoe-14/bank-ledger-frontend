"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { loginUser } from "@/app/lib/api";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await loginUser({ email, password });

            if (data?.access && data?.refresh) {
                localStorage.setItem("token", data.access);
                localStorage.setItem("refreshToken", data.refresh);

                toast.success("Login successful");

                // 🔹 Redirect after success
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err: any) {
            toast.error(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="md:flex w-1/2 flex justify-center items-center bg-gray-50 py-16 px-16">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

                {/* Email */}
                <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border pl-10 p-2.5 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border pl-10 p-2.5 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <div className="text-center text-sm mt-4">
                    Don’t have an account?{" "}
                    <a
                        href="/auth/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </a>
                </div>
            </form>
        </div>
    );
}
