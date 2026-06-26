import { Mail } from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { SITE_EMAIL } from "@/lib/constants";
import { getSocialLinks } from "@/lib/data";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SocialIconsList } from "@/components/layout/SocialIconsList";

export const metadata = generateSEO({
  title: "Contact",
  description: "Get in touch with YNA Digitisers. Send us a message or request a free consultation.",
  path: "/contact",
});

export default async function ContactPage() {
  const socialLinks = await getSocialLinks();

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

              <div>
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <SocialIconsList socialLinks={socialLinks} />
              </div>
            </div>
          </AnimatedSection>

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
