"use client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Copy } from "lucide-react";
import { SITE_EMAIL, TELEBIRR_ACCOUNT } from "@/lib/constants";

function copyNumber(number: string) {
  navigator.clipboard.writeText(number);
  toast.success("Phone number copied! 📋");
}

export function TelebirrBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-br from-[#7B2D8E] to-[#9B59B6] p-8 text-white shadow-xl md:p-12"
    >
      <h2 className="text-2xl font-bold md:text-3xl">💜 Pay with Telebirr (Ethiopia)</h2>
      <p className="mt-4 text-lg text-white/90">Send your payment to:</p>

      <div className="mt-6 rounded-xl bg-white/10 p-5 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={`tel:${TELEBIRR_ACCOUNT.tel}`}
            className="text-2xl font-bold transition-opacity hover:opacity-80 md:text-4xl"
          >
            📱 {TELEBIRR_ACCOUNT.display}
          </a>
          <button
            type="button"
            onClick={() => copyNumber(TELEBIRR_ACCOUNT.value)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#7B2D8E] transition-transform hover:scale-105"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
        </div>
        <p className="mt-4 text-lg text-white/95">👤 {TELEBIRR_ACCOUNT.accountHolder}</p>
      </div>

      <div className="mt-8 space-y-2 text-white/95">
        <p className="text-lg">After payment, send your receipt to:</p>
        <p className="text-xl font-semibold">
          📧{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="underline hover:opacity-80">
            {SITE_EMAIL}
          </a>
        </p>
        <p className="text-lg font-medium">
          We&apos;ll confirm and start your project within 24 hours! 🚀
        </p>
      </div>
    </motion.div>
  );
}
