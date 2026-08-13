"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QrCode,
  Smartphone,
  Palette,
  Globe,
  Zap,
  Check,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "212663140126";

const PLANS = [
  {
    id: "standard",
    name: "Standard",
    price: "60",
    period: "an",
    highlighted: false,
    badge: null,
    features: [
      "1 menu digital",
      "Template Standard uniquement",
      "Langue : Français",
      "Sans photos des plats",
      "QR code généré",
      "Support par WhatsApp",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "100",
    period: "an",
    highlighted: true,
    badge: "Populaire",
    features: [
      "1 menu digital",
      "Tous les templates",
      "Langues : Français & Arabe",
      "Photos des plats incluses",
      "QR code généré",
      "Support prioritaire",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "150",
    period: "an",
    highlighted: false,
    badge: "Illimité",
    features: [
      "Menus illimités",
      "Tous les templates",
      "Langues : FR, EN, ES & AR",
      "Photos des plats incluses",
      "QR code personnalisé",
      "Support prioritaire",
    ],
  },
];

function getWhatsAppLink(planName: string) {
  const text = encodeURIComponent(
    `Bonjour YENO ! 👋\n\nJe suis intéressé(e) par le plan **${planName}** pour digitaliser le menu de mon restaurant.\n\nPouvez-vous me donner plus d'informations ?\n\nMerci !`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yeno-500 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">YENO</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/demo"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Démo
            </Link>
            <Link
              href="#plans"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Tarifs
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            <Link
              href="/demo"
              className="block text-sm font-medium text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              Démo
            </Link>
            <Link
              href="#plans"
              className="block text-sm font-medium text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              Tarifs
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-gray-600"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yeno-50 text-yeno-700 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" /> Digitalisez votre menu en 5 minutes
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Votre menu <span className="text-yeno-500">digital</span>
            <br />
            accessible en un scan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Créez un menu moderne avec QR code pour votre restaurant ou café.
            Modifiez vos plats, prix et photos en temps réel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="px-8 py-4 rounded-2xl bg-yeno-500 text-white font-semibold text-lg hover:bg-yeno-600 transition shadow-lg shadow-yeno-200 flex items-center gap-2"
            >
              <QrCode className="w-5 h-5" /> Voir la démo
            </Link>
            <Link
              href="#plans"
              className="px-8 py-4 rounded-2xl bg-gray-100 text-gray-700 font-semibold text-lg hover:bg-gray-200 transition"
            >
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tout ce qu'il vous faut
            </h2>
            <p className="text-gray-600">
              Une solution complète pour moderniser votre établissement
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "QR Code instantané",
                desc: "Générez et téléchargez votre QR code en haute résolution pour l'imprimer.",
              },
              {
                icon: Palette,
                title: "Templates uniques",
                desc: "Choisissez parmi 15+ templates professionnels et personnalisez les couleurs.",
              },
              {
                icon: Globe,
                title: "Multilingue",
                desc: "Français (Standard), FR & Arabe (Premium), ou FR, EN, ES & AR (Pro).",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-yeno-100 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-yeno-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Des tarifs simples
            </h2>
            <p className="text-gray-600">
              Un abonnement annuel, pas de frais cachés
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-8 rounded-2xl border ${
                  plan.highlighted
                    ? "border-yeno-500 shadow-xl shadow-yeno-100"
                    : "border-gray-200"
                } bg-white`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yeno-500 text-white text-sm font-medium">
                    {plan.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">DH / {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 text-yeno-500 shrink-0 mt-0.5" />{" "}
                      {feat}
                    </li>
                  ))}
                </ul>
                {/* ⭐ BOUTON WHATSAPP ⭐ */}
                <a
                  href={getWhatsAppLink(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-3 rounded-xl font-semibold bg-green-500 text-white hover:bg-green-600 transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Choisir ce plan
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            Intéressé ? Cliquez sur un plan ci-dessus pour nous contacter sur
            WhatsApp.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-yeno-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à moderniser votre menu ?
          </h2>
          <p className="text-yeno-100 text-lg mb-8">
            Rejoignez les restaurants qui ont déjà fait le choix du digital.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="inline-block px-8 py-4 rounded-2xl bg-white text-yeno-600 font-semibold text-lg hover:bg-gray-100 transition"
            >
              Voir la démo
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-green-500 text-white font-semibold text-lg hover:bg-green-600 transition"
            >
              <MessageCircle className="w-5 h-5" /> Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yeno-500 flex items-center justify-center">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white">YENO</span>
          </div>
          <p className="text-sm">©️ 2026 YENO. Tous droits réservés.</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-white transition flex items-center gap-1"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
