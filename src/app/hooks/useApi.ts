import { useState } from "react";

export function useApi<T = any>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<T | null>(null);

    const request = async (
        endpoint: string,
        method: string = "GET",
        body?: any
    ) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`http://localhost:8000/api${endpoint}`, {
                method,
                headers: { "Content-Type": "application/json" },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.detail || "Request failed");
            }

            const result = await res.json();
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { request, data, loading, error };
}
