import React from "react";
import { AuthContext } from "../providers/AuthProvider"

export const useAuth = () => React.useContext(AuthContext);