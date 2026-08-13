"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, MessageSquare, LogOut, QrCode } from "lucide-react";
import { logoutUser } from "@/lib/firebase-utils";
import { useRouter } from "next/navigation";
const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/requests", label: "Demandes", icon: MessageSquare },
];
export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800"><Link href="/admin" className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-yeno-500 flex items-center justify-center"><QrCode className="w-4 h-4 text-white" /></div><span className="font-bold text-lg">YENO Admin</span></Link></div>
      <nav className="flex-1 p-4 space-y-1">{links.map((l) => (<Link key={l.href} href={l.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${pathname === l.href ? "bg-yeno-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}><l.icon className="w-5 h-5" />{l.label}</Link>))}</nav>
      <div className="p-4 border-t border-gray-800"><button onClick={async () => { await logoutUser(); router.push("/"); router.refresh(); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-gray-800 w-full transition"><LogOut className="w-5 h-5" />Déconnexion</button></div>
    </aside>
  );
}
