"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    HomeIcon,
    IdentificationIcon,
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
    CalendarDaysIcon,
    BanknotesIcon,
} from "@heroicons/react/24/solid";

export default function RegisterForm() {
    const router = useRouter();

    // Form state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [ghanaCardNumber, setGhanaCardNumber] = useState("");
    const [ghanaCardFile, setGhanaCardFile] = useState<File | null>(null);
    const [accountType, setAccountType] = useState("");
    const [password, setPassword] = useState("");
    const [agree, setAgree] = useState(false);

    // UI state
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        if (!agree) {
            toast.error("You must agree to the Terms & Conditions");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("dob", dob);
        formData.append("ghana_card_number", ghanaCardNumber);
        if (ghanaCardFile) {
            formData.append("ghana_card_file", ghanaCardFile);
        }
        formData.append("account_type", accountType);
        formData.append("password", password);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}register/`, {
                method: "POST",
                body: formData,
            });

            const text = await res.text();
            let data: any;
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error(
                    text.includes("<!DOCTYPE")
                        ? "Server returned HTML instead of JSON. Check API URL."
                        : text || "Unexpected server response."
                );
            }

            if (!res.ok) {
                if (data && typeof data === "object") {
                    setErrors(data); // field-level errors
                }
                throw new Error(data.detail || "Registration failed");
            }

            toast.success(data.message || "Account created successfully!");
            setTimeout(() => {
                router.push("/auth/login");
            }, 1500);
        } catch (err: any) {
            console.error("Registration error:", err);
            toast.error(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Return moved out of handleSubmit
    return (
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50 px-12 py-16">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow"
                encType="multipart/form-data"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <div className="flex items-center border rounded p-2.5">
                            <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <div className="flex items-center border rounded p-2.5">
                            <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center border rounded p-2.5">
                        <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <input
                            type="email"
                            className="flex-1 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <div className="flex items-center border rounded p-2.5">
                            <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <div className="flex items-center border rounded p-2.5">
                            <HomeIcon className="w-5 h-5 text-gray-500 mr-2" />
                            <input
                                type="text"
                                className="flex-1 outline-none"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                </div>

                {/* DOB */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <div className="flex items-center border rounded p-2.5">
                        <CalendarDaysIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <input
                            type="date"
                            className="flex-1 outline-none"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                </div>

                {/* Ghana Card Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ghana Card Number</label>
                    <div className="flex items-center border rounded p-2.5">
                        <IdentificationIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="GHA-XXXXXXXXX-X"
                            className="flex-1 outline-none"
                            value={ghanaCardNumber}
                            onChange={(e) => setGhanaCardNumber(e.target.value)}
                            required
                        />
                    </div>
                    {errors.ghana_card_number && <p className="text-red-500 text-sm">{errors.ghana_card_number}</p>}
                </div>

                {/* Ghana Card File */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Ghana Card</label>
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="w-full border p-2.5 rounded"
                        onChange={(e) => setGhanaCardFile(e.target.files?.[0] || null)}
                        required
                    />
                    {errors.ghana_card_file && <p className="text-red-500 text-sm">{errors.ghana_card_file}</p>}
                </div>

                {/* Account Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Account Type</label>
                    <div className="flex items-center border rounded p-2.5">
                        <BanknotesIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <select
                            className="flex-1 outline-none"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                            required
                        >
                            <option value="">Select account type</option>
                            <option value="SAVINGS">Savings</option>
                            <option value="CURRENT">Current</option>
                        </select>
                    </div>
                    {errors.account_type && <p className="text-red-500 text-sm">{errors.account_type}</p>}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="flex items-center border rounded p-2.5">
                        <LockClosedIcon className="w-5 h-5 text-gray-500 mr-2" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="flex-1 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                            ) : (
                                <EyeIcon className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Terms */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        className="h-4 w-4 border-gray-300 rounded"
                    />
                    <label className="text-sm text-gray-700">
                        I agree to the{" "}
                        <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2.5 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}
