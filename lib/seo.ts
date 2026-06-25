import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function generateSEO({
  title,
  description = SITE_TAGLINE,
  path = "",
  image = "/og-image.png",
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const url = `${getSiteUrl()}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(getSiteUrl()),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
