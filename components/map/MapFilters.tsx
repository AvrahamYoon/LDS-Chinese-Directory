"use client";

import type { BranchFilters, BranchRegion, Locale } from "@/lib/types";

type MapFiltersProps = {
  availableRegions: BranchRegion[];
  filters: BranchFilters;
  locale: Locale;
  onChange: (filters: BranchFilters) => void;
};

const regionLabels: Record<BranchRegion, Record<Locale, string>> = {
  arizona: { en: "Arizona", zh: "亞利桑那" },
  australia: { en: "Australia", zh: "澳洲" },
  california: { en: "California", zh: "加州" },
  canada: { en: "Canada", zh: "加拿大" },
  "hong-kong": { en: "Hong Kong", zh: "香港" },
  macau: { en: "Macau", zh: "澳門" },
  malaysia: { en: "Malaysia", zh: "馬來西亞" },
  massachusetts: { en: "Massachusetts", zh: "麻薩諸塞" },
  "mid-atlantic": { en: "Mid-Atlantic", zh: "美國中大西洋" },
  nevada: { en: "Nevada", zh: "內華達" },
  "new-york": { en: "New York", zh: "紐約" },
  "new-zealand": { en: "New Zealand", zh: "紐西蘭" },
  "pacific-northwest": { en: "Pacific Northwest", zh: "美國太平洋西北" },
  southeast: { en: "Southeast", zh: "美國東南" },
  taiwan: { en: "Taiwan", zh: "台灣" },
  texas: { en: "Texas", zh: "德州" },
  "united-kingdom": { en: "United Kingdom", zh: "英國" },
  utah: { en: "Utah", zh: "猶他" }
};

const copy = {
  en: {
    search: "Search",
    searchPlaceholder: "Name, city, or address",
    region: "Region",
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
    region: "區域",
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
    active: "運作中",
    unknown: "待確認",
    discontinued: "已停用"
  }
};

export function MapFilters({
  availableRegions,
  filters,
  locale,
  onChange
}: MapFiltersProps) {
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
        {t.region}
        <select
          value={filters.region}
          onChange={(event) =>
            onChange({
              ...filters,
              region: event.target.value as BranchFilters["region"]
            })
          }
        >
          <option value="all">{t.all}</option>
          {availableRegions.map((region) => (
            <option key={region} value={region}>
              {regionLabels[region][locale]}
            </option>
          ))}
        </select>
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
