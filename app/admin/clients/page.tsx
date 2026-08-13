"use client";
import { useEffect, useState } from "react";
import { getAllClients } from "@/lib/firebase-utils";
import { Search, Mail } from "lucide-react";
export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => { getAllClients().then(setClients); }, []);
  const filtered = clients.filter((c) => (c.name || "").toLowerCase().includes(search.toLowerCase()) || (c.email || "").toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-3xl font-bold text-gray-900">Clients</h1><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none w-64" /></div></div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Changements</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inscrit le</th></tr></thead>
          <tbody className="divide-y divide-gray-100">{filtered.map((c) => (<tr key={c.uid} className="hover:bg-gray-50"><td className="px-6 py-4 text-sm font-medium text-gray-900">{c.name || "—"}</td><td className="px-6 py-4 text-sm text-gray-600">{c.email}</td><td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${c.plan === "pro" ? "bg-purple-100 text-purple-700" : c.plan === "premium" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{c.plan}</span></td><td className="px-6 py-4 text-sm text-gray-600">{c.changesUsed} / {c.changesLimit === 9999 ? "∞" : c.changesLimit}</td><td className="px-6 py-4 text-sm text-gray-500">{c.createdAt?.toDate?.().toLocaleDateString("fr-FR") || "—"}</td></tr>))}</tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-500 py-8">Aucun client trouvé.</p>}
      </div>
    </div>
  );
}
