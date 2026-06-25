"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { saveTestimonial, deleteTestimonial } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { Testimonial } from "@/types";

export function TestimonialsManager({ testimonials }: { testimonials: Testimonial[] }) {
  const [items, setItems] = useState(testimonials);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", company: "", content: "", rating: 5, is_visible: true });

  const reset = () => { setForm({ name: "", company: "", content: "", rating: 5, is_visible: true }); setCreating(false); setEditingId(null); };

  const handleSave = async () => {
    const result = await saveTestimonial({ id: editingId || undefined, ...form });
    if (result.success) { toast.success("Saved"); reset(); window.location.reload(); }
    else toast.error(result.message || "Failed");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const result = await deleteTestimonial(id);
    if (result.success) { setItems((p) => p.filter((t) => t.id !== id)); toast.success("Deleted"); }
  };

  return (
    <div>
      {!creating ? (
        <Button onClick={() => setCreating(true)} className="mb-6"><Plus className="h-4 w-4 mr-2" /> Add Testimonial</Button>
      ) : (
        <div className="card mb-6 space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <Textarea label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          <Input label="Rating (1-5)" type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({ ...form, is_visible: e.target.checked })} /> Visible</label>
          <div className="flex gap-2"><Button onClick={handleSave}>Save</Button><Button variant="secondary" onClick={reset}>Cancel</Button></div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="card flex justify-between">
            <div><h3 className="font-semibold">{t.name}</h3><p className="text-sm text-muted">{t.company}</p><p className="text-sm mt-1">{t.content}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(t.id); setForm({ name: t.name, company: t.company || "", content: t.content, rating: t.rating, is_visible: t.is_visible }); setCreating(true); }} className="rounded-lg border border-border p-2"><Edit className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(t.id)} className="rounded-lg border border-red-200 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
