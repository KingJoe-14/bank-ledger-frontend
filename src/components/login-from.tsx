"use client";

import { useState } from "react";
// @ts-ignore
import { Input } from "@/components/ui/input";
// @ts-ignore
import { Label } from "@/components/ui/label";
// @ts-ignore
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// @ts-ignore
import { login } from "@/lib/auth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await login(email, password);
            // store JWT token
            localStorage.setItem("token", data.access);
            toast.success("Login successful!");
        } catch (err: any) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4 p-6 bg-white shadow rounded-lg"
        >
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
}
