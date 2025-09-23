export async function apiRequest(
    endpoint: string,
    method: string = "GET",
    body?: any,
    token?: string
) {
    const res = await fetch(`http://127.0.0.1:8000/api${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        let errorMessage = "Request failed";
        try {
            const errorData = await res.json();
            errorMessage = errorData?.detail || JSON.stringify(errorData);
        } catch (e) {
            errorMessage = await res.text();
        }
        throw new Error(errorMessage);
    }

    return res.json();
}
