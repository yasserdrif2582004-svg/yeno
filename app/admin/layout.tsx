import { redirect } from "next/navigation";
import { getCurrentUser, getUserData } from "@/lib/firebase-utils";
import { AdminSidebar } from "@/components/AdminSidebar";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const data = await getUserData(user.uid);
  if ((data as any)?.role !== "admin") redirect("/dashboard");
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
