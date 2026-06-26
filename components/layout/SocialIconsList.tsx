import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { TikTokIcon, TelegramIcon } from "@/components/icons/SocialBrandIcons";
import type { SocialLinkKey } from "@/lib/social";
import type { SocialLinks } from "@/types";
import { cn } from "@/lib/utils";
import { getActiveSocialLinks } from "@/lib/social";

type IconComponent = LucideIcon | typeof TikTokIcon;

const ICON_MAP: Record<SocialLinkKey, { icon: IconComponent; label: string; hoverClass?: string }> = {
  facebook: { icon: Facebook, label: "Facebook" },
  instagram: { icon: Instagram, label: "Instagram" },
  twitter: { icon: Twitter, label: "Twitter" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  tiktok: { icon: TikTokIcon, label: "TikTok" },
  youtube: { icon: Youtube, label: "YouTube" },
  telegram: {
    icon: TelegramIcon,
    label: "Telegram",
    hoverClass: "hover:border-[#229ED9] hover:text-[#229ED9]",
  },
  whatsapp: { icon: MessageCircle, label: "WhatsApp" },
};

interface SocialIconsListProps {
  socialLinks?: SocialLinks | null;
  className?: string;
  iconClassName?: string;
}

export function SocialIconsList({ socialLinks, className, iconClassName }: SocialIconsListProps) {
  const active = getActiveSocialLinks(socialLinks);

  if (active.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {active.map(({ key, label }) => {
        const { icon: Icon, hoverClass } = ICON_MAP[key];
        const href = socialLinks![key]!;

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:border-brand-blue hover:text-brand-blue",
              hoverClass,
              iconClassName
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
