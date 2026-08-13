"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";
import { MenuTemplate } from "@/components/templates";

const DEMO_RESTAURANT = {
  id: "demo",
  name: "Le Petit Bistro",
  description: "Cuisine marocaine authentique, fraîche et généreuse",
  phone: "+212 5XX-XXXXXX",
  address: "123 Rue des Oliviers, Casablanca",
  template: "modern",
  primaryColor: "#4f46e5",
  accentColor: "#7c3aed",
  languages: "fr,en",
};

const DEMO_CATEGORIES = [
  {
    id: "entrees",
    name: "Entrées",
    nameEn: "Starters",
    items: [
      {
        id: "salade",
        name: "Salade César",
        nameEn: "Caesar Salad",
        description: "Laitue romaine, poulet grillé, parmesan, croûtons",
        descEn: "Romaine lettuce, grilled chicken, parmesan, croutons",
        price: 45,
        image:
          "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
        available: true,
      },
      {
        id: "soupe",
        name: "Soupe Harira",
        nameEn: "Harira Soup",
        description:
          "Soupe traditionnelle marocaine aux lentilles et coriandre",
        descEn: "Traditional Moroccan soup with lentils and coriander",
        price: 28,
        available: true,
      },
      {
        id: "bricks",
        name: "Bricks au Thon",
        nameEn: "Tuna Briouats",
        description: "Feuilletés croustillants farcis au thon et aux œufs",
        descEn: "Crispy pastries stuffed with tuna and eggs",
        price: 35,
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
        available: true,
      },
    ],
  },
  {
    id: "plats",
    name: "Plats Principaux",
    nameEn: "Main Courses",
    items: [
      {
        id: "tajine",
        name: "Tajine de Poulet",
        nameEn: "Chicken Tagine",
        description: "Poulet mijoté avec olives, citron confit et épices",
        descEn: "Slow-cooked chicken with olives, preserved lemon and spices",
        price: 85,
        image:
          "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
        available: true,
      },
      {
        id: "couscous",
        name: "Couscous Royal",
        nameEn: "Royal Couscous",
        description: "Semoule fine, agneau, poulet, merguez et légumes",
        descEn: "Fine semolina, lamb, chicken, merguez and vegetables",
        price: 95,
        image:
          "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400",
        available: true,
      },
      {
        id: "pastilla",
        name: "Pastilla au Poulet",
        nameEn: "Chicken Pastilla",
        description: "Pigeon (poulet) aux amandes, cannelle et sucre glace",
        descEn: "Chicken with almonds, cinnamon and icing sugar",
        price: 75,
        available: true,
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    nameEn: "Desserts",
    items: [
      {
        id: "cornes",
        name: "Cornes de Gazelle",
        nameEn: "Gazelle Horns",
        description:
          "Pâtisseries fines fourrées aux amandes et eau de fleur d'oranger",
        descEn: "Fine pastries filled with almonds and orange blossom water",
        price: 25,
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
        available: true,
      },
      {
        id: "chebakia",
        name: "Chebakia",
        nameEn: "Chebakia",
        description: "Roses de sésame frites et enrobées de miel",
        descEn: "Fried sesame flowers coated in honey",
        price: 20,
        available: true,
      },
    ],
  },
];

const DEMO_TEMPLATES = [
  { id: "modern", name: "Modern", colorFrom: "#4f46e5", colorTo: "#7c3aed" },
  { id: "elegant", name: "Élégant", colorFrom: "#92400e", colorTo: "#b45309" },
  { id: "minimal", name: "Minimal", colorFrom: "#18181b", colorTo: "#3f3f46" },
  { id: "vibrant", name: "Vibrant", colorFrom: "#9333ea", colorTo: "#db2777" },
  { id: "nature", name: "Nature", colorFrom: "#166534", colorTo: "#10b981" },
  { id: "dark", name: "Dark", colorFrom: "#000000", colorTo: "#27272a" },
  { id: "cafe", name: "Café", colorFrom: "#78350f", colorTo: "#c2410c" },
  { id: "ocean", name: "Océan", colorFrom: "#155e75", colorTo: "#0369a1" },
  { id: "sunset", name: "Sunset", colorFrom: "#ea580c", colorTo: "#dc2626" },
  { id: "luxury", name: "Luxury", colorFrom: "#0f172a", colorTo: "#ca8a04" },
  { id: "fresh", name: "Fresh", colorFrom: "#3f6212", colorTo: "#22c55e" },
  { id: "cozy", name: "Cozy", colorFrom: "#881337", colorTo: "#e11d48" },
  { id: "urban", name: "Urban", colorFrom: "#18181b", colorTo: "#52525b" },
  {
    id: "tropical",
    name: "Tropical",
    colorFrom: "#0f766e",
    colorTo: "#10b981",
  },
  { id: "classic", name: "Classic", colorFrom: "#44403c", colorTo: "#78716c" },
];

export default function DemoPage() {
  const [demoTemplate, setDemoTemplate] = useState("modern");
  const [demoLang, setDemoLang] = useState("fr");

  const demoRestaurant = { ...DEMO_RESTAURANT, template: demoTemplate };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barre en haut */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Retour
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <span className="font-semibold text-gray-900">Démo YENO</span>
          </div>
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">
              Scannez ce menu avec votre téléphone
            </span>
          </div>
        </div>
      </div>

      {/* Sélecteur de template */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-500 mb-3 text-center">
            Cliquez sur un template pour tester :
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {DEMO_TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setDemoTemplate(t.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border-2 transition ${
                  demoTemplate === t.id
                    ? "border-yeno-500 bg-yeno-50 text-yeno-700 font-semibold"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${t.colorFrom}, ${t.colorTo})`,
                  }}
                />
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Le menu */}
      <div className="max-w-5xl mx-auto p-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
          <div className="bg-gray-900 text-white text-xs px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <span className="opacity-60 ml-2">yeno.ma/menu/demo</span>
          </div>
          <div className="max-h-[700px] overflow-y-auto">
            <MenuTemplate
              restaurant={demoRestaurant}
              categoriesWithItems={DEMO_CATEGORIES}
              lang={demoLang}
              setLang={setDemoLang}
              showLangSwitcher={true}
              langs={["fr", "en"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
