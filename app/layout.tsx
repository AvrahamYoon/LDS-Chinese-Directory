import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Noto_Sans_TC } from "next/font/google";
import { SiteFooter, SiteFooterFallback } from "@/components/SiteFooter";
import { LocaleHtmlLang, LocaleProvider } from "@/lib/locale";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-zh",
  display: "swap"
});

export const metadata: Metadata = {
  title: "LDS Chinese Directory",
  description: "A directory map for Chinese-speaking Latter-day Saint units.",
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  other: {
    robots: "noai, noimageai"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${notoSansTC.variable}`} lang="en">
      <body className="site-shell">
        <Suspense fallback={null}>
          <LocaleProvider>
            <LocaleHtmlLang />
            <div className="site-main">{children}</div>
            <Suspense fallback={<SiteFooterFallback />}>
              <SiteFooter />
            </Suspense>
          </LocaleProvider>
        </Suspense>
      </body>
    </html>
  );
}
