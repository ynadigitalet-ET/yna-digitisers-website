"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Edit } from "lucide-react";
import { saveFAQ, deleteFAQ } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import type { FAQ } from "@/types";

export function FAQManager({ faqs }: { faqs: FAQ[] }) {
  const [items, setItems] = useState(faqs);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", sort_order: 0 });

  const reset = () => { setForm({ question: "", answer: "", sort_order: items.length }); setCreating(false); setEditingId(null); };

  const handleSave = async () => {
    const result = await saveFAQ({ id: editingId || undefined, ...form });
    if (result.success) { toast.success("Saved"); reset(); window.location.reload(); }
    else toast.error(result.message || "Failed");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    const result = await deleteFAQ(id);
    if (result.success) { setItems((p) => p.filter((f) => f.id !== id)); toast.success("Deleted"); }
  };

  return (
    <div>
      {!creating ? (
        <Button onClick={() => { setCreating(true); setForm({ ...form, sort_order: items.length }); }} className="mb-6"><Plus className="h-4 w-4 mr-2" /> Add FAQ</Button>
      ) : (
        <div className="card mb-6 space-y-4">
          <Input label="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
          <Textarea label="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
          <Input label="Sort Order" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          <div className="flex gap-2"><Button onClick={handleSave}>Save</Button><Button variant="secondary" onClick={reset}>Cancel</Button></div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="card flex justify-between">
            <div><h3 className="font-semibold">{f.question}</h3><p className="text-sm text-muted mt-1">{f.answer}</p></div>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(f.id); setForm({ question: f.question, answer: f.answer, sort_order: f.sort_order }); setCreating(true); }} className="rounded-lg border border-border p-2"><Edit className="h-4 w-4" /></button>
              <button onClick={() => handleDelete(f.id)} className="rounded-lg border border-red-200 p-2 text-red-500"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
