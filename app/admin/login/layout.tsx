import { ToastProvider } from "@/components/providers/ToastProvider";

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastProvider />
    </>
  );
}
