"use client";

import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import type { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-border/30">
      <div className="container-custom">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="heading-2 mb-4">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-muted">
            Don&apos;t just take our word for it — hear from businesses we&apos;ve helped succeed.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem key={t.id}>
              <div className="card h-full">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  {t.company && <p className="text-sm text-muted">{t.company}</p>}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

interface FAQSectionProps {
  faqs: { id: string; question: string; answer: string }[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-muted">
            Find answers to common questions about our web design services.
          </p>
        </AnimatedSection>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="card !p-0 overflow-hidden">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-border px-5 pb-5 pt-3 text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
