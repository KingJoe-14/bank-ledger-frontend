export async function apiRequest(
    endpoint: string,
    method: string = "GET",
    body?: any,
    token?: string
) {
    const isFormData = body instanceof FormData;

    // Automatically grab token from localStorage if not passed
    if (!token) {
        token = localStorage.getItem("token") || undefined;
    }

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
            errorMessage =
                errorData?.detail ||
                errorData?.message ||
                JSON.stringify(errorData);
        } catch {
            try {
                errorMessage = await res.text();
            } catch {
                errorMessage = `HTTP ${res.status}`;
            }
        }

        throw new Error(errorMessage);
    }

    return res.json();
}

export async function registerUser(data: any) {
    return apiRequest("/users/register/", "POST", data);
}

export async function loginUser(data: any) {
    const result = await apiRequest("/users/login/", "POST", data);

    // Store tokens in localStorage
    if (result.access && result.refresh) {
        localStorage.setItem("token", result.access);
        localStorage.setItem("refreshToken", result.refresh);
    }

    return result;
}

export async function depositMoney(payload: {
    transaction_type: "DEPOSIT";
    account_id: number;
    amount: string;
    description?: string;
}) {
    return apiRequest("/transactions/create/", "POST", payload);
}

export async function getBankStatement() {
    return apiRequest("/accounts/statement/", "GET");
}

export async function getAdminDashboard() {
    return apiRequest("/adminpanel/dashboard/", "GET");
}

export function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
}
