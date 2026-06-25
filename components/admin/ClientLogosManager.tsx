"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { saveClientLogo, deleteClientLogo } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { ClientLogo } from "@/types";

export function ClientLogosManager({ logos }: { logos: ClientLogo[] }) {
  const [items, setItems] = useState(logos);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", logo_url: "", website_url: "", is_visible: true, sort_order: 0 });

  const reset = () => { setForm({ name: "", logo_url: "", website_url: "", is_visible: true, sort_order: 0 }); setCreating(false); setEditingId(null); };

  const handleSave = async () => {
    const result = await saveClientLogo({ id: editingId || undefined, ...form });
    if (result.success) { toast.success("Saved"); reset(); window.location.reload(); }
    else toast.error(result.message || "Failed");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const result = await deleteClientLogo(id);
    if (result.success) { setItems((p) => p.filter((l) => l.id !== id)); toast.success("Deleted"); }
  };

  return (
    <div>
      {!creating ? (
        <Button onClick={() => setCreating(true)} className="mb-6"><Plus className="h-4 w-4 mr-2" /> Add Logo</Button>
      ) : (
        <div className="card mb-6 space-y-4">
          <Input label="Client Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Logo URL" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
          <Input label="Website URL" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} /> Visible</label>
          <div className="flex gap-2"><Button onClick={handleSave}>Save</Button><Button variant="secondary" onClick={reset}>Cancel</Button></div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l) => (
          <div key={l.id} className="card flex flex-col items-center text-center">
            {l.logo_url && <img src={l.logo_url} alt={l.name} className="h-12 object-contain mb-3" />}
            <h3 className="font-semibold">{l.name}</h3>
            <div className="flex gap-2 mt-3">
              <button onClick={() => { setEditingId(l.id); setForm({ name: l.name, logo_url: l.logo_url, website_url: l.website_url || "", is_visible: l.is_visible, sort_order: l.sort_order }); setCreating(true); }} className="rounded-lg border border-border p-2"><Edit className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(l.id)} className="rounded-lg border border-red-200 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
