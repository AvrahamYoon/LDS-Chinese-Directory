"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Branch, BranchFilters, Locale } from "@/lib/types";
import { filterBranches } from "@/lib/filterBranches";
import { MapFilters } from "./MapFilters";

type BranchMapPageProps = {
  branches: Branch[];
  locale: Locale;
};

const BranchMap = dynamic(
  () => import("./BranchMap").then((module) => module.BranchMap),
  {
    ssr: false,
    loading: () => <div className="map-loading">Loading map...</div>
  }
);

const initialFilters: BranchFilters = {
  search: "",
  status: "all",
  type: "all",
  language: "all",
  region: "all"
};

const copy = {
  en: {
    eyebrow: "Global Directory",
    title: "Chinese-speaking Unit Map",
    body: "Browse Mandarin and Chinese-speaking Latter-day Saint units by location, language, type, and current status.",
    showing: "Showing"
  },
  zh: {
    eyebrow: "全球目錄",
    title: "國語中文單位地圖",
    body: "依地點、語言、類型與狀態查找全球國語中文後期聖徒單位。",
    showing: "顯示"
  }
};

export function BranchMapPage({ branches, locale }: BranchMapPageProps) {
  const [filters, setFilters] = useState<BranchFilters>(initialFilters);
  const t = copy[locale];

  const filteredBranches = useMemo(
    () => filterBranches(branches, filters),
    [branches, filters]
  );

  const availableRegions = useMemo(
    () =>
      Array.from(new Set(branches.map((branch) => branch.region))).sort(
        (a, b) => a.localeCompare(b)
      ),
    [branches]
  );

  return (
    <main className="map-page">
      <aside className="map-sidebar" aria-label="Map filters">
        <div>
          <div className="language-switch" aria-label="Language">
            <Link
              className={locale === "zh" ? "active" : ""}
              href="/map?lang=zh"
            >
              國語
            </Link>
            <Link
              className={locale === "en" ? "active" : ""}
              href="/map?lang=en"
            >
              English
            </Link>
          </div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="sidebar-copy">{t.body}</p>
        </div>
        <MapFilters
          availableRegions={availableRegions}
          filters={filters}
          locale={locale}
          onChange={setFilters}
        />
        <div className="result-count">
          {t.showing} <strong>{filteredBranches.length}</strong> /{" "}
          {branches.length}
        </div>
      </aside>
      <section className="map-canvas-wrap" aria-label="Map">
        <BranchMap branches={filteredBranches} locale={locale} />
      </section>
    </main>
  );
}
