import { createAdminClient } from "@/lib/supabase/admin";
import { BlogManager } from "@/components/admin/BlogManager";

export default async function BlogAdminPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Blog Manager</h1>
      <BlogManager posts={data || []} />
    </div>
  );
}
