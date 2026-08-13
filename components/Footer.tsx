import Link from "next/link";
import { QrCode } from "lucide-react";
export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4"><div className="w-8 h-8 rounded-lg bg-yeno-500 flex items-center justify-center"><QrCode className="w-4 h-4 text-white" /></div><span className="font-bold text-xl text-white">YENO</span></Link>
            <p className="text-sm text-gray-400 max-w-sm">Digitalisez vos menus de restaurant et café avec style. QR code, templates, multilingue — tout ce qu'il vous faut.</p>
          </div>
          <div><h4 className="font-semibold text-white mb-4">Navigation</h4><ul className="space-y-2 text-sm"><li><Link href="/" className="hover:text-white transition">Accueil</Link></li><li><Link href="/#plans" className="hover:text-white transition">Tarifs</Link></li><li><Link href="/demo" className="hover:text-white transition">Démo</Link></li><li><Link href="/contact" className="hover:text-white transition">Contact</Link></li></ul></div>
          <div><h4 className="font-semibold text-white mb-4">Légal</h4><ul className="space-y-2 text-sm"><li><Link href="#" className="hover:text-white transition">Mentions légales</Link></li><li><Link href="#" className="hover:text-white transition">CGV</Link></li><li><Link href="#" className="hover:text-white transition">Confidentialité</Link></li></ul></div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-500 text-center">© {new Date().getFullYear()} YENO. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
