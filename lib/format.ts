import type {
  BranchLanguage,
  BranchStatus,
  BranchType,
  Locale
} from "./types";

export function formatBranchType(type: BranchType, locale: Locale = "en") {
  if (locale === "zh") {
    return type === "ward" ? "支會" : "分會";
  }

  return type === "ward" ? "Ward" : "Branch";
}

export function formatLanguage(
  language: BranchLanguage,
  locale: Locale = "en"
) {
  const labels: Record<BranchLanguage, Record<Locale, string>> = {
    mandarin: {
      en: "Mandarin / Chinese",
      zh: "國語 / 中文"
    },
    cantonese: {
      en: "Cantonese",
      zh: "粵語"
    },
    asian: {
      en: "Asian YSA",
      zh: "亞洲 YSA"
    },
    mixed: {
      en: "Mixed",
      zh: "混合"
    }
  };

  return labels[language][locale];
}

export function formatStatus(status: BranchStatus, locale: Locale = "en") {
  const labels: Record<BranchStatus, Record<Locale, string>> = {
    active: {
      en: "Active",
      zh: "活躍"
    },
    discontinued: {
      en: "Discontinued",
      zh: "已關停"
    },
    unknown: {
      en: "To be confirmed",
      zh: "待確認"
    }
  };

  return labels[status][locale];
}

export function normalizeLocale(value: string | string[] | undefined): Locale {
  const locale = Array.isArray(value) ? value[0] : value;
  return locale === "zh" ? "zh" : "en";
}
