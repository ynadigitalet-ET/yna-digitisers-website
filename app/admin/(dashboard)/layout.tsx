import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/providers/ToastProvider";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="p-6 pt-16 lg:pt-6 lg:p-8">{children}</main>
      </div>
      <ToastProvider />
    </div>
  );
}
