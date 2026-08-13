"use client";
import { ReactNode } from "react";
import { useAuth } from "@/lib/useAuth";
export function AuthProvider({ children }: { children: ReactNode }) {
  const { loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yeno-600"></div></div>;
  return <>{children}</>;
}
