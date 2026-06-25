"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { saveSocialLinks } from "@/app/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import type { SocialLinks } from "@/types";

const fields = [
  { key: "facebook", label: "Facebook URL" },
  { key: "instagram", label: "Instagram URL" },
  { key: "twitter", label: "Twitter / X URL" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "tiktok", label: "TikTok URL" },
  { key: "youtube", label: "YouTube URL" },
  { key: "whatsapp", label: "WhatsApp URL" },
] as const;

export function SocialLinksManager({ links }: { links: SocialLinks | null }) {
  const [form, setForm] = useState<Record<string, string>>({
    facebook: links?.facebook || "",
    instagram: links?.instagram || "",
    twitter: links?.twitter || "",
    linkedin: links?.linkedin || "",
    tiktok: links?.tiktok || "",
    youtube: links?.youtube || "",
    whatsapp: links?.whatsapp || "",
  });
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
      {fields.map(({ key, label }) => (
        <Input
          key={key}
          label={label}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={`https://${key}.com/yourpage`}
        />
      ))}
      <Button onClick={handleSave} loading={loading}>Save Links</Button>
    </div>
  );
}
