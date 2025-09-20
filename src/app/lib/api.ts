const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// src/app/lib/api.ts

// Generic request handler
async function apiRequest(endpoint: string, method: string, data?: any) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    const res = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
    });

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
// 🔹 Auth & User APIs
// ------------------------------
export async function registerUser(data: any) {
    return apiRequest("/api/users/register/", "POST", data);
}

export async function loginUser(data: any) {
    return apiRequest("/api/users/login/", "POST", data);
}

export async function refreshToken(data: any) {
    return apiRequest("/api/users/token/refresh/", "POST", data);
}

// ------------------------------
// 🔹 Accounts APIs
// ------------------------------
export async function getAccounts(token: string) {
    return apiRequest("/api/accounts/", "GET");
}

export async function createAccount(data: any, token: string) {
    return apiRequest("/api/accounts/", "POST", data);
}

// ------------------------------
// 🔹 Transactions APIs
// ------------------------------
export async function depositMoney(data: any, token: string) {
    return apiRequest("/api/transactions/deposit/", "POST", data);
}

export async function withdrawMoney(data: any, token: string) {
    return apiRequest("/api/transactions/withdraw/", "POST", data);
}

export async function transferMoney(data: any, token: string) {
    return apiRequest("/api/transactions/transfer/", "POST", data);
}
