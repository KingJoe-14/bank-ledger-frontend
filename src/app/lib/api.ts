export async function apiRequest(
    endpoint: string,
    method: string = "GET",
    body?: any,
    token?: string
) {
    const isFormData = body instanceof FormData;

    const res = await fetch(`http://127.0.0.1:8000/api${endpoint}`, {
        method,
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
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

export async function registerUser(data: any) {
    return apiRequest("/users/register/", "POST", data);
}

export async function loginUser(data: any) {
    return apiRequest("/users/login/", "POST", data);
}