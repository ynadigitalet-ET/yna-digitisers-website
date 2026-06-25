import { createAdminClient } from "@/lib/supabase/admin";
import { NewsletterManager } from "@/components/admin/NewsletterManager";

export default async function NewsletterPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
  return (<div><h1 className="text-2xl font-bold mb-8">Newsletter Subscribers</h1><NewsletterManager subscribers={data || []} /></div>);
}
