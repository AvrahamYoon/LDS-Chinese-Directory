"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useTransition,
  type ReactNode
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { normalizeLocale } from "@/lib/format";
import type { Locale } from "@/lib/types";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const locale = normalizeLocale(searchParams.get("lang") ?? undefined);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", next);

      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;

      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [locale, pathname, router, searchParams]
  );

  const value = useMemo(
    () => ({ locale, setLocale, isPending }),
    [isPending, locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return context;
}

export function LocaleHtmlLang() {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hant" : "en";
  }, [locale]);

  return null;
}
