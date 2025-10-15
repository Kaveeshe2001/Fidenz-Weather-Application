import { createContext, useEffect, useState } from "react";
import type { AuthUser, LoginRequest } from "../models/User";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { loginAPI } from "../services/AuthService";

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    loginUser: (credentials: LoginRequest) => Promise<void>;
    logout: () => void;
    isLoggedIn: () => boolean;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const navigate = useNavigate();
   const [user, setUser] = useState<AuthUser | null>(null);
   const [token, setToken] = useState<string | null>(null);
   const [isReady, setIsReady] = useState(false); 

   useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
        try {
            const decodedToken = jwtDecode<AuthUser>(storedToken);

            if (decodedToken.exp * 1000 > Date.now()) {
                setToken(storedToken);
                setUser(decodedToken);
                axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
            } else {
                localStorage.removeItem("accessToken");
            }
        } catch (error) {
            console.error("Invalid token found in storage", error);
            localStorage.removeItem("accessToken");
        }
    }
    setIsReady(true);
   }, []);

   const loginUser = async (credentials: LoginRequest) => {
        try {
            const response = await loginAPI(credentials);

            if (response && response.access_token) {
                const { access_token } = response;
                const decodedToken = jwtDecode<AuthUser>(access_token);

                localStorage.setItem("accessToken", access_token);
                axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      
                setToken(access_token);
                setUser(decodedToken);
      
                toast.success("Login Successful!");
                navigate("/");
            }
            
        } catch (error) {
            console.error("Login failed:", error);
        }
   };

   const isLoggedIn = (): boolean => {
        return !!token;
   };

   const logout = () => {
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];
        setUser(null);
        setToken(null);
        navigate("/login");
   };

   const contextValue = {
        user,
        token,
        loginUser,
        logout,
        isLoggedIn,

   };

   return (
        <AuthContext.Provider value={contextValue}>
            {isReady ? children : null}
        </AuthContext.Provider>
   );
};