"use client";

import { useLocale } from "@/lib/locale";
import type { Locale } from "@/lib/types";

const options: { value: Locale; label: string }[] = [
  { value: "zh", label: "國語" },
  { value: "en", label: "English" }
];

export function LanguageSwitch() {
  const { locale, setLocale, isPending } = useLocale();

  return (
    <div
      aria-label="Language"
      className={`language-switch${isPending ? " is-pending" : ""}`}
      role="group"
    >
      {options.map((option) => (
        <button
          key={option.value}
          aria-pressed={locale === option.value}
          className={locale === option.value ? "active" : ""}
          onClick={() => setLocale(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
