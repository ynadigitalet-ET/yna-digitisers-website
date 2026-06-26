import { createAdminClient } from "@/lib/supabase/admin";
import { TelebirrOrdersManager } from "@/components/admin/TelebirrOrdersManager";
import type { TelebirrOrder } from "@/types";

export default async function TelebirrOrdersPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("telebirr_orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Telebirr Orders</h1>
      <TelebirrOrdersManager orders={(data || []) as TelebirrOrder[]} />
    </div>
  );
}
