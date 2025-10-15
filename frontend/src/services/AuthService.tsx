import { handleError } from "../handlers/ErrorHandler";
import type { AuthResponse, LoginRequest } from "../models/User";
import apiClient from "./apiClient";

export const loginAPI = async (credentials: LoginRequest) => {
    try {
        const response = await apiClient.post<AuthResponse>('auth/login', credentials);

        if (response.data.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);
        }

        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const logout = (): void => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
};

export const getToken = (): string | null => {
    return localStorage.getItem('accessToken');
}