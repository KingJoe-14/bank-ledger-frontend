import { useState } from "react";
// @ts-ignore
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";

export default function SignupForm() {
    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        password: "",
        account_type: "savings", // default, you can change
    });

    // 👇 paste your code here but wrap it in handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiRequest("/api/users/register/", "POST", formData);
            toast.success("Account created successfully!");
        } catch (err: any) {
            toast.error(err.message || "Registration failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="border p-2 w-full"
            />
            {/* 👆 Repeat similar inputs for last_name, email, phone, etc. */}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Register
            </button>
        </form>
    );
}
