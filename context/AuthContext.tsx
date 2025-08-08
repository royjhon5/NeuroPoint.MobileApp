import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthLoading: true,
  setIsAuthenticated: () => {},
  checkAuth: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsAuthenticated(!!token);
    setIsAuthLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthLoading, setIsAuthenticated, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Correct export
export const useAuth = () => useContext(AuthContext);
