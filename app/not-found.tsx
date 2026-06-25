import Link from "next/link";
import { generateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export const metadata = generateSEO({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
});

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center section-padding">
      <div className="container-custom text-center">
        <p className="text-8xl font-bold text-brand-blue mb-4">404</p>
        <h1 className="heading-2 mb-4">Page Not Found</h1>
        <p className="mb-8 text-muted">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    </section>
  );
}
