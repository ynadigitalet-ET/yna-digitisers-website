import { generateSEO } from "@/lib/seo";
import { ProjectRequestForm } from "@/components/forms/ProjectRequestForm";
import { ProcessSteps } from "@/components/forms/CheckoutButton";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = generateSEO({
  title: "Get a Website",
  description: "Request a professional website for your business. Fill out our form and we'll contact you within 24 hours.",
  path: "/get-a-website",
});

export default function GetAWebsitePage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="heading-1 mb-4">Get Your Website</h1>
            <p className="text-lg text-muted">
              Tell us about your project and we&apos;ll get back to you within 24 hours with a tailored proposal.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mx-auto max-w-2xl">
            <div className="card">
              <ProjectRequestForm />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-border/30">
        <div className="container-custom">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="heading-2 mb-4">How It Works</h2>
            <p className="text-muted">Three simple steps to your new website.</p>
          </AnimatedSection>
          <ProcessSteps />
        </div>
      </section>
    </>
  );
}
