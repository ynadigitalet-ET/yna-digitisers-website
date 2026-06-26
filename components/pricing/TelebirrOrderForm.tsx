"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { submitTelebirrOrder } from "@/app/actions/forms";
import { TELEBIRR_ACCOUNT, TELEBIRR_PACKAGE_OPTIONS } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export function TelebirrOrderForm() {
  const [loading, setLoading] = useState(false);

  const packageOptions = TELEBIRR_PACKAGE_OPTIONS.map((p) => p.label);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const packageLabel = formData.get("package_name") as string;
    const selectedPackage = TELEBIRR_PACKAGE_OPTIONS.find((p) => p.label === packageLabel);

    const result = await submitTelebirrOrder({
      customer_name: formData.get("customer_name") as string,
      customer_email: formData.get("customer_email") as string,
      customer_phone: formData.get("customer_phone") as string,
      package_name: selectedPackage?.name || packageLabel,
      amount: selectedPackage?.amount || "",
      telebirr_number_used: TELEBIRR_ACCOUNT.value,
      transaction_reference: formData.get("transaction_reference") as string,
    });

    setLoading(false);

    if (result.success) {
      toast.success("Thank you! We'll verify your payment and contact you within 24 hours.");
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="mb-16 rounded-2xl border border-[#9B59B6]/30 bg-[#9B59B6]/5 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#7B2D8E] md:text-3xl">
        💜 Already Paid via Telebirr? Confirm Your Order
      </h2>
      <p className="mt-2 text-muted">
        Fill out this form after sending your payment so we can verify and start your project.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <Input name="customer_name" label="Full Name" required placeholder="Your full name" />
          <Input
            name="customer_email"
            label="Email Address"
            type="email"
            required
            placeholder="you@example.com"
          />
        </div>

        <Input
          name="customer_phone"
          label="Phone Number"
          type="tel"
          required
          placeholder="+251 9XX XXX XXX"
        />

        <Select
          name="package_name"
          label="Package Selected"
          required
          placeholder="Select a package"
          options={packageOptions}
        />

        <div className="rounded-lg border border-border bg-background px-4 py-3">
          <p className="label mb-1">Telebirr Number You Sent To</p>
          <p className="font-medium">
            {TELEBIRR_ACCOUNT.display} — {TELEBIRR_ACCOUNT.accountHolder}
          </p>
        </div>

        <Input
          name="transaction_reference"
          label="Transaction Reference Number"
          required
          placeholder="Enter the reference number from your Telebirr receipt"
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full bg-[#7B2D8E] hover:bg-[#9B59B6] md:w-auto"
        >
          💜 Confirm My Payment
        </Button>
      </form>
    </div>
  );
}
