"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { getRestaurant, getChangeRequests } from "@/lib/firebase-utils";
import { QrCode, Utensils, RefreshCw, Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { userData } = useAuth();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userData?.uid) {
      getRestaurant(userData.uid)
        .then(setRestaurant)
        .catch((err) => {
          console.error("Erreur getRestaurant:", err);
          setError("Impossible de charger le restaurant");
        });
      getChangeRequests(userData.uid)
        .then(setRequests)
        .catch((err) => {
          console.error("Erreur getChangeRequests:", err);
        });
    }
  }, [userData]);

  if (!userData) return <div className="p-8">Chargement...</div>;

  const changesLimit = userData.changesLimit ?? 10;
  const changesUsed = userData.changesUsed ?? 0;
  const changesLeft = changesLimit - changesUsed;

  let planExpiry: Date;
  try {
    if (userData.planExpiry?.toDate) {
      planExpiry = userData.planExpiry.toDate();
    } else if (userData.planExpiry) {
      planExpiry = new Date(userData.planExpiry);
    } else {
      planExpiry = new Date();
    }
  } catch {
    planExpiry = new Date();
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
          {error}
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-yeno-100 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-yeno-600" />
            </div>
            <span className="text-sm text-gray-500">Restaurant</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {restaurant?.name || "Non configuré"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Changements restants</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {changesLeft === 9999
              ? "Illimités"
              : `${changesLeft} / ${changesLimit}`}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Expire le</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {planExpiry.toLocaleDateString("fr-FR")}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-sm text-gray-500">Plan</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 capitalize">
            {userData.plan || "standard"}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Actions rapides
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard/menu"
            className="px-6 py-3 rounded-xl bg-yeno-500 text-white font-medium hover:bg-yeno-600 transition"
          >
            Modifier mon menu
          </Link>
          <Link
            href="/dashboard/qr-code"
            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            Voir mon QR Code
          </Link>
          <Link
            href="/dashboard/requests"
            className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            Nouvelle demande (
            {requests.filter((r) => r.status === "pending").length})
          </Link>
        </div>
      </div>
    </div>
  );
}
