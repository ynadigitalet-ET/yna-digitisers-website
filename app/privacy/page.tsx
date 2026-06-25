import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Privacy Policy",
  description: "Privacy policy for YNA Digitisers website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="container-custom mx-auto max-w-3xl prose-content">
        <h1 className="heading-1 mb-8">Privacy Policy</h1>
        <p className="text-muted mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <p>At YNA Digitisers, we respect your privacy and are committed to protecting your personal data.</p>
        <h2>Information We Collect</h2>
        <p>We collect information you provide through our contact forms, project request forms, and newsletter signup.</p>
        <h2>How We Use Your Information</h2>
        <p>We use your information to respond to inquiries, process orders, and send relevant updates.</p>
        <h2>Cookies</h2>
        <p>We use cookies to improve your browsing experience. You can accept or decline cookies via our cookie banner.</p>
        <h2>Contact</h2>
        <p>For privacy-related questions, contact us at ynadigital.et@gmail.com.</p>
      </div>
    </section>
  );
}
