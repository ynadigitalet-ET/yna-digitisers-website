import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_SERVICES } from "@/lib/constants";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import type { Service } from "@/types";

interface ServicesOverviewProps {
  services?: Service[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  const items = services && services.length > 0
    ? services.slice(0, 6)
    : DEFAULT_SERVICES.map((s, i) => ({
        ...s,
        id: String(i),
        is_visible: true,
        sort_order: i,
        benefits: s.benefits,
      }));

  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="heading-2 mb-4">Our Services</h2>
            <p className="max-w-2xl text-muted">
              Comprehensive web design solutions to help your business thrive online.
            </p>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
          >
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <StaggerItem key={service.id || service.title}>
              <div className="card group h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 transition-colors group-hover:bg-brand-blue group-hover:text-white">
                  <DynamicIcon name={service.icon} className="h-6 w-6 text-brand-blue group-hover:text-white" />
                </div>
                <h3 className="heading-3 mb-2">{service.title}</h3>
                <p className="mb-4 text-sm text-muted line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-brand-blue">{service.price}</span>
                  <Link
                    href="/get-a-website"
                    className="text-sm font-medium text-brand-blue hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
