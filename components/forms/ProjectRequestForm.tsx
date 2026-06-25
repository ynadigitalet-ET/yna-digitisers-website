"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { submitProjectRequest } from "@/app/actions/forms";
import { WEBSITE_TYPES, BUDGET_RANGES } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export function ProjectRequestForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitProjectRequest({
      full_name: formData.get("full_name") as string,
      business_name: formData.get("business_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      website_type: formData.get("website_type") as string,
      budget_range: formData.get("budget_range") as string,
      project_description: formData.get("project_description") as string,
      honeypot: formData.get("website_url_confirm") as string,
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
      {/* Honeypot field — hidden from users */}
      <input
        type="text"
        name="website_url_confirm"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] opacity-0"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Input name="full_name" label="Full Name" required placeholder="John Doe" />
        <Input name="business_name" label="Business Name" required placeholder="Your Business Ltd" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Input name="email" label="Email" type="email" required placeholder="john@example.com" />
        <Input name="phone" label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Select
          name="website_type"
          label="Type of Website"
          required
          placeholder="Select website type"
          options={WEBSITE_TYPES}
        />
        <Select
          name="budget_range"
          label="Budget Range"
          required
          placeholder="Select budget range"
          options={BUDGET_RANGES}
        />
      </div>

      <Textarea
        name="project_description"
        label="Project Description"
        required
        placeholder="Tell us about your project, goals, and any specific requirements..."
        rows={5}
      />

      <Button type="submit" loading={loading} className="w-full md:w-auto">
        Submit Request
      </Button>
    </form>
  );
}
