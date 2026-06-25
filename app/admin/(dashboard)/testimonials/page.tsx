import { createAdminClient } from "@/lib/supabase/admin";
import { TestimonialsManager } from "@/components/admin/TestimonialsManager";

export default async function TestimonialsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
  return (<div><h1 className="text-2xl font-bold mb-8">Testimonials</h1><TestimonialsManager testimonials={data || []} /></div>);
}
