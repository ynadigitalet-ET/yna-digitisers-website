import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export const metadata = generateSEO({
  title: "Payment Successful",
  description: "Your payment was successful. We'll be in touch shortly to begin your project.",
  path: "/success",
});

export default function SuccessPage() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-lg text-center">
          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
          <h1 className="heading-2 mb-4">Payment Successful!</h1>
          <p className="mb-8 text-muted">
            Thank you for your purchase. We&apos;ve received your payment and will contact you shortly to begin your project.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/">Back to Home</Button>
            <Button href="/contact" variant="secondary">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
