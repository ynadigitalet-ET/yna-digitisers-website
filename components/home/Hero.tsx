"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/AnimatedSection";

export function Hero() {
  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-brand-blue/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-brand-blue/10 blur-3xl" />
      </div>

      <div className="container-custom">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-block rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-sm font-medium text-brand-blue"
          >
            Professional Web Design Agency
          </motion.div>

          <h1 className="heading-1 mb-6">
            Connecting Your Business to the{" "}
            <span className="text-brand-blue">Digital World.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted md:text-xl">
            Professional Web Design Solutions by YNA Digitisers.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/get-a-website" size="lg">
              Get Started
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Request a Free Consultation
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
