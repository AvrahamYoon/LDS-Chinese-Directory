"use client";

import type { BranchFilters, Locale } from "@/lib/types";

type MapFiltersProps = {
  filters: BranchFilters;
  locale: Locale;
  onChange: (filters: BranchFilters) => void;
};

const copy = {
  en: {
    search: "Search",
    searchPlaceholder: "Name, city, or address",
    language: "Language",
    type: "Type",
    status: "Status",
    all: "All",
    mandarin: "Mandarin / Chinese",
    asian: "Asian YSA",
    cantonese: "Cantonese",
    mixed: "Mixed",
    ward: "Ward",
    branch: "Branch",
    active: "Active",
    unknown: "To be confirmed",
    discontinued: "Discontinued"
  },
  zh: {
    search: "搜尋",
    searchPlaceholder: "名稱、城市或地址",
    language: "語言",
    type: "類型",
    status: "狀態",
    all: "全部",
    mandarin: "國語 / 中文",
    asian: "亞洲 YSA",
    cantonese: "粵語",
    mixed: "混合",
    ward: "支會",
    branch: "分會",
    active: "活躍",
    unknown: "待確認",
    discontinued: "已關停"
  }
};

export function MapFilters({ filters, locale, onChange }: MapFiltersProps) {
  const t = copy[locale];

  return (
    <form className="filter-panel">
      <label>
        {t.search}
        <input
          value={filters.search}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
          placeholder={t.searchPlaceholder}
          type="search"
        />
      </label>
      <label>
        {t.language}
        <select
          value={filters.language}
          onChange={(event) =>
            onChange({
              ...filters,
              language: event.target.value as BranchFilters["language"]
            })
          }
        >
          <option value="all">{t.all}</option>
          <option value="mandarin">{t.mandarin}</option>
          <option value="asian">{t.asian}</option>
          <option value="cantonese">{t.cantonese}</option>
          <option value="mixed">{t.mixed}</option>
        </select>
      </label>
      <label>
        {t.type}
        <select
          value={filters.type}
          onChange={(event) =>
            onChange({
              ...filters,
              type: event.target.value as BranchFilters["type"]
            })
          }
        >
          <option value="all">{t.all}</option>
          <option value="ward">{t.ward}</option>
          <option value="branch">{t.branch}</option>
        </select>
      </label>
      <label>
        {t.status}
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as BranchFilters["status"]
            })
          }
        >
          <option value="all">{t.all}</option>
          <option value="active">{t.active}</option>
          <option value="unknown">{t.unknown}</option>
          <option value="discontinued">{t.discontinued}</option>
        </select>
      </label>
    </form>
  );
}
