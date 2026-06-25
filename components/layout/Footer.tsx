import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { NAV_LINKS, SITE_EMAIL, SITE_NAME } from "@/lib/constants";
import type { SocialLinks } from "@/types";

interface FooterProps {
  socialLinks?: SocialLinks | null;
}

const socialIcons = [
  { key: "facebook" as const, icon: Facebook, label: "Facebook" },
  { key: "instagram" as const, icon: Instagram, label: "Instagram" },
  { key: "twitter" as const, icon: Twitter, label: "Twitter" },
  { key: "linkedin" as const, icon: Linkedin, label: "LinkedIn" },
  { key: "youtube" as const, icon: Youtube, label: "YouTube" },
  { key: "whatsapp" as const, icon: MessageCircle, label: "WhatsApp" },
];

export function Footer({ socialLinks }: FooterProps) {
  const activeSocials = socialIcons.filter(
    (s) => socialLinks?.[s.key]
  );

  return (
    <footer className="border-t border-border bg-background">
      <div className="container-custom section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold">
              <span className="text-brand-blue">YNA</span> Digitisers
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Connecting businesses to the digital world with professional web design solutions.
            </p>
            {activeSocials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {activeSocials.map(({ key, icon: Icon, label }) => (
                  <a
                    key={key}
                    href={socialLinks![key]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition-colors hover:border-brand-blue hover:text-brand-blue"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-brand-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/get-a-website"
                  className="text-sm text-muted transition-colors hover:text-brand-blue"
                >
                  Get a Website
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-semibold">Services</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>Business Websites</li>
              <li>E-commerce Stores</li>
              <li>Portfolio Websites</li>
              <li>Website Redesign</li>
              <li>Website Maintenance</li>
              <li>SEO Optimization</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href={`mailto:${SITE_EMAIL}`} className="hover:text-brand-blue transition-colors">
                  {SITE_EMAIL}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-blue transition-colors">
                  Send us a message
                </Link>
              </li>
              <li>
                <Link href="/get-a-website" className="hover:text-brand-blue transition-colors">
                  Request a quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/privacy" className="hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-blue transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
