"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { QrCode, LayoutDashboard, Utensils, Settings, LogOut, MessageSquare } from "lucide-react";
import { logoutUser } from "@/lib/firebase-utils";
import { useRouter } from "next/navigation";
const links = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/menu", label: "Mon Menu", icon: Utensils },
  { href: "/dashboard/qr-code", label: "Code QR", icon: QrCode },
  { href: "/dashboard/requests", label: "Demandes", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Paramètres", icon: Settings },
];
export function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b"><Link href="/" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-yeno-500 flex items-center justify-center"><QrCode className="w-4 h-4 text-white" /></div><span className="font-bold text-lg">YENO</span></Link></div>
      <nav className="flex-1 p-4 space-y-1">{links.map((l) => (<Link key={l.href} href={l.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${pathname === l.href ? "bg-yeno-50 text-yeno-700" : "text-gray-600 hover:bg-gray-50"}`}><l.icon className="w-5 h-5" />{l.label}</Link>))}</nav>
      <div className="p-4 border-t"><button onClick={async () => { await logoutUser(); router.push("/"); router.refresh(); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full transition"><LogOut className="w-5 h-5" />Déconnexion</button></div>
    </aside>
  );
}
