import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { ClientLogo } from "@/types";

interface ClientLogosProps {
  logos: ClientLogo[];
}

export function ClientLogos({ logos }: ClientLogosProps) {
  if (logos.length === 0) return null;

  return (
    <section className="section-padding border-y border-border">
      <div className="container-custom">
        <AnimatedSection className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted">
            Trusted By
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <div key={logo.id} className="grayscale transition-all hover:grayscale-0 opacity-60 hover:opacity-100">
              {logo.website_url ? (
                <a href={logo.website_url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={logo.logo_url}
                    alt={logo.name}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain md:h-12"
                  />
                </a>
              ) : (
                <Image
                  src={logo.logo_url}
                  alt={logo.name}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain md:h-12"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
