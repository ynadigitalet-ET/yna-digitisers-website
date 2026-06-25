import { createAdminClient } from "@/lib/supabase/admin";
import { ContactMessagesManager } from "@/components/admin/ContactMessagesManager";

export default async function ContactMessagesPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Contact Messages</h1>
      <ContactMessagesManager messages={data || []} />
    </div>
  );
}
