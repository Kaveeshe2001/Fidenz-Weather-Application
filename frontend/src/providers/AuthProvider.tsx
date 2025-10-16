import { createContext, useContext, useEffect, useState } from "react";
import type { AuthResponse, AuthUser} from "../models/User";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    handleFinalLogin: (tokenResponse: AuthResponse) => void;
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

   const handleFinalLogin = (tokenResponse: AuthResponse) => {
        const { access_token } = tokenResponse;
        const decodedToken = jwtDecode<AuthUser>(access_token);

        localStorage.setItem("accessToken", access_token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

        setToken(access_token);
        setUser(decodedToken);
        
        toast.success("Login Successful!");
        navigate("/");
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
        logout,
        handleFinalLogin,
        isLoggedIn,

   };

   return (
        <AuthContext.Provider value={contextValue}>
            {isReady ? children : null}
        </AuthContext.Provider>
   );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};