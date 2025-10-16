import { handleError } from "../handlers/ErrorHandler";
import type { AuthResponse, InitialLoginResponse, LoginRequest, VerifyMfaRequest } from "../models/User";
import apiClient from "./apiClient";

export const initialLoginAPI = async (credentials: LoginRequest) => {
    try {
        const response = await apiClient.post<InitialLoginResponse>('auth/login', credentials);

        if (!response.data.mfaRequired && response.data.token.access_token) {
            localStorage.setItem('accessToken', response.data.token.access_token);
        }

        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const verifyMfaAPI = async (mfaData: VerifyMfaRequest) => {
    try {
        const response = await apiClient.post<AuthResponse>('auth/verify-mfa', mfaData);

        if (response.data.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);
        }

        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const logout = (): void => {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
};

export const getToken = (): string | null => {
    return localStorage.getItem('accessToken');
}