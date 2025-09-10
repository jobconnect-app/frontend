"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { AuthProvider } from "../hooks/useAuth";
import GlobalLoader from "./GlobalLoader";

interface LoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
}
const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
export const useGlobalLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx)
    throw new Error("useGlobalLoader must be used within LoaderContext");
  return ctx;
};

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);
  return (
    <AuthProvider>
      <LoaderContext.Provider value={{ showLoader, hideLoader }}>
        <GlobalLoader visible={loading} />
        {children}
      </LoaderContext.Provider>
    </AuthProvider>
  );
}
