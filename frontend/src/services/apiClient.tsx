import axios from "axios";
import { getToken } from "./AuthService";

const API = 'http://localhost:5112/backend/';

const apiClient = axios.create({
    baseURL: API,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
           config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;