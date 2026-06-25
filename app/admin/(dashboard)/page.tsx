import { createAdminClient } from "@/lib/supabase/admin";
import { formatCurrency } from "@/lib/utils";
import {
  FileText,
  MessageSquare,
  CreditCard,
  DollarSign,
  Mail,
  BookOpen,
} from "lucide-react";

async function getStats() {
  const supabase = createAdminClient();

  const [
    { count: leads },
    { count: messages },
    { count: payments },
    { data: paymentData },
    { count: subscribers },
    { count: blogPosts },
  ] = await Promise.all([
    supabase.from("project_requests").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("amount").eq("status", "paid"),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
  ]);

  const revenue = paymentData?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

  return {
    leads: leads || 0,
    messages: messages || 0,
    payments: payments || 0,
    revenue,
    subscribers: subscribers || 0,
    blogPosts: blogPosts || 0,
  };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const cards = [
    { label: "Total Leads", value: stats.leads, icon: FileText, color: "text-blue-500" },
    { label: "Messages", value: stats.messages, icon: MessageSquare, color: "text-green-500" },
    { label: "Payments", value: stats.payments, icon: CreditCard, color: "text-purple-500" },
    { label: "Revenue", value: formatCurrency(stats.revenue / 100), icon: DollarSign, color: "text-yellow-500" },
    { label: "Subscribers", value: stats.subscribers, icon: Mail, color: "text-pink-500" },
    { label: "Blog Posts", value: stats.blogPosts, icon: BookOpen, color: "text-indigo-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-border/50 ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
