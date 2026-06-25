import Image from "next/image";
import { generateSEO } from "@/lib/seo";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { getTeamMembers } from "@/lib/data";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";

export const metadata = generateSEO({
  title: "About Us",
  description: "Learn about YNA Digitisers — our story, mission, and the team behind professional web design solutions.",
  path: "/about",
});

export default async function AboutPage() {
  const team = await getTeamMembers();

  return (
    <>
      {/* Hero */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h1 className="heading-1 mb-6">About YNA Digitisers</h1>
            <p className="text-lg text-muted">
              We are a passionate team of web designers and developers dedicated to helping businesses thrive in the digital world.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-border/30">
        <div className="container-custom">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
            <AnimatedSection>
              <h2 className="heading-2 mb-6">Our Story</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  YNA Digitisers was founded with a simple belief: every business deserves a professional online presence, regardless of size or budget.
                </p>
                <p>
                  What started as a small web design studio has grown into a full-service digital agency, helping hundreds of businesses connect with their customers online.
                </p>
                <p>
                  We combine creative design with technical expertise to deliver websites that not only look stunning but also drive real business results.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="card bg-brand-blue/5 border-brand-blue/20">
                <h3 className="heading-3 mb-4 text-brand-blue">Our Mission</h3>
                <p className="text-lg font-medium mb-8">
                  &ldquo;To make professional web design accessible to every business.&rdquo;
                </p>
                <h3 className="heading-3 mb-4 text-brand-blue">Our Vision</h3>
                <p className="text-lg font-medium">
                  &ldquo;To become the most trusted digital partner for growing businesses.&rdquo;
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="heading-2 mb-4">Why Choose Us</h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE_US.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card text-center h-full">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10">
                    <DynamicIcon name={item.icon} className="h-7 w-7 text-brand-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding bg-border/30">
          <div className="container-custom">
            <AnimatedSection className="mb-12 text-center">
              <h2 className="heading-2 mb-4">Meet Our Team</h2>
              <p className="text-muted">The talented people behind your digital success.</p>
            </AnimatedSection>

            <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="card text-center">
                    {member.image_url && (
                      <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-brand-blue mb-3">{member.role}</p>
                    {member.bio && <p className="text-sm text-muted">{member.bio}</p>}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
