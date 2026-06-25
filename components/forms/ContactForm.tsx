"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { submitContactMessage } from "@/app/actions/forms";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactMessage({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      honeypot: formData.get("company_website") as string,
    });

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Input name="name" label="Name" required placeholder="Your name" />
        <Input name="email" label="Email" type="email" required placeholder="you@example.com" />
      </div>

      <Input name="subject" label="Subject" required placeholder="How can we help?" />

      <Textarea
        name="message"
        label="Message"
        required
        placeholder="Tell us more about your inquiry..."
        rows={6}
      />

      <Button type="submit" loading={loading}>
        Send Message
      </Button>
    </form>
  );
}
