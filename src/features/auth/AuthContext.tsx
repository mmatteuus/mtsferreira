import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean> | boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth.token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) setToken(t);
  }, []);

  const value = useMemo<AuthContextType>(() => ({
    isAuthenticated: Boolean(token),
    login: async (username: string, password: string) => {
      // Demo: credenciais fixas
      if (username === "admin" && password === "admin") {
        const t = `tk_${Date.now()}`;
        localStorage.setItem(TOKEN_KEY, t);
        setToken(t);
        return true;
      }
      return false;
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
    },
  }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}

