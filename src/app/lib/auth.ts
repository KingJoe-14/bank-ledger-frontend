import { apiRequest } from "./api";

export const login = async (email: string, password: string) => {
    return apiRequest("/customer/login/", "POST", { email, password });
};

export const register = async (formData: {
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    password: string;
    account_type: string;
}) => {
    return apiRequest("/customer/register/", "POST", formData);
};

export const getProfile = async (token: string) => {
    return apiRequest("/customer/profile/", "GET", undefined, token);
};

// 🔹 Logout (clear token)
export const logout = () => {
    localStorage.removeItem("token");
};
