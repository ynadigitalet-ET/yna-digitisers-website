import { createAdminClient } from "@/lib/supabase/admin";
import { ProjectRequestsManager } from "@/components/admin/ProjectRequestsManager";

export default async function ProjectRequestsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("project_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Project Requests</h1>
      <ProjectRequestsManager requests={data || []} />
    </div>
  );
}
