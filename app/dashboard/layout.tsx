"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { ClientSidebar } from "@/components/ClientSidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Affiche un écran de chargement pendant que Firebase vérifie
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yeno-500"></div>
      </div>
    );
  }

  // Si pas connecté, ne rien afficher (la redirection se fera dans useEffect)
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ClientSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
