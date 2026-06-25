import { createAdminClient } from "@/lib/supabase/admin";
import { PricingManager } from "@/components/admin/PricingManager";

export default async function PricingAdminPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("pricing_packages").select("*").order("sort_order");
  return (<div><h1 className="text-2xl font-bold mb-8">Pricing Manager</h1><PricingManager packages={data || []} /></div>);
}
