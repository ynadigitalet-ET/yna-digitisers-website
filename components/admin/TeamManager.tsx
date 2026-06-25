"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { saveTeamMember, deleteTeamMember } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { TeamMember } from "@/types";

export function TeamManager({ members }: { members: TeamMember[] }) {
  const [items, setItems] = useState(members);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", bio: "", image_url: "", sort_order: 0 });

  const reset = () => { setForm({ name: "", role: "", bio: "", image_url: "", sort_order: 0 }); setCreating(false); setEditingId(null); };

  const handleSave = async () => {
    const result = await saveTeamMember({ id: editingId || undefined, ...form });
    if (result.success) { toast.success("Saved"); reset(); window.location.reload(); }
    else toast.error(result.message || "Failed");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const result = await deleteTeamMember(id);
    if (result.success) { setItems((p) => p.filter((m) => m.id !== id)); toast.success("Deleted"); }
  };

  return (
    <div>
      {!creating ? (
        <Button onClick={() => setCreating(true)} className="mb-6"><Plus className="h-4 w-4 mr-2" /> Add Member</Button>
      ) : (
        <div className="card mb-6 space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <Textarea label="Bio" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          <Input label="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <div className="flex gap-2"><Button onClick={handleSave}>Save</Button><Button variant="secondary" onClick={reset}>Cancel</Button></div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((m) => (
          <div key={m.id} className="card flex justify-between">
            <div><h3 className="font-semibold">{m.name}</h3><p className="text-sm text-brand-blue">{m.role}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(m.id); setForm({ name: m.name, role: m.role, bio: m.bio || "", image_url: m.image_url || "", sort_order: m.sort_order }); setCreating(true); }} className="rounded-lg border border-border p-2"><Edit className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(m.id)} className="rounded-lg border border-red-200 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
