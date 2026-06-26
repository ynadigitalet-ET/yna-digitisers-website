import { generateSEO } from "@/lib/seo";
import { DEFAULT_PRICING, ETB_PRICE_BY_SLUG } from "@/lib/constants";
import { getPricingPackages } from "@/lib/data";
import { PricingCard } from "@/components/forms/CheckoutButton";
import { TelebirrBanner } from "@/components/pricing/TelebirrBanner";
import { TelebirrOrderForm } from "@/components/pricing/TelebirrOrderForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = generateSEO({
  title: "Pricing",
  description: "Affordable web design packages starting from $299. Pay with Stripe or Telebirr (Ethiopia).",
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
        <AnimatedSection className="mb-12 text-center">
          <h1 className="heading-1 mb-4">Simple, Transparent Pricing</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            Choose the package that best fits your business. Pay with Stripe internationally or Telebirr locally.
          </p>
        </AnimatedSection>

        <TelebirrBanner />
        <TelebirrOrderForm />

        <AnimatedSection className="mb-10 text-center">
          <h2 className="heading-2 mb-2">Or Pay with Stripe</h2>
          <p className="text-muted">International card payments — secure checkout powered by Stripe.</p>
        </AnimatedSection>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <AnimatedSection key={pkg.id || pkg.slug} delay={index * 0.1}>
              <PricingCard
                name={pkg.name}
                price={pkg.price}
                etbPrice={ETB_PRICE_BY_SLUG[pkg.slug] || ("etbPrice" in pkg ? (pkg as { etbPrice?: string }).etbPrice : undefined)}
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
