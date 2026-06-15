"use client";

import Link from "next/link";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useLocale } from "@/lib/locale";
import {
  formatBranchType,
  formatLanguage,
  formatStatus
} from "@/lib/format";
import type { Branch } from "@/lib/types";

const copy = {
  en: {
    back: "Back to map",
    language: "Language",
    status: "Status",
    address: "Meetinghouse address",
    chineseName: "Chinese name",
    englishName: "English name",
    pending: "To be added",
    officialPage: "Open official church page"
  },
  zh: {
    back: "返回地圖",
    language: "語言",
    status: "狀態",
    address: "聚會教堂地址",
    chineseName: "中文名稱",
    englishName: "英文名稱",
    pending: "待補",
    officialPage: "前往官方教會頁面"
  }
};

export function BranchDetail({ branch }: { branch: Branch }) {
  const { isPending, locale } = useLocale();
  const t = copy[locale];

  const address = [
    branch.location.address,
    branch.location.city,
    branch.location.state,
    branch.location.postalCode
  ]
    .filter(Boolean)
    .join(", ");
  const title =
    locale === "zh" ? branch.name.zhTw ?? branch.name.en : branch.name.en;

  return (
    <main className="detail-page">
      <div className="detail-toolbar">
        <Link className="back-link" href={`/map?lang=${locale}`}>
          {t.back}
        </Link>
        <LanguageSwitch />
      </div>
      <article
        className={`detail-panel${isPending ? " is-locale-pending" : ""}`}
      >
        <p className="eyebrow">{formatBranchType(branch.type, locale)}</p>
        <h1>{title}</h1>
        <dl className="detail-grid">
          <div>
            <dt>{locale === "zh" ? t.englishName : t.chineseName}</dt>
            <dd>
              {locale === "zh"
                ? branch.name.en
                : branch.name.zhTw ?? t.pending}
            </dd>
          </div>
          <div>
            <dt>{t.language}</dt>
            <dd>{formatLanguage(branch.language, locale)}</dd>
          </div>
          <div>
            <dt>{t.status}</dt>
            <dd>{formatStatus(branch.status, locale)}</dd>
          </div>
          <div>
            <dt>{t.address}</dt>
            <dd>{address}</dd>
          </div>
        </dl>
        {branch.officialUrl ? (
          <a
            className="official-link"
            href={branch.officialUrl}
            rel="noreferrer"
            target="_blank"
          >
            {t.officialPage}
          </a>
        ) : null}
        {branch.notes ? <p className="detail-notes">{branch.notes}</p> : null}
      </article>
    </main>
  );
}
