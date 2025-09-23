// src/app/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// ------------------------------
// 🔹 Token Management
// ------------------------------
export function saveTokens(access: string, refresh: string) {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
}

export function getAccessToken() {
    return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

export function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

// ------------------------------
// 🔹 Generic request handler
// ------------------------------
async function apiRequest(endpoint: string, method: string, data?: any, requiresAuth: boolean = false) {
    let headers: Record<string, string> = { "Content-Type": "application/json" };

    if (requiresAuth) {
        const token = getAccessToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    let res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    // If token expired, try refreshing
    if (res.status === 401 && requiresAuth) {
        const refreshed = await attemptTokenRefresh();
        if (refreshed) {
            // Retry request with new token
            headers["Authorization"] = `Bearer ${getAccessToken()}`;
            res = await fetch(`${API_URL}${endpoint}`, {
                method,
                headers,
                body: data ? JSON.stringify(data) : undefined,
            });
        }
    }

    if (!res.ok) {
        let errorMessage;
        try {
            const errData = await res.json();
            errorMessage = errData.detail || JSON.stringify(errData);
        } catch {
            errorMessage = await res.text();
        }
        throw new Error(errorMessage);
    }

    return res.json();
}

// ------------------------------
// 🔹 Token Refresh Helper
// ------------------------------
async function attemptTokenRefresh(): Promise<boolean> {
    const refresh = getRefreshToken();
    if (!refresh) return false;

    try {
        const res = await fetch(`${API_URL}/api/users/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
        });

        if (!res.ok) return false;

        const data = await res.json();
        if (data.access) {
            saveTokens(data.access, refresh); // keep same refresh
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

// ------------------------------
// 🔹 Auth & User APIs
// ------------------------------
export async function registerUser(data: any) {
    return apiRequest("/api/users/register/", "POST", data);
}

export async function loginUser(data: any) {
    const response = await apiRequest("/api/users/login/", "POST", data);
    if (response.access && response.refresh) {
        saveTokens(response.access, response.refresh);
    }
    return response;
}

// ------------------------------
// 🔹 Accounts APIs
// ------------------------------
export async function getAccounts() {
    return apiRequest("/api/accounts/", "GET", undefined, true);
}

export async function createAccount(data: any) {
    return apiRequest("/api/accounts/", "POST", data, true);
}

// ------------------------------
// 🔹 Transactions APIs
// ------------------------------
export async function depositMoney(data: any) {
    return apiRequest("/api/transactions/deposit/", "POST", data, true);
}

export async function withdrawMoney(data: any) {
    return apiRequest("/api/transactions/withdraw/", "POST", data, true);
}

export async function transferMoney(data: any) {
    return apiRequest("/api/transactions/transfer/", "POST", data, true);
}
