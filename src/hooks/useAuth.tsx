"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthUser {
  email: string;
  role: string;
  // Ajoute ici d'autres propriétés connues si besoin
  [key: string]: unknown;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  loading: boolean; // <--- AJOUT
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <--- AJOUT

  // Log à chaque render
  console.log("[AuthProvider] render", { token, user });

  // Log à chaque changement de token
  useEffect(() => {
    console.log("[AuthProvider] token changed", token);
  }, [token]);

  // Log à chaque changement de user
  useEffect(() => {
    console.log("[AuthProvider] user changed", user);
  }, [user]);

  // Log à chaque navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("[AuthProvider] pathname", window.location.pathname);
    }
  });

  // Ajout : relire le localStorage à chaque mount/remount/navigation
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("auth_user");
    console.log(
      "[AuthProvider] useEffect mount: storedToken",
      storedToken,
      "storedUser",
      storedUser,
    );
    if (storedToken) setToken(storedToken);
    else setToken(null);
    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
    setLoading(false); // <--- AJOUT
  }, [typeof window !== "undefined" && window.location.pathname]);

  useEffect(() => {
    // Écoute le refresh automatique du token
    const onTokenRefreshed = (e: Event) => {
      const detail = (e as CustomEvent<{ access_token: string }>).detail;
      if (detail?.access_token) {
        setToken(detail.access_token);
        localStorage.setItem("access_token", detail.access_token);
        console.log("[AuthProvider] Token refreshed:", detail.access_token);
      }
    };
    const onLogout = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("auth_user");
      console.log("[AuthProvider] Logout triggered by event");
      window.location.href = "/login";
    };
    window.addEventListener("tokenRefreshed", onTokenRefreshed);
    window.addEventListener("logout", onLogout);
    return () => {
      window.removeEventListener("tokenRefreshed", onTokenRefreshed);
      window.removeEventListener("logout", onLogout);
    };
  }, []);

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    console.log("[AuthProvider] login() called", newToken, newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("auth_user");
    console.log("[AuthProvider] logout() called manually");
    // Optionnel : rediriger vers /login
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
