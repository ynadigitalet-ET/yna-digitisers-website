"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 shadow-lg md:p-6"
        >
          <div className="container-custom flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
              <p className="text-sm text-muted">
                We use cookies to enhance your browsing experience and analyze site traffic.
                By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
                <Link href="/privacy" className="text-brand-blue hover:underline">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setVisible(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-border"
              >
                Decline
              </button>
              <button onClick={accept} className="btn-primary !py-2 !px-4 text-sm">
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
