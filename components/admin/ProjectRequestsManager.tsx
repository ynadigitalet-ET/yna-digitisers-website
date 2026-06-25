"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2, Mail, ExternalLink } from "lucide-react";
import { updateProjectStatus, deleteProjectRequest } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { ProjectRequest, ProjectStatus } from "@/types";

const statuses: ProjectStatus[] = ["New", "In Progress", "Completed"];

export function ProjectRequestsManager({ requests }: { requests: ProjectRequest[] }) {
  const [items, setItems] = useState(requests);

  const handleStatusChange = async (id: string, status: ProjectStatus) => {
    const result = await updateProjectStatus(id, status);
    if (result.success) {
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      toast.success("Status updated");
    } else {
      toast.error(result.message || "Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this request?")) return;
    const result = await deleteProjectRequest(id);
    if (result.success) {
      setItems((prev) => prev.filter((r) => r.id !== id));
      toast.success("Deleted");
    } else {
      toast.error(result.message || "Failed to delete");
    }
  };

  if (items.length === 0) {
    return <p className="text-muted text-center py-12">No project requests yet.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((req) => (
        <div key={req.id} className="card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold">{req.name}</h3>
                <span className="text-xs text-muted">{formatDate(req.created_at)}</span>
              </div>
              <p className="text-sm text-muted mb-1"><strong>Business:</strong> {req.business_name}</p>
              <p className="text-sm text-muted mb-1"><strong>Email:</strong> {req.email}</p>
              {req.phone && <p className="text-sm text-muted mb-1"><strong>Phone:</strong> {req.phone}</p>}
              <p className="text-sm text-muted mb-1"><strong>Type:</strong> {req.website_type} | <strong>Budget:</strong> {req.budget}</p>
              <p className="text-sm mt-2">{req.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={req.status}
                onChange={(e) => handleStatusChange(req.id, e.target.value as ProjectStatus)}
                className="input-field !w-auto !py-2 text-sm"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <a
                href={`mailto:${req.email}?subject=Re: Your Website Project Request`}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm hover:bg-border"
              >
                <Mail className="h-4 w-4" /> Reply
              </a>
              <button
                onClick={() => handleDelete(req.id)}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
