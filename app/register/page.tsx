"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/firebase-utils";
import { QrCode, Eye, EyeOff, Check } from "lucide-react";
import { PLANS } from "@/types";
export default function RegisterPage() {
  const searchParams = useSearchParams(); const defaultPlan = searchParams.get("plan") || "standard";
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [showPassword, setShowPassword] = useState(false); const [plan, setPlan] = useState(defaultPlan); const [error, setError] = useState(""); const [loading, setLoading] = useState(false); const router = useRouter();
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); setLoading(true); setError(""); try { await registerUser(name, email, password, plan); router.push("/dashboard"); router.refresh(); } catch (err: any) { setError(err.message || "Une erreur est survenue"); } finally { setLoading(false); } }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6"><div className="w-10 h-10 rounded-xl bg-yeno-500 flex items-center justify-center"><QrCode className="w-5 h-5 text-white" /></div><span className="font-bold text-2xl text-gray-900">YENO</span></Link>
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1><p className="text-gray-600 mt-2">Commencez à digitaliser votre menu</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {error && <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label><input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none transition" placeholder="Votre nom" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none transition" placeholder="vous@restaurant.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label><div className="relative"><input type={showPassword ? "text" : "password"} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none transition pr-12" placeholder="••••••••" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-3">Choisir un plan</label><div className="grid grid-cols-3 gap-3">{PLANS.map((p) => (<button key={p.id} type="button" onClick={() => setPlan(p.id)} className={`relative p-4 rounded-xl border-2 text-center transition ${plan === p.id ? "border-yeno-500 bg-yeno-50" : "border-gray-100 hover:border-gray-200"}`}>{plan === p.id && <div className="absolute top-2 right-2"><Check className="w-4 h-4 text-yeno-600" /></div>}<div className="font-semibold text-gray-900 text-sm">{p.name}</div><div className="text-xs text-gray-500 mt-1">{p.price} DH/an</div></button>))}</div></div>
            <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-yeno-500 text-white font-semibold hover:bg-yeno-600 transition disabled:opacity-50 mt-6">{loading ? "Création..." : "Créer mon compte"}</button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">Déjà un compte ? <Link href="/login" className="text-yeno-600 font-medium hover:underline">Se connecter</Link></p>
        </div>
      </div>
    </div>
  );
}
