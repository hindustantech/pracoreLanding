import React, { createContext, useContext, useEffect, useState } from "react";

type UserShape = any;

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserShape | null;
  token: string | null;
  login: (payload: { user?: UserShape; token?: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserShape | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const isLoggedIn = !!token;

  useEffect(() => {
    // load from localStorage on mount
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = ({ user: u, token: t }: { user?: UserShape; token?: string }) => {
    if (t) {
      localStorage.setItem("token", t);
      setToken(t);
    }
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
      setUser(u);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
