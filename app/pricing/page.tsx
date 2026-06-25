import { generateSEO } from "@/lib/seo";
import { DEFAULT_PRICING } from "@/lib/constants";
import { getPricingPackages } from "@/lib/data";
import { PricingCard } from "@/components/forms/CheckoutButton";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = generateSEO({
  title: "Pricing",
  description: "Affordable web design packages starting from $299. Choose the plan that fits your business needs.",
  path: "/pricing",
});

export default async function PricingPage() {
  const dbPackages = await getPricingPackages();
  const packages = dbPackages.length > 0
    ? dbPackages
    : DEFAULT_PRICING.map((p, i) => ({
        ...p,
        id: String(i),
        is_visible: true,
        sort_order: i,
      }));

  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="mb-16 text-center">
          <h1 className="heading-1 mb-4">Simple, Transparent Pricing</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Choose the package that best fits your business. All plans include responsive design and professional quality.
          </p>
        </AnimatedSection>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <AnimatedSection key={pkg.id || pkg.slug} delay={index * 0.1}>
              <PricingCard
                name={pkg.name}
                price={pkg.price}
                features={pkg.features}
                packageSlug={pkg.slug}
                highlighted={index === 1}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
