import { createAdminClient } from "@/lib/supabase/admin";
import { ClientLogosManager } from "@/components/admin/ClientLogosManager";

export default async function ClientLogosPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("client_logos").select("*").order("sort_order");
  return (<div><h1 className="text-2xl font-bold mb-8">Client Logos</h1><ClientLogosManager logos={data || []} /></div>);
}
