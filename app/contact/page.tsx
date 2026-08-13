import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16"><h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1><p className="text-gray-600">Une question ? Nous sommes là pour vous aider.</p></div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-yeno-100 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-yeno-600" /></div><div><h3 className="font-semibold text-gray-900">Téléphone / WhatsApp</h3><p className="text-gray-600 mt-1">+212 6 12 34 56 78</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-yeno-100 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-yeno-600" /></div><div><h3 className="font-semibold text-gray-900">Email</h3><p className="text-gray-600 mt-1">contact@yeno.ma</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-yeno-100 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-yeno-600" /></div><div><h3 className="font-semibold text-gray-900">Adresse</h3><p className="text-gray-600 mt-1">Casablanca, Maroc</p></div></div>
              <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-xl bg-yeno-100 flex items-center justify-center shrink-0"><MessageCircle className="w-5 h-5 text-yeno-600" /></div><div><h3 className="font-semibold text-gray-900">Support</h3><p className="text-gray-600 mt-1">Disponible du lundi au samedi, 9h à 18h</p></div></div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Envoyez un message</h2>
              <form className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Nom</label><input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none transition" placeholder="Votre nom" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none transition" placeholder="vous@email.com" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Message</label><textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-yeno-500 outline-none transition resize-none" placeholder="Comment pouvons-nous vous aider ?" /></div>
                <button type="submit" className="w-full py-3 rounded-xl bg-yeno-500 text-white font-semibold hover:bg-yeno-600 transition">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
