export interface UserData { uid: string; email: string; name: string | null; role: string; plan: string; planExpiry: any; changesUsed: number; changesLimit: number; languages: string; }
export interface Restaurant { uid: string; name: string; slug: string; description: string; logo: string; phone: string; address: string; template: string; primaryColor: string; accentColor: string; userId: string; }
export interface Category { id: string; name: string; nameEn: string; nameEs: string; description: string; order: number; restaurantId: string; }
export interface MenuItem { id: string; name: string; nameEn: string; nameEs: string; description: string; descEn: string; descEs: string; price: number; image: string; available: boolean; categoryId: string; }
export interface ChangeRequest { id: string; type: string; details: string; status: string; userId: string; createdAt: any; }
export interface Plan { id: string; name: string; price: number; period: string; features: string[]; highlighted?: boolean; badge?: string; }
export const PLANS: Plan[] = [
  { id: "standard", name: "Standard", price: 60, period: "an", features: ["Digitalisation illimitée de menu", "6 templates à choisir", "10 changements/an", "1 langue (FR)", "Code QR personnalisé", "Support WhatsApp"] },
  { id: "premium", name: "Premium", price: 100, period: "an", badge: "Populaire", highlighted: true, features: ["Digitalisation illimitée de menu", "Tous les templates (15+)", "20 changements/an", "1 langue (FR)", "Code QR personnalisé", "Support WhatsApp prioritaire"] },
  { id: "pro", name: "Pro", price: 150, period: "an", badge: "Illimité", features: ["Digitalisation illimitée de menu", "Tous les templates (15+)", "Changements illimités", "3 langues (FR + EN + ES)", "Code QR personnalisé HD", "Support WhatsApp prioritaire", "Badge Pro sur le menu"] },
];
export const TEMPLATES = [
  { id: "modern", name: "Moderne", preview: "bg-gradient-to-br from-gray-900 to-gray-800" },
  { id: "elegant", name: "Élégant", preview: "bg-gradient-to-br from-amber-900 to-amber-700" },
  { id: "minimal", name: "Minimal", preview: "bg-gradient-to-br from-white to-gray-100" },
  { id: "vibrant", name: "Vibrant", preview: "bg-gradient-to-br from-purple-600 to-pink-600" },
  { id: "nature", name: "Nature", preview: "bg-gradient-to-br from-green-800 to-emerald-600" },
  { id: "dark", name: "Dark Mode", preview: "bg-gradient-to-br from-black to-gray-900" },
  { id: "cafe", name: "Café", preview: "bg-gradient-to-br from-amber-800 to-orange-700" },
  { id: "ocean", name: "Océan", preview: "bg-gradient-to-br from-blue-900 to-cyan-700" },
  { id: "sunset", name: "Sunset", preview: "bg-gradient-to-br from-orange-500 to-red-600" },
  { id: "luxury", name: "Luxury", preview: "bg-gradient-to-br from-slate-900 to-slate-700" },
  { id: "fresh", name: "Fresh", preview: "bg-gradient-to-br from-lime-500 to-green-600" },
  { id: "cozy", name: "Cozy", preview: "bg-gradient-to-br from-rose-900 to-pink-800" },
  { id: "urban", name: "Urban", preview: "bg-gradient-to-br from-zinc-800 to-neutral-900" },
  { id: "tropical", name: "Tropical", preview: "bg-gradient-to-br from-teal-600 to-emerald-500" },
  { id: "classic", name: "Classic", preview: "bg-gradient-to-br from-stone-800 to-stone-600" },
];
