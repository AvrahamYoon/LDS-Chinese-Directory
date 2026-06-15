import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

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
    <html lang="zh-Hant">
      <body className="site-shell">
        <div className="site-main">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
