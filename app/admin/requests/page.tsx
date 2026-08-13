"use client";
import { useEffect, useState } from "react";
import { getChangeRequests, updateChangeRequest, getUserData, updateDoc, doc, db } from "@/lib/firebase-utils";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { getDoc } from "firebase/firestore";
export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  useEffect(() => { loadRequests(); }, []);
  async function loadRequests() { const reqs = await getChangeRequests(); setRequests(reqs); }
  async function handleApprove(req: any) {
    await updateChangeRequest(req.id, "approved");
    const userRef = doc(db, "users", req.userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) { const current = userSnap.data().changesUsed || 0; await updateDoc(userRef, { changesUsed: current + 1 }); }
    loadRequests();
  }
  async function handleReject(req: any) { await updateChangeRequest(req.id, "rejected"); loadRequests(); }
  async function handleDone(req: any) { await updateChangeRequest(req.id, "done"); loadRequests(); }
  const pending = requests.filter((r) => r.status === "pending");
  const others = requests.filter((r) => r.status !== "pending");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Demandes de changement</h1>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><Clock className="w-5 h-5 text-amber-500" /> En attente ({pending.length})</h2>
        {pending.map((req) => (
          <div key={req.id} className="bg-white rounded-2xl border border-amber-200 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div><p className="text-sm text-gray-500 mb-1">{req.userName || req.userEmail} — {req.type.replace("_", " ")}</p><p className="text-gray-900 mb-4">{req.details}</p><div className="flex items-center gap-2 text-xs text-gray-400">{req.createdAt?.toDate?.().toLocaleDateString("fr-FR") || ""}</div></div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleApprove(req)} className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Approuver</button>
                <button onClick={() => handleReject(req)} className="px-4 py-2 rounded-xl bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200 transition flex items-center gap-1"><XCircle className="w-4 h-4" /> Refuser</button>
              </div>
            </div>
          </div>
        ))}
        {pending.length === 0 && <p className="text-gray-500 py-4">Aucune demande en attente.</p>}
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Historique</h2>
        {others.map((req) => (
          <div key={req.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 opacity-70">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-gray-500">{req.userEmail} — {req.type.replace("_", " ")}</p><p className="text-gray-700 text-sm mt-1">{req.details}</p></div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${req.status === "approved" ? "bg-green-100 text-green-700" : req.status === "done" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>{req.status === "approved" ? "Approuvée" : req.status === "done" ? "Terminée" : "Refusée"}</span>
            </div>
            {req.status === "approved" && (<button onClick={() => handleDone(req)} className="mt-3 px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition">Marquer comme terminée</button>)}
          </div>
        ))}
      </div>
    </div>
  );
}
