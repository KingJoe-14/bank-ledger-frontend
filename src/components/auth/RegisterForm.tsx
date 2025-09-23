"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    HomeIcon,
    LockClosedIcon,
    CurrencyDollarIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { registerUser } from "@/app/lib/api";

export default function RegisterForm() {
    const router = useRouter();

    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [accountType, setAccountType] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);

    // UI state
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            address,
            account_type: accountType,
            password,
        };

        try {
            const data = await registerUser(payload);

            toast.success(data.message || "Account created successfully!");

            // Redirect after short delay
            setTimeout(() => {
                router.push("/auth/login");
            }, 1500);
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 px-12 py-16">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6"
            >
                {/* Header */}
                <div className="space-y-1 text-center">
                    <h2 className="text-2xl font-bold">Create Your Account</h2>
                    <p className="text-sm text-gray-500">
                        Join thousands of satisfied customers
                    </p>
                </div>

                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full border pl-9 p-2.5 rounded"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full border pl-9 p-2.5 rounded"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border pl-9 p-2.5 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Phone */}
                <div className="relative">
                    <PhoneIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full border pl-9 p-2.5 rounded"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                {/* Address */}
                <div className="relative">
                    <HomeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full border pl-9 p-2.5 rounded"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Account Type */}
                <div className="relative">
                    <CurrencyDollarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                        className="w-full border pl-9 p-2.5 rounded appearance-none"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        required
                    >
                        <option value="">-- Select Account Type --</option>
                        <option value="savings">Savings</option>
                        <option value="current">Current</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                {/* Password with toggle */}
                <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border pl-9 pr-10 p-2.5 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                            <EyeIcon className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Terms & Conditions */}
                <label className="flex items-start text-sm space-x-2">
                    <input
                        type="checkbox"
                        className="h-4 w-4 mt-1"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        required
                    />
                    <span>
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </a>
                    </span>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                />
                            </svg>
                            Creating...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>

                <div className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a
                        href="/auth/login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Sign in
                    </a>
                </div>
            </form>
        </div>
    );
}
