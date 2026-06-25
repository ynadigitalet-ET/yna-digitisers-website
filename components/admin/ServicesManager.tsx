"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { saveService, deleteService } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

export function ServicesManager({ services }: { services: Service[] }) {
  const [items, setItems] = useState(services);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", benefits: "", price: "", icon: "Globe", is_visible: true, sort_order: 0 });

  const reset = () => { setForm({ title: "", slug: "", description: "", benefits: "", price: "", icon: "Globe", is_visible: true, sort_order: 0 }); setCreating(false); setEditingId(null); };

  const handleSave = async () => {
    const result = await saveService({
      id: editingId || undefined,
      ...form,
      benefits: form.benefits.split("\n").filter(Boolean),
    });
    if (result.success) { toast.success("Saved"); reset(); window.location.reload(); }
    else toast.error(result.message || "Failed");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const result = await deleteService(id);
    if (result.success) { setItems((p) => p.filter((s) => s.id !== id)); toast.success("Deleted"); }
  };

  return (
    <div>
      {!creating ? (
        <Button onClick={() => setCreating(true)} className="mb-6"><Plus className="h-4 w-4 mr-2" /> Add Service</Button>
      ) : (
        <div className="card mb-6 space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} required />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Textarea label="Benefits (one per line)" value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} />
          <Input label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="From $499" />
          <Input label="Icon (Lucide name)" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} /> Visible</label>
          <div className="flex gap-2"><Button onClick={handleSave}>Save</Button><Button variant="secondary" onClick={reset}>Cancel</Button></div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="card flex justify-between">
            <div><h3 className="font-semibold">{s.title}</h3><p className="text-sm text-brand-blue">{s.price}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(s.id); setForm({ title: s.title, slug: s.slug, description: s.description, benefits: s.benefits.join("\n"), price: s.price, icon: s.icon, is_visible: s.is_visible, sort_order: s.sort_order }); setCreating(true); }} className="rounded-lg border border-border p-2"><Edit className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(s.id)} className="rounded-lg border border-red-200 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
