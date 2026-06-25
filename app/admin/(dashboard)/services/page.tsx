import { createAdminClient } from "@/lib/supabase/admin";
import { ServicesManager } from "@/components/admin/ServicesManager";

export default async function ServicesAdminPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("services").select("*").order("sort_order");
  return (<div><h1 className="text-2xl font-bold mb-8">Services Manager</h1><ServicesManager services={data || []} /></div>);
}
