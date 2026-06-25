"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { savePricingPackage, deletePricingPackage } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { PricingPackage } from "@/types";

export function PricingManager({ packages }: { packages: PricingPackage[] }) {
  const [items, setItems] = useState(packages);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", price: 0, features: "", is_visible: true, sort_order: 0 });

  const reset = () => { setForm({ name: "", slug: "", price: 0, features: "", is_visible: true, sort_order: 0 }); setCreating(false); setEditingId(null); };

  const handleSave = async () => {
    const result = await savePricingPackage({
      id: editingId || undefined,
      ...form,
      features: form.features.split("\n").filter(Boolean),
    });
    if (result.success) { toast.success("Saved"); reset(); window.location.reload(); }
    else toast.error(result.message || "Failed");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const result = await deletePricingPackage(id);
    if (result.success) { setItems((p) => p.filter((s) => s.id !== id)); toast.success("Deleted"); }
  };

  return (
    <div>
      {!creating ? (
        <Button onClick={() => setCreating(true)} className="mb-6"><Plus className="h-4 w-4 mr-2" /> Add Package</Button>
      ) : (
        <div className="card mb-6 space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} />
          <Input label="Price ($)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <Textarea label="Features (one per line)" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} /> Visible</label>
          <div className="flex gap-2"><Button onClick={handleSave}>Save</Button><Button variant="secondary" onClick={reset}>Cancel</Button></div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((p) => (
          <div key={p.id} className="card flex justify-between">
            <div><h3 className="font-semibold">{p.name}</h3><p className="text-sm text-brand-blue">${p.price}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(p.id); setForm({ name: p.name, slug: p.slug, price: p.price, features: p.features.join("\n"), is_visible: p.is_visible, sort_order: p.sort_order }); setCreating(true); }} className="rounded-lg border border-border p-2"><Edit className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(p.id)} className="rounded-lg border border-red-200 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
