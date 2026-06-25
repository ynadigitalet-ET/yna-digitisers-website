import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Terms of Service",
  description: "Terms of service for YNA Digitisers website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container-custom mx-auto max-w-3xl prose-content">
        <h1 className="heading-1 mb-8">Terms of Service</h1>
        <p className="text-muted mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p>By using the YNA Digitisers website and services, you agree to these terms.</p>
        <h2>Services</h2>
        <p>We provide web design and development services as described on our website.</p>
        <h2>Payments</h2>
        <p>All payments are processed securely through Stripe. Refund policies are discussed on a per-project basis.</p>
        <h2>Intellectual Property</h2>
        <p>Upon full payment, clients receive ownership of the final website deliverables as outlined in their project agreement.</p>
        <h2>Contact</h2>
        <p>For questions about these terms, contact us at ynadigital.et@gmail.com.</p>
      </div>
    </section>
  );
}
