import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
} from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { SITE_EMAIL } from "@/lib/constants";
import { getSocialLinks } from "@/lib/data";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = generateSEO({
  title: "Contact",
  description: "Get in touch with YNA Digitisers. Send us a message or request a free consultation.",
  path: "/contact",
});

const socialIcons = [
  { key: "facebook" as const, icon: Facebook, label: "Facebook" },
  { key: "instagram" as const, icon: Instagram, label: "Instagram" },
  { key: "twitter" as const, icon: Twitter, label: "Twitter" },
  { key: "linkedin" as const, icon: Linkedin, label: "LinkedIn" },
  { key: "youtube" as const, icon: Youtube, label: "YouTube" },
  { key: "whatsapp" as const, icon: MessageCircle, label: "WhatsApp" },
];

export default async function ContactPage() {
  const socialLinks = await getSocialLinks();
  const activeSocials = socialIcons.filter((s) => socialLinks?.[s.key]);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="mb-16 text-center">
          <h1 className="heading-1 mb-4">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Have a question or ready to start your project? We&apos;d love to hear from you.
          </p>
        </AnimatedSection>

        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <AnimatedSection className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="heading-3 mb-4">Get In Touch</h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="flex items-center gap-3 text-muted hover:text-brand-blue transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue/10">
                      <Mail className="h-5 w-5 text-brand-blue" />
                    </div>
                    <span>{SITE_EMAIL}</span>
                  </a>
                </div>
              </div>

              {activeSocials.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-3">
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
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-3" delay={0.1}>
            <div className="card">
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
