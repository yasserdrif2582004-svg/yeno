"use client";
import { useEffect, useState } from "react";
import { getAllClients, getChangeRequests } from "@/lib/firebase-utils";
import { Users, CreditCard, MessageSquare, TrendingUp } from "lucide-react";
export default function AdminDashboard() {
  const [clients, setClients] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  useEffect(() => { getAllClients().then(setClients); getChangeRequests().then(setRequests); }, []);
  const totalRevenue = clients.reduce((sum, c) => { const planPrice = c.plan === "standard" ? 60 : c.plan === "premium" ? 100 : c.plan === "pro" ? 150 : 0; return sum + planPrice; }, 0);
  const stats = [
    { label: "Clients", value: clients.length, icon: Users, color: "bg-blue-100 text-blue-600" },
    { label: "Revenus/an", value: `${totalRevenue} DH`, icon: CreditCard, color: "bg-green-100 text-green-600" },
    { label: "Demandes en attente", value: requests.filter((r) => r.status === "pending").length, icon: MessageSquare, color: "bg-amber-100 text-amber-600" },
    { label: "Plan Pro", value: clients.filter((c) => c.plan === "pro").length, icon: TrendingUp, color: "bg-purple-100 text-purple-600" },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2"><div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}><s.icon className="w-5 h-5" /></div><span className="text-sm text-gray-500">{s.label}</span></div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-semibold text-gray-900">Derniers clients</h2></div>
        <table className="w-full">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Changements</th></tr></thead>
          <tbody className="divide-y divide-gray-100">{clients.slice(0, 10).map((c) => (<tr key={c.uid} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">{c.name || "—"}</td><td className="px-6 py-4 text-sm text-gray-600">{c.email}</td><td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${c.plan === "pro" ? "bg-purple-100 text-purple-700" : c.plan === "premium" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{c.plan}</span></td><td className="px-6 py-4 text-sm text-gray-600">{c.changesUsed} / {c.changesLimit === 9999 ? "∞" : c.changesLimit}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
