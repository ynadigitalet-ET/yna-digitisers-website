"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/forms";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await subscribeNewsletter(email);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setEmail("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section className="section-padding bg-brand-blue">
      <div className="container-custom">
        <AnimatedSection className="mx-auto max-w-2xl text-center text-white">
          <Mail className="mx-auto mb-4 h-10 w-10" />
          <h2 className="heading-2 mb-4 text-white">Stay Updated</h2>
          <p className="mb-8 text-white/80">
            Subscribe to our newsletter for web design tips, special offers, and company updates.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-lg border-0 px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button
              type="submit"
              loading={loading}
              variant="secondary"
              className="!border-white !text-white hover:!bg-white hover:!text-brand-blue"
            >
              Subscribe
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
