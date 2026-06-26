"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  CreditCard,
  Wallet,
  BookOpen,
  Star,
  HelpCircle,
  Share2,
  Briefcase,
  DollarSign,
  Users,
  Mail,
  Image,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/app/actions/auth";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/project-requests", label: "Project Requests", icon: FileText },
  { href: "/admin/contact-messages", label: "Contact Messages", icon: MessageSquare },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/telebirr-orders", label: "Telebirr Orders", icon: Wallet },
  { href: "/admin/blog", label: "Blog Manager", icon: BookOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/faq", label: "FAQ Manager", icon: HelpCircle },
  { href: "/admin/social", label: "Social Media", icon: Share2 },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/client-logos", label: "Client Logos", icon: Image },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-brand-blue p-2 text-white lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-background transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-6">
            <Link href="/admin" className="text-lg font-bold">
              <span className="text-brand-blue">YNA</span> Admin
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === href
                    ? "bg-brand-blue text-white"
                    : "text-muted hover:bg-border hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
