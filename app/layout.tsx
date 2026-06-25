import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { BackToTop } from "@/components/ui/BackToTop";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { TawkWidget } from "@/components/TawkWidget";
import { getSocialLinks } from "@/lib/data";
import { generateSEO } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = generateSEO({
  description: "Professional web design solutions by YNA Digitisers. Connecting your business to the digital world.",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let socialLinks = null;
  try {
    socialLinks = await getSocialLinks();
  } catch {
    // Don't block layout/CSS if Supabase is unavailable
    socialLinks = null;
  }

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer socialLinks={socialLinks} />
          <BackToTop />
          <CookieConsent />
          <ToastProvider />
          <TawkWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
