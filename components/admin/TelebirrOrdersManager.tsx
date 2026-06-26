"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { updateTelebirrOrderStatus, deleteTelebirrOrder } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import type { TelebirrOrder, TelebirrOrderStatus } from "@/types";

const STATUSES: TelebirrOrderStatus[] = ["pending", "verified", "completed", "rejected"];

const STATUS_BADGE: Record<TelebirrOrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  rejected: "bg-red-100 text-red-800",
};

const STATUS_LABEL: Record<TelebirrOrderStatus, string> = {
  pending: "🟡 Pending",
  verified: "🟢 Verified",
  completed: "🔵 Completed",
  rejected: "🔴 Rejected",
};

export function TelebirrOrdersManager({ orders }: { orders: TelebirrOrder[] }) {
  const [items, setItems] = useState(orders);
  const [filter, setFilter] = useState<TelebirrOrderStatus | "all">("all");

  const stats = useMemo(() => ({
    total: items.length,
    pending: items.filter((o) => o.status === "pending").length,
    verified: items.filter((o) => o.status === "verified").length,
    completed: items.filter((o) => o.status === "completed").length,
  }), [items]);

  const filtered = filter === "all" ? items : items.filter((o) => o.status === filter);

  const handleStatusChange = async (id: string, status: TelebirrOrderStatus) => {
    const result = await updateTelebirrOrderStatus(id, status);
    if (result.success) {
      setItems((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
      toast.success("Status updated");
    } else {
      toast.error(result.message || "Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this Telebirr order?")) return;
    const result = await deleteTelebirrOrder(id);
    if (result.success) {
      setItems((prev) => prev.filter((o) => o.id !== id));
      toast.success("Order deleted");
    } else {
      toast.error(result.message || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Orders", value: stats.total },
          { label: "Pending", value: stats.pending },
          { label: "Verified", value: stats.verified },
          { label: "Completed", value: stats.completed },
        ].map(({ label, value }) => (
          <div key={label} className="card">
            <p className="text-sm text-muted">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${filter === "all" ? "bg-brand-blue text-white" : "bg-border"}`}
        >
          All
        </button>
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize ${filter === status ? "bg-brand-blue text-white" : "bg-border"}`}
          >
            {status}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">No Telebirr orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Phone</th>
                <th className="pb-3 pr-4">Package</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3 pr-4">Telebirr #</th>
                <th className="pb-3 pr-4">Reference</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border align-top">
                  <td className="py-3 pr-4 text-muted whitespace-nowrap">{formatDate(order.created_at)}</td>
                  <td className="py-3 pr-4 font-medium">{order.customer_name}</td>
                  <td className="py-3 pr-4">{order.customer_email}</td>
                  <td className="py-3 pr-4">{order.customer_phone}</td>
                  <td className="py-3 pr-4">{order.package_name}</td>
                  <td className="py-3 pr-4">{order.amount}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">{order.telebirr_number_used}</td>
                  <td className="py-3 pr-4 font-mono text-xs">{order.transaction_reference}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${STATUS_BADGE[order.status]}`}>
                      {STATUS_LABEL[order.status]}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-col gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as TelebirrOrderStatus)}
                        className="input-field !w-auto !py-1.5 text-xs"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleDelete(order.id)}
                        className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
