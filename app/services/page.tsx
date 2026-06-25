import Link from "next/link";
import { Check } from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { DEFAULT_SERVICES } from "@/lib/constants";
import { getServices } from "@/lib/data";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export const metadata = generateSEO({
  title: "Services",
  description: "Explore our web design services including business websites, e-commerce, portfolios, redesign, maintenance, and SEO.",
  path: "/services",
});

export default async function ServicesPage() {
  const dbServices = await getServices();
  const services = dbServices.length > 0 ? dbServices : DEFAULT_SERVICES.map((s, i) => ({
    ...s,
    id: String(i),
    is_visible: true,
    sort_order: i,
  }));

  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="mb-16 text-center">
          <h1 className="heading-1 mb-4">Our Services</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Professional web design solutions tailored to help your business succeed online.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.id || service.title}>
              <div className="card h-full">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10">
                    <DynamicIcon name={service.icon} className="h-7 w-7 text-brand-blue" />
                  </div>
                  <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-sm font-semibold text-brand-blue">
                    {service.price}
                  </span>
                </div>

                <h2 className="heading-3 mb-3">{service.title}</h2>
                <p className="mb-6 text-muted">{service.description}</p>

                <ul className="mb-6 space-y-2">
                  {(service.benefits || []).map((benefit: string) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-brand-blue" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button href="/get-a-website" className="w-full">
                  Get This Service
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
