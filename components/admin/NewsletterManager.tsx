"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Download, Trash2 } from "lucide-react";
import { deleteSubscriber, exportSubscribersCSV } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { NewsletterSubscriber } from "@/types";

export function NewsletterManager({ subscribers }: { subscribers: NewsletterSubscriber[] }) {
  const [items, setItems] = useState(subscribers);

  const handleExport = async () => {
    const csv = await exportSubscribersCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove subscriber?")) return;
    const result = await deleteSubscriber(id);
    if (result.success) { setItems((p) => p.filter((s) => s.id !== id)); toast.success("Removed"); }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <p className="text-muted">{items.length} subscribers</p>
        <Button onClick={handleExport} variant="secondary"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
      </div>
      {items.length === 0 ? (
        <p className="text-muted text-center py-12">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left"><th className="pb-3 pr-4">Email</th><th className="pb-3 pr-4">Subscribed</th><th className="pb-3">Actions</th></tr></thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-b border-border">
                  <td className="py-3 pr-4">{s.email}</td>
                  <td className="py-3 pr-4 text-muted">{formatDate(s.created_at)}</td>
                  <td className="py-3"><button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
