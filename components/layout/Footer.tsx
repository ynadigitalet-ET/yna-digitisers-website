import Link from "next/link";
import { NAV_LINKS, SITE_EMAIL, SITE_NAME } from "@/lib/constants";
import { SocialIconsList } from "@/components/layout/SocialIconsList";
import type { SocialLinks } from "@/types";

interface FooterProps {
  socialLinks?: SocialLinks | null;
}

export function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-custom section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-xl font-bold">
              <span className="text-brand-blue">YNA</span> Digitisers
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Connecting businesses to the digital world with professional web design solutions.
            </p>
            <SocialIconsList socialLinks={socialLinks} className="mt-6" />
          </div>

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
