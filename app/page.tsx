import Link from "next/link";
import { branches } from "@/data/branches";

export default function Home() {
  return (
    <main className="intro-page">
      <div className="intro-backdrop" aria-hidden="true">
        <span className="intro-orb intro-orb--gold" />
        <span className="intro-orb intro-orb--navy" />
        <span className="intro-grid" />
      </div>
      <section className="intro-hero">
        <div className="intro-hero-panel">
          <p className="eyebrow">LDS Chinese Directory</p>
          <h1>Chinese-speaking Unit Directory</h1>
          <div className="hero-copy-block">
            <p className="hero-copy">
              Explore Mandarin and Chinese-speaking Latter-day Saint units around
              the world through a clean, map-based directory.
            </p>
            <p className="hero-copy zh-copy">
              以簡潔地圖整理全球國語中文後期聖徒單位，方便查找聚會地點與基本資料。
            </p>
          </div>
          <div className="language-cards" aria-label="Choose language">
            <Link className="language-card" href="/map?lang=zh">
              <span aria-hidden="true" className="language-card-icon">
                中
              </span>
              <span className="language-card-copy">
                <span>國語</span>
                <strong>進入繁體中文</strong>
              </span>
            </Link>
            <Link className="language-card" href="/map?lang=en">
              <span aria-hidden="true" className="language-card-icon is-english">
                En
              </span>
              <span className="language-card-copy">
                <span>English</span>
                <strong>Continue in English</strong>
              </span>
            </Link>
          </div>
          <p className="intro-stat">
            <span className="intro-stat-value">{branches.length}</span>
            <span className="intro-stat-label">
              units currently listed
              <span className="intro-stat-label-zh">已收錄單位</span>
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
