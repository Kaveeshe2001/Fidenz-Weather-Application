import axios from "axios";
import { AuthResponse, LoginRequest } from "../models/User";
import { handleError } from "../handlers/ErrorHandler";

const api = 'http://localhost:5257/backend/';

export const loginAPI = async (credentials: LoginRequest) => {
    try {
        const response = await axios.post<AuthResponse>(api + 'auth/login', {
            credentials
        });

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