"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { getRestaurant, updateRestaurant } from "@/lib/firebase-utils";
import { TEMPLATES } from "@/types";
import { Save } from "lucide-react";
import TemplateSelector from "@/components/TemplateSelector";

export default function SettingsPage() {
  const { userData } = useAuth();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    phone: "",
    address: "",
    primaryColor: "#22c55e",
    accentColor: "#16a34a",
    template: "modern",
    logo: "",
    slug: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      if (!userData?.uid) return;
      const data = await getRestaurant(userData.uid);
      if (data) {
        setRestaurant(data);
        setForm({
          name: data.name || "",
          description: data.description || "",
          phone: data.phone || "",
          address: data.address || "",
          primaryColor: data.primaryColor || "#22c55e",
          accentColor: data.accentColor || "#16a34a",
          template: data.template || "modern",
          logo: data.logo || "",
          slug: data.slug || "",
        });
      }
    }
    load();
  }, [userData]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!userData?.uid) return;
    setSaving(true);
    setMessage("");
    try {
      await updateRestaurant(userData.uid, form);
      setMessage("✅ Enregistré !");
    } catch {
      setMessage("❌ Erreur");
    }
    setSaving(false);
  }

  const availableTemplates =
    userData?.plan === "standard" ? TEMPLATES.slice(0, 6) : TEMPLATES;

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>

      {message && (
        <div className="p-4 rounded-xl bg-green-50 text-green-700 font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom du restaurant
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full p-3 rounded-xl border border-gray-200"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur principale
            </label>
            <input
              type="color"
              value={form.primaryColor}
              onChange={(e) =>
                setForm({ ...form, primaryColor: e.target.value })
              }
              className="w-full h-12 rounded-xl border border-gray-200 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur d'accent
            </label>
            <input
              type="color"
              value={form.accentColor}
              onChange={(e) =>
                setForm({ ...form, accentColor: e.target.value })
              }
              className="w-full h-12 rounded-xl border border-gray-200 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full p-3 rounded-xl border border-gray-200"
          />
        </div>

        <TemplateSelector
          value={form.template}
          onChange={(id) => setForm({ ...form, template: id })}
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-6 rounded-xl bg-green-500 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}
