import Link from "next/link";
import { notFound } from "next/navigation";
import { branches } from "@/data/branches";
import {
  formatBranchType,
  formatLanguage,
  formatStatus,
  normalizeLocale
} from "@/lib/format";

type BranchPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

export function generateStaticParams() {
  return branches.map((branch) => ({ id: branch.id }));
}

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

export default async function BranchPage({
  params,
  searchParams
}: BranchPageProps) {
  const { id } = await params;
  const locale = normalizeLocale((await searchParams).lang);
  const t = copy[locale];
  const branch = branches.find((item) => item.id === id);

  if (!branch) {
    notFound();
  }

  const address = [
    branch.location.address,
    branch.location.city,
    branch.location.state,
    branch.location.postalCode
  ]
    .filter(Boolean)
    .join(", ");
  const title = locale === "zh" ? branch.name.zhTw ?? branch.name.en : branch.name.en;

  return (
    <main className="detail-page">
      <Link className="back-link" href={`/map?lang=${locale}`}>
        {t.back}
      </Link>
      <article className="detail-panel">
        <p className="eyebrow">{formatBranchType(branch.type, locale)}</p>
        <h1>{title}</h1>
        <dl className="detail-grid">
          <div>
            <dt>{locale === "zh" ? t.englishName : t.chineseName}</dt>
            <dd>{locale === "zh" ? branch.name.en : branch.name.zhTw ?? t.pending}</dd>
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
