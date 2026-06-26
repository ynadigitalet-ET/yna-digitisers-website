import type { SocialLinks } from "@/types";

export type SocialLinkKey = keyof Pick<
  SocialLinks,
  "facebook" | "instagram" | "twitter" | "linkedin" | "tiktok" | "youtube" | "telegram" | "whatsapp"
>;

export const SOCIAL_LINK_FIELDS: {
  key: SocialLinkKey;
  label: string;
  placeholder: string;
}[] = [
  { key: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/yourpage" },
  { key: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/yourpage" },
  { key: "twitter", label: "Twitter / X URL", placeholder: "https://x.com/yourpage" },
  { key: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/yourpage" },
  { key: "tiktok", label: "TikTok URL", placeholder: "https://tiktok.com/@yourpage" },
  { key: "youtube", label: "YouTube URL", placeholder: "https://youtube.com/@yourchannel" },
  { key: "telegram", label: "Telegram URL", placeholder: "https://t.me/yourchannel" },
  { key: "whatsapp", label: "WhatsApp URL", placeholder: "https://wa.me/251900000000" },
];

export function buildSocialLinksPayload(data: Record<string, string>) {
  return {
    facebook: data.facebook?.trim() || null,
    instagram: data.instagram?.trim() || null,
    twitter: data.twitter?.trim() || null,
    linkedin: data.linkedin?.trim() || null,
    tiktok: data.tiktok?.trim() || null,
    youtube: data.youtube?.trim() || null,
    telegram: data.telegram?.trim() || null,
    whatsapp: data.whatsapp?.trim() || null,
    updated_at: new Date().toISOString(),
  };
}

export function getInitialSocialForm(links: SocialLinks | null): Record<SocialLinkKey, string> {
  return {
    facebook: links?.facebook || "",
    instagram: links?.instagram || "",
    twitter: links?.twitter || "",
    linkedin: links?.linkedin || "",
    tiktok: links?.tiktok || "",
    youtube: links?.youtube || "",
    telegram: links?.telegram || "",
    whatsapp: links?.whatsapp || "",
  };
}

export function getActiveSocialLinks(links: SocialLinks | null | undefined) {
  return SOCIAL_LINK_FIELDS.filter(({ key }) => {
    const value = links?.[key];
    return typeof value === "string" && value.trim().length > 0;
  });
}
