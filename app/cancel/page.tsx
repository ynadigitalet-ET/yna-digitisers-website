import { XCircle } from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export const metadata = generateSEO({
  title: "Payment Cancelled",
  description: "Your payment was cancelled. You can try again or contact us for assistance.",
  path: "/cancel",
});

export default function CancelPage() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-lg text-center">
          <XCircle className="mx-auto mb-6 h-16 w-16 text-red-500" />
          <h1 className="heading-2 mb-4">Payment Cancelled</h1>
          <p className="mb-8 text-muted">
            Your payment was not completed. No charges were made. Feel free to try again or contact us if you need help.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="/pricing">View Pricing</Button>
            <Button href="/contact" variant="secondary">Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
