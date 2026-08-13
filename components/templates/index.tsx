"use client";

import React, { useState } from "react";

// ═══════════════════════════════════════════════════════════
// INTERFACES
// ═══════════════════════════════════════════════════════════
export interface Item {
  id: string;
  name: string;
  nameEn?: string;
  nameEs?: string;
  description?: string;
  descEn?: string;
  descEs?: string;
  price: number;
  image?: string;
  available?: boolean;
}

export interface Category {
  id: string;
  name: string;
  nameEn?: string;
  nameEs?: string;
  items?: Item[];
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  phone?: string;
  address?: string;
  template?: string;
  primaryColor?: string;
  accentColor?: string;
  languages?: string;
}

export interface TemplateProps {
  restaurant: Restaurant;
  categoriesWithItems: Category[];
  lang: string;
  setLang: (l: string) => void;
  showLangSwitcher: boolean;
  langs: string[];
}

// ═══════════════════════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════════════════════
function t(field: "name" | "description", item: Item | Category, lang: string): string {
  if (lang === "fr") return (item as any)[field] || "";
  const alt = (item as any)[`${field}${lang.toUpperCase()}`];
  return alt || (item as any)[field] || "";
}

function formatPriceDH(price: number): string {
  return `${price.toFixed(0)} DH`;
}

function ItemImage({ src, size = "normal" }: { src?: string; size?: "small" | "normal" | "large" }) {
  if (!src) return null;
  const sizes = {
    small: { width: "60px", height: "60px" },
    normal: { width: "80px", height: "80px" },
    large: { width: "100%", height: "160px" },
  };
  return (
    <div style={{
      ...sizes[size],
      borderRadius: size === "large" ? "12px 12px 0 0" : "10px",
      backgroundImage: `url(${src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      flexShrink: 0,
    }} />
  );
}

function RestaurantInfo({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginTop: "16px", fontSize: "13px", flexWrap: "wrap", opacity: 0.8 }}>
      {restaurant.phone && <span>📞 {restaurant.phone}</span>}
      {restaurant.address && <span>📍 {restaurant.address}</span>}
    </div>
  );
}

function LangSwitcher({ lang, setLang, langs, dark }: { lang: string; setLang: (l: string) => void; langs: string[]; dark?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", padding: "10px 24px" }}>
      {langs.map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: "6px 14px", borderRadius: "20px", border: "none", fontSize: "12px", fontWeight: 600,
          cursor: "pointer", background: lang === l ? (dark ? "#fff" : "#111") : "rgba(0,0,0,0.04)",
          color: lang === l ? (dark ? "#111" : "#fff") : "rgba(0,0,0,0.4)", transition: "all 0.2s"
        }}>{l.toUpperCase()}</button>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 1 : MINIMAL
// ═══════════════════════════════════════════════════════════
export function MinimalTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#1a1a1a";
  const accent = restaurant.accentColor || primary;
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: primary, background: "#fff", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, padding: "80px 24px 60px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, margin: "0 0 8px", letterSpacing: "-1px" }}>{restaurant.name}</h1>
        <p style={{ opacity: 0.8, fontSize: "16px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #eee", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "800px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#f3f4f6",
              color: activeCat === cat.id ? "#fff" : "#6b7280", transition: "all 0.2s"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "20px 0", borderBottom: "1px solid #f3f4f6" }}>
                <ItemImage src={item.image} size="small" />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "17px", fontWeight: 600, margin: "0 0 4px" }}>{t("name", item, lang)}</h3>
                  <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
                <span style={{ fontSize: "18px", fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.6)", padding: "40px 24px", textAlign: "center", fontSize: "13px" }}>
        <p>{restaurant.name} — Menu digitalisé avec YENO</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 2 : MODERN
// ═══════════════════════════════════════════════════════════
export function ModernTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#4f46e5";
  const accent = restaurant.accentColor || "#7c3aed";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1f2937", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, padding: "60px 24px", textAlign: "center", color: "#fff" }}>
        {restaurant.logo && <img src={restaurant.logo} alt="" style={{ width: "80px", height: "80px", borderRadius: "20px", objectFit: "cover", marginBottom: "16px" }} />}
        <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, margin: "0 0 8px" }}>{restaurant.name}</h1>
        <p style={{ opacity: 0.8 }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </div>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #e5e7eb", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1100px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#f3f4f6",
              color: activeCat === cat.id ? "#fff" : "#6b7280"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {cat.items?.filter(i => i.available !== false).map(item => (
                <div key={item.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #e5e7eb" }}>
                  <ItemImage src={item.image} size="large" />
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>{t("name", item, lang)}</h3>
                      <span style={{ fontSize: "15px", fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>{t("description", item, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <footer style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: "30px 24px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
        <p>{restaurant.name}</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 3 : ELEGANT
// ═══════════════════════════════════════════════════════════
export function ElegantTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#3d2b1f";
  const accent = restaurant.accentColor || "#c9a96e";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "Georgia, serif", color: primary, background: "#faf8f5", minHeight: "100vh" }}>
      <div style={{ background: primary, padding: "60px 24px", textAlign: "center", color: "#fff" }}>
        <div style={{ width: "60px", height: "1px", background: accent, margin: "0 auto 24px" }} />
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, margin: "0 0 12px", letterSpacing: "2px", textTransform: "uppercase" }}>{restaurant.name}</h1>
        <p style={{ opacity: 0.7, fontStyle: "italic" }}>{restaurant.description}</p>
        <div style={{ width: "60px", height: "1px", background: accent, margin: "24px auto 0" }} />
        <RestaurantInfo restaurant={restaurant} />
      </div>
      {showLangSwitcher && (
        <div style={{ textAlign: "center", padding: "10px", borderBottom: "1px solid rgba(61,43,31,0.08)" }}>
          {langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              margin: "0 4px", padding: "6px 16px", border: `1px solid ${lang === l ? primary : "#ddd"}`,
              borderRadius: "4px", background: lang === l ? primary : "transparent", color: lang === l ? "#fff" : "#666",
              cursor: "pointer", fontSize: "12px"
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
      )}
      <div style={{ background: "#faf8f5", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(61,43,31,0.08)", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "transparent",
              color: activeCat === cat.id ? "#fff" : "rgba(61,43,31,0.5)"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "50px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id}>
            <h2 style={{ textAlign: "center", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: accent, marginBottom: "30px" }}>{t("name", cat, lang)}</h2>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ display: "flex", gap: "16px", alignItems: "center", padding: "20px 0", borderBottom: "1px solid rgba(61,43,31,0.06)" }}>
                <ItemImage src={item.image} size="small" />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>{t("name", item, lang)}</h3>
                    <div style={{ flex: 1, maxWidth: "100px", borderBottom: "1px dotted rgba(61,43,31,0.2)" }} />
                    <span style={{ fontSize: "17px", fontWeight: 600, color: accent }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "rgba(61,43,31,0.5)", margin: 0, fontStyle: "italic" }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.5)", padding: "40px 24px", textAlign: "center" }}>
        <p>{restaurant.name}</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 4 : DARK
// ═══════════════════════════════════════════════════════════
export function DarkTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#0a0a0a";
  const accent = restaurant.accentColor || "#d4af37";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#e5e5e5", background: "#0a0a0a", minHeight: "100vh" }}>
      <header style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "2px", textTransform: "uppercase" }}>{restaurant.name}</span>
        <div style={{ display: "flex", gap: "12px" }}>
          {showLangSwitcher && langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ background: "none", border: "none", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", cursor: "pointer", color: lang === l ? accent : "rgba(255,255,255,0.3)", letterSpacing: "1px" }}>{l}</button>
          ))}
        </div>
      </header>
      <div style={{ padding: "60px 24px", textAlign: "center" }}>
        {restaurant.logo && <img src={restaurant.logo} alt="" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "24px", border: `2px solid ${accent}` }} />}
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "#fff", margin: "0 0 12px" }}>{restaurant.name}</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: "500px", margin: "0 auto" }}>{restaurant.description}</p>
        <div style={{ width: "50px", height: "2px", background: accent, margin: "24px auto 0" }} />
        <RestaurantInfo restaurant={restaurant} />
      </div>
      <div style={{ background: "rgba(255,255,255,0.02)", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "4px", maxWidth: "1200px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 22px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? accent : "rgba(255,255,255,0.05)",
              color: activeCat === cat.id ? "#0a0a0a" : "rgba(255,255,255,0.5)"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "24px", marginBottom: "12px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <ItemImage src={item.image} size="normal" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", margin: 0 }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: accent }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "30px 24px", textAlign: "center", color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>
        <p>{restaurant.name}</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 5 : CAFE
// ═══════════════════════════════════════════════════════════
export function CafeTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#5d4037";
  const accent = restaurant.accentColor || "#d4a574";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#3e2723", background: "#fdf6e3", minHeight: "100vh" }}>
      <header style={{ background: primary, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff" }}>☕ {restaurant.name}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {showLangSwitcher && langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ background: "none", border: "none", fontSize: "11px", fontWeight: 600, cursor: "pointer", color: lang === l ? "#fff" : "rgba(255,255,255,0.5)" }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </header>
      <div style={{ background: `linear-gradient(180deg, ${primary}, ${accent}60)`, padding: "50px 24px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, margin: "0 0 8px" }}>{restaurant.name}</h1>
        <p style={{ opacity: 0.8 }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </div>
      <div style={{ background: "#fff", borderBottom: "2px solid #f0e6d2", position: "sticky", top: 0, zIndex: 50, overflowX: "auto" }}>
        <div style={{ display: "flex", maxWidth: "1100px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "16px 24px", border: "none", borderBottom: `3px solid ${activeCat === cat.id ? accent : "transparent"}`,
              background: "transparent", fontSize: "14px", fontWeight: activeCat === cat.id ? 700 : 500,
              color: activeCat === cat.id ? primary : "rgba(62,39,35,0.4)", cursor: "pointer", whiteSpace: "nowrap"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 12px rgba(93,64,55,0.06)", border: "1px solid #f0e6d2", position: "relative", overflow: "hidden" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: accent }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", marginTop: item.image ? "12px" : "0" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: primary, margin: 0 }}>{t("name", item, lang)}</h3>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: accent }}>{formatPriceDH(item.price)}</span>
                </div>
                <p style={{ fontSize: "13px", color: "rgba(62,39,35,0.55)", margin: 0 }}>{t("description", item, lang)}</p>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.5)", padding: "30px 24px", textAlign: "center" }}>
        <p>{restaurant.name}</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 6 : VIBRANT
// ═══════════════════════════════════════════════════════════
export function VibrantTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#7c3aed";
  const accent = restaurant.accentColor || "#ec4899";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1e1b4b", background: "#faf5ff", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(135deg, ${primary}, ${accent})`, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>{restaurant.name}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          {showLangSwitcher && langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ background: "none", border: "none", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: lang === l ? "#fff" : "rgba(255,255,255,0.5)" }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </header>
      <div style={{ padding: "50px 24px", textAlign: "center", background: "#fff" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, background: `linear-gradient(135deg, ${primary}, ${accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 8px" }}>{restaurant.name}</h1>
        <p style={{ color: "rgba(30,27,75,0.5)" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </div>
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(0,0,0,0.05)", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1200px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 700,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? `linear-gradient(135deg, ${primary}, ${accent})` : "#f3e8ff",
              color: activeCat === cat.id ? "#fff" : primary
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.08)" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: accent }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "rgba(30,27,75,0.45)", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, padding: "30px 24px", textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
        <p>{restaurant.name}</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 7 : NATURE
// ═══════════════════════════════════════════════════════════
export function NatureTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#2d5a27";
  const accent = restaurant.accentColor || "#8bc34a";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1b3a1a", background: "#f1f8e9", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(135deg, ${primary}, #4a7c43)`, padding: "70px 24px 50px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, margin: "0 0 10px" }}>🌿 {restaurant.name}</h1>
        <p style={{ opacity: 0.85, fontSize: "16px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #c8e6c9", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1000px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#e8f5e9",
              color: activeCat === cat.id ? "#fff" : "#2d5a27"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(45,90,39,0.08)", border: "1px solid #c8e6c9" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: primary }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#558b2f", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.6)", padding: "35px 24px", textAlign: "center", fontSize: "13px" }}>
        <p>{restaurant.name} — Menu frais & naturel</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 8 : OCEAN
// ═══════════════════════════════════════════════════════════
export function OceanTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#006064";
  const accent = restaurant.accentColor || "#00bcd4";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#004d40", background: "#e0f7fa", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(180deg, ${primary}, #00838f)`, padding: "70px 24px 50px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, margin: "0 0 10px" }}>🌊 {restaurant.name}</h1>
        <p style={{ opacity: 0.85, fontSize: "16px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "2px solid #b2ebf2", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1000px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#e0f7fa",
              color: activeCat === cat.id ? "#fff" : "#006064"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,96,100,0.08)", border: "1px solid #b2ebf2" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: primary }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#00838f", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.6)", padding: "35px 24px", textAlign: "center", fontSize: "13px" }}>
        <p>{restaurant.name} — Saveurs de l'océan</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 9 : SUNSET
// ═══════════════════════════════════════════════════════════
export function SunsetTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#e65100";
  const accent = restaurant.accentColor || "#ff9800";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#3e2723", background: "#fff3e0", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(135deg, #ff6f00, ${accent}, #ffcc80)`, padding: "70px 24px 50px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, margin: "0 0 10px", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>🌅 {restaurant.name}</h1>
        <p style={{ opacity: 0.9, fontSize: "16px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #ffe0b2", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1000px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#fff3e0",
              color: activeCat === cat.id ? "#fff" : "#e65100"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(230,81,0,0.08)", border: "1px solid #ffe0b2" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: primary }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#bf360c", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.7)", padding: "35px 24px", textAlign: "center", fontSize: "13px" }}>
        <p>{restaurant.name} — Menu coucher de soleil</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 10 : LUXURY
// ═══════════════════════════════════════════════════════════
export function LuxuryTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#1a1a1a";
  const accent = restaurant.accentColor || "#c9a227";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#1a1a1a", background: "#fafafa", minHeight: "100vh" }}>
      <header style={{ background: "#0a0a0a", padding: "80px 24px 60px", textAlign: "center", color: "#fff", borderBottom: `3px solid ${accent}` }}>
        <div style={{ width: "80px", height: "2px", background: accent, margin: "0 auto 28px" }} />
        <h1 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 400, margin: "0 0 12px", letterSpacing: "4px", textTransform: "uppercase" }}>{restaurant.name}</h1>
        <p style={{ opacity: 0.6, fontStyle: "italic", fontSize: "15px" }}>{restaurant.description}</p>
        <div style={{ width: "80px", height: "2px", background: accent, margin: "28px auto 0" }} />
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && (
        <div style={{ textAlign: "center", padding: "12px", background: "#f5f5f5", borderBottom: "1px solid #e0e0e0" }}>
          {langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              margin: "0 6px", padding: "6px 18px", border: `1px solid ${lang === l ? accent : "#ccc"}`,
              background: lang === l ? "#0a0a0a" : "transparent", color: lang === l ? accent : "#666",
              cursor: "pointer", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase"
            }}>{l}</button>
          ))}
        </div>
      )}
      <div style={{ background: "#fafafa", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #e0e0e0", padding: "14px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 24px", border: "none", background: "transparent", fontSize: "12px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "2px", textTransform: "uppercase",
              color: activeCat === cat.id ? accent : "#999", borderBottom: `2px solid ${activeCat === cat.id ? accent : "transparent"}`
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "50px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id}>
            <h2 style={{ textAlign: "center", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: accent, marginBottom: "40px" }}>{t("name", cat, lang)}</h2>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ display: "flex", gap: "20px", alignItems: "center", padding: "24px 0", borderBottom: "1px solid #eee" }}>
                <ItemImage src={item.image} size="normal" />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "17px", fontWeight: 400, margin: 0, letterSpacing: "1px" }}>{t("name", item, lang)}</h3>
                    <div style={{ flex: 1, maxWidth: "120px", borderBottom: `1px dotted ${accent}` }} />
                    <span style={{ fontSize: "16px", fontWeight: 600, color: accent }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#999", margin: 0, fontStyle: "italic" }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: "#0a0a0a", color: "rgba(255,255,255,0.3)", padding: "40px 24px", textAlign: "center", fontSize: "12px", letterSpacing: "2px" }}>
        <p>{restaurant.name}</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 11 : FRESH
// ═══════════════════════════════════════════════════════════
export function FreshTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#43a047";
  const accent = restaurant.accentColor || "#ffeb3b";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#1b5e20", background: "#f9fbe7", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(135deg, ${primary}, #66bb6a)`, padding: "70px 24px 50px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, margin: "0 0 10px" }}>🥗 {restaurant.name}</h1>
        <p style={{ opacity: 0.9, fontSize: "16px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "2px solid #c5e1a5", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1000px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#f1f8e9",
              color: activeCat === cat.id ? "#fff" : "#2e7d32"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(67,160,71,0.08)", border: "1px solid #c5e1a5" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: primary }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#2e7d32", whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#558b2f", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.7)", padding: "35px 24px", textAlign: "center", fontSize: "13px" }}>
        <p>{restaurant.name} — Fraîcheur garantie</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 12 : COZY
// ═══════════════════════════════════════════════════════════
export function CozyTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#6d4c41";
  const accent = restaurant.accentColor || "#ffcc80";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#3e2723", background: "#fff8e1", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(135deg, ${primary}, #8d6e63)`, padding: "70px 24px 50px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, margin: "0 0 10px" }}>🏠 {restaurant.name}</h1>
        <p style={{ opacity: 0.9, fontSize: "16px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #ffe0b2", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1000px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#fff3e0",
              color: activeCat === cat.id ? "#fff" : "#5d4037"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 16px rgba(109,76,65,0.08)", border: "1px solid #ffe0b2" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: primary }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#e65100", whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#8d6e63", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.6)", padding: "35px 24px", textAlign: "center", fontSize: "13px" }}>
        <p>{restaurant.name} — Ambiance chaleureuse</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 13 : URBAN
// ═══════════════════════════════════════════════════════════
export function UrbanTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#37474f";
  const accent = restaurant.accentColor || "#ff5722";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#263238", background: "#eceff1", minHeight: "100vh" }}>
      <header style={{ background: primary, padding: "60px 24px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-1px" }}>{restaurant.name}</h1>
        <p style={{ opacity: 0.7, fontSize: "15px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} dark />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "2px solid #cfd8dc", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "4px", maxWidth: "1100px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "4px", border: "none", fontSize: "13px", fontWeight: 700,
              cursor: "pointer", whiteSpace: "nowrap", textTransform: "uppercase", letterSpacing: "1px",
              background: activeCat === cat.id ? accent : "transparent",
              color: activeCat === cat.id ? "#fff" : "#78909c"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {cat.items?.filter(i => i.available !== false).map(item => (
                <div key={item.id} style={{ background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #cfd8dc" }}>
                  <ItemImage src={item.image} size="large" />
                  <div style={{ padding: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 800, margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>{t("name", item, lang)}</h3>
                      <span style={{ fontSize: "14px", fontWeight: 800, color: accent, whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#90a4ae", margin: 0, lineHeight: 1.5 }}>{t("description", item, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <footer style={{ background: "#263238", color: "rgba(255,255,255,0.3)", padding: "30px 24px", textAlign: "center", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px" }}>
        <p>{restaurant.name}</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 14 : TROPICAL
// ═══════════════════════════════════════════════════════════
export function TropicalTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#e91e63";
  const accent = restaurant.accentColor || "#ffeb3b";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", color: "#880e4f", background: "#fffde7", minHeight: "100vh" }}>
      <header style={{ background: `linear-gradient(135deg, #f06292, ${primary}, #9c27b0)`, padding: "70px 24px 50px", textAlign: "center", color: "#fff" }}>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 800, margin: "0 0 10px", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>🌺 {restaurant.name}</h1>
        <p style={{ opacity: 0.9, fontSize: "16px" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && <LangSwitcher lang={lang} setLang={setLang} langs={langs} />}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #f8bbd0", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "8px", maxWidth: "1000px", margin: "0 auto" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", borderRadius: "100px", border: "none", fontSize: "13px", fontWeight: 700,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "#fce4ec",
              color: activeCat === cat.id ? "#fff" : "#c2185b"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 20px rgba(233,30,99,0.08)", border: "1px solid #f8bbd0" }}>
                <ItemImage src={item.image} size="large" />
                <div style={{ padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: primary }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#ad1457", whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#880e4f", margin: 0 }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: primary, color: "rgba(255,255,255,0.7)", padding: "35px 24px", textAlign: "center", fontSize: "13px" }}>
        <p>{restaurant.name} — Saveurs tropicales</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEMPLATE 15 : CLASSIC
// ═══════════════════════════════════════════════════════════
export function ClassicTemplate({ restaurant, categoriesWithItems, lang, setLang, showLangSwitcher, langs }: TemplateProps) {
  const [activeCat, setActiveCat] = useState(categoriesWithItems[0]?.id || "");
  const primary = restaurant.primaryColor || "#1565c0";
  const accent = restaurant.accentColor || "#ef5350";
  const validCats = categoriesWithItems.filter(c => c.items?.some(i => i.available !== false));

  return (
    <div style={{ fontFamily: "Georgia, serif", color: "#263238", background: "#fff", minHeight: "100vh" }}>
      <header style={{ background: primary, padding: "60px 24px", textAlign: "center", color: "#fff", borderBottom: `4px solid ${accent}` }}>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, margin: "0 0 10px" }}>{restaurant.name}</h1>
        <p style={{ opacity: 0.85, fontSize: "16px", fontStyle: "italic" }}>{restaurant.description}</p>
        <RestaurantInfo restaurant={restaurant} />
      </header>
      {showLangSwitcher && (
        <div style={{ textAlign: "center", padding: "10px", background: "#f5f5f5", borderBottom: "1px solid #e0e0e0" }}>
          {langs.map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              margin: "0 4px", padding: "6px 16px", border: `1px solid ${lang === l ? primary : "#ccc"}`,
              borderRadius: "4px", background: lang === l ? primary : "transparent", color: lang === l ? "#fff" : "#666",
              cursor: "pointer", fontSize: "12px"
            }}>{l.toUpperCase()}</button>
          ))}
        </div>
      )}
      <div style={{ background: "#fff", position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #e0e0e0", padding: "12px 24px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
          {validCats.map(cat => (
            <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
              padding: "10px 20px", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", background: activeCat === cat.id ? primary : "transparent",
              color: activeCat === cat.id ? "#fff" : "#546e7a"
            }}>{t("name", cat, lang)}</button>
          ))}
        </div>
      </div>
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "50px 24px 80px" }}>
        {validCats.filter(c => c.id === activeCat).map(cat => (
          <div key={cat.id}>
            <h2 style={{ textAlign: "center", fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", color: primary, marginBottom: "30px", fontWeight: 700 }}>{t("name", cat, lang)}</h2>
            {cat.items?.filter(i => i.available !== false).map(item => (
              <div key={item.id} style={{ display: "flex", gap: "16px", alignItems: "center", padding: "18px 0", borderBottom: "1px solid #eee" }}>
                <ItemImage src={item.image} size="small" />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px", marginBottom: "4px" }}>
                    <h3 style={{ fontSize: "17px", fontWeight: 600, margin: 0 }}>{t("name", item, lang)}</h3>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: accent, whiteSpace: "nowrap" }}>{formatPriceDH(item.price)}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#78909c", margin: 0, fontStyle: "italic" }}>{t("description", item, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>
      <footer style={{ background: "#f5f5f5", borderTop: "1px solid #e0e0e0", padding: "35px 24px", textAlign: "center", color: "#90a4ae", fontSize: "13px" }}>
        <p>{restaurant.name} — Menu classique</p>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAPPING & EXPORT
// ═══════════════════════════════════════════════════════════
export const templateMap: Record<string, React.FC<TemplateProps>> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  elegant: ElegantTemplate,
  dark: DarkTemplate,
  cafe: CafeTemplate,
  vibrant: VibrantTemplate,
  nature: NatureTemplate,
  ocean: OceanTemplate,
  sunset: SunsetTemplate,
  luxury: LuxuryTemplate,
  fresh: FreshTemplate,
  cozy: CozyTemplate,
  urban: UrbanTemplate,
  tropical: TropicalTemplate,
  classic: ClassicTemplate,
};

export default function RestaurantTemplate(props: TemplateProps & { template?: string }) {
  const key = (props.template || "modern").toLowerCase().trim();
  const Template = templateMap[key] || ModernTemplate;
  return <Template {...props} />;
}

// Alias pour compatibilité avec PublicMenuContent.tsx
export const MenuTemplate = RestaurantTemplate;
