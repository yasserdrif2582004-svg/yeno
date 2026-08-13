"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { QrCode, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const isActive = (path: string) => pathname === path;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-yeno-500 flex items-center justify-center"><QrCode className="w-4 h-4 text-white" /></div><span className="font-bold text-xl text-gray-900">YENO</span></Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`text-sm font-medium transition ${isActive("/") ? "text-yeno-600" : "text-gray-600 hover:text-gray-900"}`}>Accueil</Link>
            <Link href="/#plans" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Tarifs</Link>
            <Link href="/demo" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Démo</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Contact</Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {user ? (<Link href="/dashboard" className="px-4 py-2 rounded-xl bg-yeno-500 text-white text-sm font-medium hover:bg-yeno-600 transition">Mon compte</Link>) : (<><Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">Connexion</Link><Link href="/register" className="px-4 py-2 rounded-xl bg-yeno-500 text-white text-sm font-medium hover:bg-yeno-600 transition">S'inscrire</Link></>)}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">{mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-600">Accueil</Link>
          <Link href="/#plans" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-600">Tarifs</Link>
          <Link href="/demo" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-600">Démo</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-600">Contact</Link>
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            {user ? (<Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2 rounded-xl bg-yeno-500 text-white text-sm font-medium">Mon compte</Link>) : (<><Link href="/login" onClick={() => setMobileOpen(false)} className="block text-center text-sm font-medium text-gray-600">Connexion</Link><Link href="/register" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2 rounded-xl bg-yeno-500 text-white text-sm font-medium">S'inscrire</Link></>)}
          </div>
        </div>
      )}
    </nav>
  );
}
