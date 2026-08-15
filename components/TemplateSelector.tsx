"use client";

import React from "react";

export const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    theme: {
      bg: "#ffffff",
      cardBg: "#ffffff",
      text: "#111827",
      primary: "#22c55e",
      accent: "#16a34a",
      borderRadius: "16px",
      shadow: "0 4px 20px rgba(0,0,0,0.08)",
      border: "1px solid #f3f4f6",
      fontStyle: "modern",
    },
  },
  {
    id: "glass",
    name: "Glass",
    theme: {
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      cardBg: "rgba(255,255,255,0.25)",
      text: "#ffffff",
      primary: "#ffffff",
      accent: "#e0e7ff",
      borderRadius: "24px",
      shadow: "0 8px 32px rgba(0,0,0,0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      fontStyle: "glass",
    },
  },
  {
    id: "dark",
    name: "Dark",
    theme: {
      bg: "#0f0f0f",
      cardBg: "#1a1a1a",
      text: "#f5f5f5",
      primary: "#a3e635",
      accent: "#84cc16",
      borderRadius: "12px",
      shadow: "0 4px 20px rgba(0,0,0,0.5)",
      border: "1px solid #2a2a2a",
      fontStyle: "dark",
    },
  },
  {
    id: "neon",
    name: "Néon",
    theme: {
      bg: "#050505",
      cardBg: "#0a0a0a",
      text: "#00ff88",
      primary: "#00ff88",
      accent: "#ff00ff",
      borderRadius: "8px",
      shadow: "0 0 20px rgba(0,255,136,0.3)",
      border: "1px solid #00ff88",
      fontStyle: "neon",
    },
  },
  {
    id: "pastel",
    name: "Pastel",
    theme: {
      bg: "#fef7ff",
      cardBg: "#ffffff",
      text: "#6b21a8",
      primary: "#c084fc",
      accent: "#a855f7",
      borderRadius: "28px",
      shadow: "0 8px 30px rgba(192,132,252,0.15)",
      border: "2px solid #f3e8ff",
      fontStyle: "soft",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    theme: {
      bg: "#fafafa",
      cardBg: "#ffffff",
      text: "#171717",
      primary: "#171717",
      accent: "#525252",
      borderRadius: "4px",
      shadow: "0 1px 3px rgba(0,0,0,0.05)",
      border: "1px solid #e5e5e5",
      fontStyle: "minimal",
    },
  },
  {
    id: "elegant",
    name: "Élégant",
    theme: {
      bg: "#0c0a09",
      cardBg: "#1c1917",
      text: "#f5f5f4",
      primary: "#d4af37",
      accent: "#fbbf24",
      borderRadius: "4px",
      shadow: "0 10px 40px rgba(0,0,0,0.4)",
      border: "1px solid #44403c",
      fontStyle: "elegant",
    },
  },
  {
    id: "cozy",
    name: "Cozy",
    theme: {
      bg: "#fff7ed",
      cardBg: "#ffedd5",
      text: "#7c2d12",
      primary: "#ea580c",
      accent: "#c2410c",
      borderRadius: "20px",
      shadow: "0 4px 15px rgba(234,88,12,0.1)",
      border: "2px solid #fed7aa",
      fontStyle: "cozy",
    },
  },
  {
    id: "ocean",
    name: "Océan",
    theme: {
      bg: "#ecfeff",
      cardBg: "#ffffff",
      text: "#164e63",
      primary: "#0891b2",
      accent: "#06b6d4",
      borderRadius: "16px",
      shadow: "0 8px 25px rgba(8,145,178,0.15)",
      border: "1px solid #cffafe",
      fontStyle: "ocean",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    theme: {
      bg: "linear-gradient(180deg, #fff1f2 0%, #fff7ed 100%)",
      cardBg: "#ffffff",
      text: "#881337",
      primary: "#e11d48",
      accent: "#f43f5e",
      borderRadius: "24px",
      shadow: "0 8px 30px rgba(225,29,72,0.15)",
      border: "1px solid #fecdd3",
      fontStyle: "sunset",
    },
  },
  {
    id: "forest",
    name: "Forest",
    theme: {
      bg: "#f0fdf4",
      cardBg: "#ffffff",
      text: "#14532d",
      primary: "#16a34a",
      accent: "#15803d",
      borderRadius: "12px",
      shadow: "0 4px 20px rgba(22,163,74,0.1)",
      border: "1px solid #bbf7d0",
      fontStyle: "nature",
    },
  },
  {
    id: "berry",
    name: "Berry",
    theme: {
      bg: "#fdf2f8",
      cardBg: "#ffffff",
      text: "#831843",
      primary: "#db2777",
      accent: "#be185d",
      borderRadius: "20px",
      shadow: "0 6px 25px rgba(219,39,119,0.12)",
      border: "1px solid #fbcfe8",
      fontStyle: "berry",
    },
  },
  {
    id: "mono",
    name: "Mono",
    theme: {
      bg: "#f8fafc",
      cardBg: "#ffffff",
      text: "#0f172a",
      primary: "#475569",
      accent: "#334155",
      borderRadius: "0px",
      shadow: "0 2px 8px rgba(0,0,0,0.06)",
      border: "1px solid #cbd5e1",
      fontStyle: "mono",
    },
  },
  {
    id: "playful",
    name: "Playful",
    theme: {
      bg: "#fef9c3",
      cardBg: "#ffffff",
      text: "#854d0e",
      primary: "#eab308",
      accent: "#ca8a04",
      borderRadius: "32px",
      shadow: "0 10px 30px rgba(234,179,8,0.15)",
      border: "3px solid #fde047",
      fontStyle: "playful",
    },
  },
  {
    id: "premium",
    name: "Premium",
    theme: {
      bg: "#09090b",
      cardBg: "#18181b",
      text: "#e4e4e7",
      primary: "#fbbf24",
      accent: "#f59e0b",
      borderRadius: "8px",
      shadow: "0 12px 40px rgba(0,0,0,0.6)",
      border: "1px solid #3f3f46",
      fontStyle: "premium",
    },
  },
];

interface TemplateSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export default function TemplateSelector({
  value,
  onChange,
}: TemplateSelectorProps) {
  const selectedTemplate = TEMPLATES.find((t) => t.id === value);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Template ({TEMPLATES.length} disponibles)
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {TEMPLATES.map((t) => {
          const isSelected = value === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`relative group flex flex-col items-center gap-2 p-2 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-green-500 bg-green-50 scale-105"
                  : "border-gray-200 hover:border-gray-300 hover:scale-102 bg-white"
              }`}
            >
              <div
                className="w-full h-16 rounded-lg relative overflow-hidden"
                style={{
                  background: t.theme.bg.includes("gradient")
                    ? t.theme.bg
                    : t.theme.bg,
                  border: t.theme.border,
                }}
              >
                <div
                  className="absolute inset-2 rounded-md flex items-center justify-center"
                  style={{
                    background: t.theme.cardBg,
                    borderRadius: t.theme.borderRadius,
                    boxShadow: t.theme.shadow,
                  }}
                >
                  <span
                    className="text-xs font-bold px-2 py-1 rounded"
                    style={{
                      background: t.theme.primary,
                      color:
                        t.id === "dark" ||
                        t.id === "neon" ||
                        t.id === "premium" ||
                        t.id === "elegant"
                          ? "#000"
                          : "#fff",
                    }}
                  >
                    Aa
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
              <span
                className={`text-xs ${
                  isSelected
                    ? "font-bold text-gray-900"
                    : "font-medium text-gray-500"
                }`}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>

      {selectedTemplate && (
        <div
          className="p-4 rounded-xl mt-4"
          style={{
            background: selectedTemplate.theme.bg.includes("gradient")
              ? undefined
              : selectedTemplate.theme.bg,
            backgroundImage: selectedTemplate.theme.bg.includes("gradient")
              ? selectedTemplate.theme.bg
              : undefined,
            border: selectedTemplate.theme.border,
            borderRadius: "12px",
          }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: selectedTemplate.theme.text }}
          >
            Aperçu : {selectedTemplate.name}
          </p>
          <div className="flex gap-2 mt-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: selectedTemplate.theme.primary,
                color: "#fff",
              }}
            >
              Bouton
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                background: selectedTemplate.theme.accent,
                color: "#fff",
              }}
            >
              Accent
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function getTemplateStyles(templateId: string) {
  const t = TEMPLATES.find((t) => t.id === templateId);
  return t?.theme || TEMPLATES[0].theme;
}
