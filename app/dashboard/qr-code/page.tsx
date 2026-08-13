"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { getRestaurant } from "@/lib/firebase-utils";
import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function QRCodePage() {
  const { userData } = useAuth();
  const [restaurant, setRestaurant] = useState<any>({});
  const [qrUrl, setQrUrl] = useState("");
  const [menuUrl, setMenuUrl] = useState("");

  useEffect(() => {
    if (userData?.uid) {
      getRestaurant(userData.uid).then((r) => {
        const slug = r?.slug || `restaurant-${userData.uid.slice(-6)}`;
        const url = `${window.location.origin}/menu/${slug}`;
        setMenuUrl(url);
        setQrUrl(
          `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
            url
          )}`
        );
        if (r) setRestaurant(r);
      });
    }
  }, [userData]);

  if (!userData) return <div className="p-8">Chargement...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Mon Code QR</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="inline-block p-4 rounded-2xl bg-white border-2 border-gray-100 mb-6">
            {qrUrl ? (
              <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
            ) : (
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Chargement...
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-3">
            <a
              href={qrUrl}
              download={`yeno-${restaurant.slug || "menu"}-qr.png`}
              className="px-6 py-3 rounded-xl bg-yeno-500 text-white font-medium hover:bg-yeno-600 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Télécharger
            </a>
            <Link
              href={menuUrl}
              target="_blank"
              className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Voir le menu
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Instructions
          </h2>
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-yeno-100 text-yeno-700 flex items-center justify-center text-sm font-bold shrink-0">
                1
              </span>
              Téléchargez votre code QR en haute résolution
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-yeno-100 text-yeno-700 flex items-center justify-center text-sm font-bold shrink-0">
                2
              </span>
              Imprimez-le sur du papier adhésif ou plastifié
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-yeno-100 text-yeno-700 flex items-center justify-center text-sm font-bold shrink-0">
                3
              </span>
              Placez-le sur vos tables ou comptoir
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-yeno-100 text-yeno-700 flex items-center justify-center text-sm font-bold shrink-0">
                4
              </span>
              Vos clients scannent et accèdent instantanément au menu !
            </li>
          </ol>
          <div className="mt-6 p-4 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">URL de votre menu</p>
            <p className="font-mono text-sm text-gray-700 break-all">
              {menuUrl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
