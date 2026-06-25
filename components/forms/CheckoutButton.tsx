"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CheckoutButtonProps {
  packageSlug: string;
  packageName: string;
  price: number;
}

export function CheckoutButton({ packageSlug, packageName, price }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageSlug, packageName, price }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to create checkout session");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} loading={loading} className="w-full">
      Buy Now — ${price}
    </Button>
  );
}

export function ProcessSteps() {
  const steps = [
    { step: 1, title: "Submit Request", description: "Fill out the form with your project details." },
    { step: 2, title: "We Contact You Within 24 Hours", description: "Our team reviews your request and reaches out." },
    { step: 3, title: "We Build & Launch", description: "We design, develop, and launch your website." },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((s) => (
        <div key={s.step} className="card text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white font-bold">
            {s.step}
          </div>
          <h3 className="font-semibold mb-2">{s.title}</h3>
          <p className="text-sm text-muted">{s.description}</p>
        </div>
      ))}
    </div>
  );
}

export function PricingCard({
  name,
  price,
  features,
  packageSlug,
  highlighted = false,
}: {
  name: string;
  price: number;
  features: string[];
  packageSlug: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`card relative h-full flex flex-col ${highlighted ? "border-brand-blue ring-2 ring-brand-blue" : ""}`}>
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="heading-3 mb-2">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
      </div>
      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
            {feature}
          </li>
        ))}
      </ul>
      <CheckoutButton packageSlug={packageSlug} packageName={name} price={price} />
    </div>
  );
}
