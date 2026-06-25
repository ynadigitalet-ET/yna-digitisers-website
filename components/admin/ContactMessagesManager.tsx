"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Mail } from "lucide-react";
import { updateMessageRead, deleteContactMessage } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { ContactMessage } from "@/types";

export function ContactMessagesManager({ messages }: { messages: ContactMessage[] }) {
  const [items, setItems] = useState(messages);

  const toggleRead = async (id: string, is_read: boolean) => {
    const result = await updateMessageRead(id, is_read);
    if (result.success) {
      setItems((prev) => prev.map((m) => (m.id === id ? { ...m, is_read } : m)));
      toast.success(is_read ? "Marked as read" : "Marked as unread");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const result = await deleteContactMessage(id);
    if (result.success) {
      setItems((prev) => prev.filter((m) => m.id !== id));
      toast.success("Deleted");
    }
  };

  if (items.length === 0) {
    return <p className="text-muted text-center py-12">No contact messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((msg) => (
        <div key={msg.id} className={`card ${!msg.is_read ? "border-brand-blue/50 bg-brand-blue/5" : ""}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold">{msg.name}</h3>
                {!msg.is_read && <span className="rounded-full bg-brand-blue px-2 py-0.5 text-xs text-white">New</span>}
                <span className="text-xs text-muted">{formatDate(msg.created_at)}</span>
              </div>
              <p className="text-sm text-muted mb-1">{msg.email}</p>
              <p className="font-medium mb-2">{msg.subject}</p>
              <p className="text-sm">{msg.message}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => toggleRead(msg.id, !msg.is_read)}
                className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-border"
              >
                {msg.is_read ? "Mark Unread" : "Mark Read"}
              </button>
              <a
                href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:bg-border"
              >
                <Mail className="h-4 w-4" /> Reply
              </a>
              <button onClick={() => handleDelete(msg.id)} className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
