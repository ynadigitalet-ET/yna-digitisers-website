import { Hero } from "@/components/home/Hero";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Testimonials, FAQSection } from "@/components/home/TestimonialsFAQ";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Newsletter } from "@/components/home/Newsletter";
import {
  getTestimonials,
  getClientLogos,
  getFAQs,
  getServices,
} from "@/lib/data";

export default async function HomePage() {
  const [testimonials, logos, faqs, services] = await Promise.all([
    getTestimonials(),
    getClientLogos(),
    getFAQs(),
    getServices(),
  ]);

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesOverview services={services} />
      <ClientLogos logos={logos} />
      <Testimonials testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <Newsletter />
    </>
  );
}
