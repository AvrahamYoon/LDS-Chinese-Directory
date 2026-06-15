"use client";

import { useLocale } from "@/lib/locale";
import type { Locale } from "@/lib/types";

const copy: Record<
  Locale,
  {
    disclaimer: string;
    maintained: string;
    license: string;
    licenseName: string;
  }
> = {
  en: {
    disclaimer:
      "Community-maintained directory. Not an official church website.",
    maintained: "Maintained by Abraham Yin",
    license: "Licensed under",
    licenseName: "GNU GPLv3"
  },
  zh: {
    disclaimer: "社群維護的非官方目錄，並非教會官方網站。",
    maintained: "維護者：Abraham Yin",
    license: "授權條款：",
    licenseName: "GNU GPLv3"
  }
};

export function SiteFooterFallback() {
  return <SiteFooterContent locale="en" />;
}

export function SiteFooter() {
  const { locale } = useLocale();

  return <SiteFooterContent locale={locale} />;
}

function SiteFooterContent({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const t = copy[locale];

  return (
    <footer className="site-footer">
      <p className="site-footer-line">
        <span className="site-footer-copy">
          &copy; {year} LDS Chinese Directory
        </span>
        <span aria-hidden="true" className="site-footer-separator">
          ·
        </span>
        <span className="site-footer-maintainer">{t.maintained}</span>
      </p>
      <p className="site-footer-line site-footer-meta">
        <span>{t.disclaimer}</span>
        <span aria-hidden="true" className="site-footer-separator">
          ·
        </span>
        <span>
          {t.license}{" "}
          <a
            href="https://www.gnu.org/licenses/gpl-3.0.html"
            rel="license noreferrer"
            target="_blank"
          >
            {t.licenseName}
          </a>
        </span>
      </p>
    </footer>
  );
}
