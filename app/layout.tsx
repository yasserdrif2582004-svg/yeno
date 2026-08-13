import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "YENO - Digitalisez votre menu",
  description: "Créez des menus digitaux pour votre restaurant ou café avec QR code",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body className={inter.className}><AuthProvider>{children}</AuthProvider></body></html>);
}
