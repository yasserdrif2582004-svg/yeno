"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { getChangeRequests, createChangeRequest } from "@/lib/firebase-utils";
import { Send, Clock, CheckCircle, XCircle } from "lucide-react";

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock className="w-4 h-4 text-amber-500" />,
  approved: <CheckCircle className="w-4 h-4 text-green-500" />,
  rejected: <XCircle className="w-4 h-4 text-red-500" />,
  done: <CheckCircle className="w-4 h-4 text-blue-500" />,
};

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  approved: "Approuvée",
  rejected: "Refusée",
  done: "Terminée",
};

export default function RequestsPage() {
  const { userData } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [newRequest, setNewRequest] = useState({
    type: "menu_update",
    details: "",
  });

  useEffect(() => {
    if (userData?.uid) loadRequests();
  }, [userData]);

  async function loadRequests() {
    if (!userData?.uid) return;
    const reqs = await getChangeRequests(userData.uid);
    setRequests(reqs);
  }

  async function handleSubmit() {
    if (!newRequest.details.trim() || !userData?.uid) return;

    // 1. Enregistre dans Firestore
    await createChangeRequest({
      type: newRequest.type,
      details: newRequest.details,
      userId: userData.uid,
      userName: userData.name || "Anonyme",
      userEmail: userData.email || "",
    });

    // 2. Envoie un email à toi-même
    try {
      await emailjs.send(
        "service_azihxt2",
        "template_5uh1r2i",
        {
          from_name: userData.name || "Client",
          from_email: userData.email || "non-renseigné",
          type: newRequest.type,
          details: newRequest.details,
        },
        "0El68FDuLnHZddIiw"
      );
      console.log("✅ Email envoyé avec succès !");
    } catch (err) {
      console.error("❌ Erreur email:", err);
    }

    setNewRequest({ type: "menu_update", details: "" });
    loadRequests();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* ─── Formulaire ─── */}
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
        <h2 className="text-xl font-semibold">Nouvelle demande</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Type de demande
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newRequest.type}
            onChange={(e) =>
              setNewRequest({ ...newRequest, type: e.target.value })
            }
          >
            <option value="menu_update">Mise à jour du menu</option>
            <option value="info_change">Modification d'informations</option>
            <option value="other">Autre</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Détails</label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            placeholder="Décrivez votre demande..."
            value={newRequest.details}
            onChange={(e) =>
              setNewRequest({ ...newRequest, details: e.target.value })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!newRequest.details.trim()}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
          Envoyer la demande
        </button>
      </div>

      {/* ─── Liste des demandes ─── */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mes demandes</h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-xl border border-dashed">
            Aucune demande pour le moment.
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((req: any) => (
              <div
                key={req.id}
                className="bg-white rounded-xl border p-4 flex items-start justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium capitalize">
                      {req.type?.replace("_", " ")}
                    </span>
                    <span className="text-xs text-gray-400">
                      {req.createdAt?.toDate
                        ? req.createdAt.toDate().toLocaleDateString("fr-FR")
                        : req.createdAt
                        ? new Date(req.createdAt).toLocaleDateString("fr-FR")
                        : ""}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{req.details}</p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 text-xs font-medium">
                  {STATUS_ICONS[req.status] || STATUS_ICONS.pending}
                  <span>{STATUS_LABELS[req.status] || "En attente"}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
