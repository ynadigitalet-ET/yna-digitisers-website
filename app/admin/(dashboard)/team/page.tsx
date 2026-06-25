import { createAdminClient } from "@/lib/supabase/admin";
import { TeamManager } from "@/components/admin/TeamManager";

export default async function TeamAdminPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("team_members").select("*").order("sort_order");
  return (<div><h1 className="text-2xl font-bold mb-8">Team Manager</h1><TeamManager members={data || []} /></div>);
}
