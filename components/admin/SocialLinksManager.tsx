"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { saveSocialLinks } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  SOCIAL_LINK_FIELDS,
  getInitialSocialForm,
  type SocialLinkKey,
} from "@/lib/social";
import type { SocialLinks } from "@/types";

export function SocialLinksManager({ links }: { links: SocialLinks | null }) {
  const [form, setForm] = useState<Record<SocialLinkKey, string>>(getInitialSocialForm(links));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const result = await saveSocialLinks(form);
    setLoading(false);
    if (result.success) toast.success("Social links saved");
    else toast.error(result.message || "Failed to save");
  };

  return (
    <div className="card max-w-xl space-y-4">
      {SOCIAL_LINK_FIELDS.map(({ key, label, placeholder }) => (
        <Input
          key={key}
          label={label}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
        />
      ))}
      <Button onClick={handleSave} loading={loading}>
        Save Links
      </Button>
    </div>
  );
}
