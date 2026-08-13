"use client";

import React from "react";

const TEMPLATES = [
  { id: "modern",  name: "Moderne",   colorFrom: "#4f46e5", colorTo: "#7c3aed" },
  { id: "elegant", name: "Élégant",   colorFrom: "#92400e", colorTo: "#b45309" },
  { id: "minimal", name: "Minimal",   colorFrom: "#18181b", colorTo: "#3f3f46" },
  { id: "vibrant", name: "Vibrant",   colorFrom: "#9333ea", colorTo: "#db2777" },
  { id: "nature",  name: "Nature",    colorFrom: "#166534", colorTo: "#10b981" },
  { id: "dark",    name: "Dark Mode", colorFrom: "#000000", colorTo: "#27272a" },
  { id: "cafe",    name: "Café",      colorFrom: "#78350f", colorTo: "#c2410c" },
  { id: "ocean",   name: "Océan",     colorFrom: "#155e75", colorTo: "#0369a1" },
  { id: "sunset",  name: "Sunset",    colorFrom: "#ea580c", colorTo: "#dc2626" },
  { id: "luxury",  name: "Luxury",    colorFrom: "#0f172a", colorTo: "#ca8a04" },
  { id: "fresh",   name: "Fresh",     colorFrom: "#3f6212", colorTo: "#22c55e" },
  { id: "cozy",    name: "Cozy",      colorFrom: "#881337", colorTo: "#e11d48" },
  { id: "urban",   name: "Urban",     colorFrom: "#18181b", colorTo: "#52525b" },
  { id: "tropical",name: "Tropical",  colorFrom: "#0f766e", colorTo: "#10b981" },
  { id: "classic", name: "Classic",   colorFrom: "#44403c", colorTo: "#78716c" },
];

interface TemplateSelectorProps {
  value: string;
  onChange: (id: string) => void;
}

export default function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <div style={{ marginTop: "24px" }}>
      <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "12px" }}>
        Template
      </label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "12px" }}>
        {TEMPLATES.map((t) => {
          const isSelected = value === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "8px",
                borderRadius: "12px",
                border: isSelected ? "3px solid #22c55e" : "2px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: isSelected ? "0 4px 12px rgba(34,197,94,0.2)" : "none",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "60px",
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${t.colorFrom} 0%, ${t.colorTo} 100%)`,
                  position: "relative",
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      width: "20px",
                      height: "20px",
                      background: "#22c55e",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? "#111827" : "#6b7280",
                }}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
