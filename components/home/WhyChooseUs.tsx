import { WHY_CHOOSE_US } from "@/lib/constants";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-border/30">
      <div className="container-custom">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="heading-2 mb-4">Why Choose Us</h2>
          <p className="mx-auto max-w-2xl text-muted">
            We deliver exceptional web design solutions tailored to your business needs.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map((item) => (
            <StaggerItem key={item.title}>
              <div className="card h-full text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10">
                  <DynamicIcon name={item.icon} className="h-7 w-7 text-brand-blue" />
                </div>
                <h3 className="heading-3 mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
