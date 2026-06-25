import { createAdminClient } from "@/lib/supabase/admin";
import { SocialLinksManager } from "@/components/admin/SocialLinksManager";

export default async function SocialPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("social_links").select("*").limit(1).single();
  return (<div><h1 className="text-2xl font-bold mb-8">Social Media Settings</h1><SocialLinksManager links={data} /></div>);
}
