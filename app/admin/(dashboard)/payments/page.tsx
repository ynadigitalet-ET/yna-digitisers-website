import { createAdminClient } from "@/lib/supabase/admin";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Payment } from "@/types";

export default async function PaymentsPage() {
  const supabase = createAdminClient();
  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });

  const items = (payments || []) as Payment[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Payments</h1>

      {items.length === 0 ? (
        <p className="text-muted text-center py-12">No payments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 pr-4 font-semibold">Date</th>
                <th className="pb-3 pr-4 font-semibold">Customer</th>
                <th className="pb-3 pr-4 font-semibold">Package</th>
                <th className="pb-3 pr-4 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-border">
                  <td className="py-3 pr-4 text-muted">{formatDate(p.created_at)}</td>
                  <td className="py-3 pr-4">{p.customer_email}</td>
                  <td className="py-3 pr-4">{p.package_name}</td>
                  <td className="py-3 pr-4 font-medium">{formatCurrency(p.amount / 100)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                      p.status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {p.status}
                    </span>
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
