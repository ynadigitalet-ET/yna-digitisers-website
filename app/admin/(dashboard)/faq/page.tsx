import { createAdminClient } from "@/lib/supabase/admin";
import { FAQManager } from "@/components/admin/FAQManager";

export default async function FAQAdminPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("faq").select("*").order("sort_order", { ascending: true });
  return (<div><h1 className="text-2xl font-bold mb-8">FAQ Manager</h1><FAQManager faqs={data || []} /></div>);
}
