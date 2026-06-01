import Link from "next/link";
import { branches } from "@/data/branches";

export default function Home() {
  return (
    <main className="intro-page">
      <section className="intro-hero">
        <p className="eyebrow">LDS Chinese Directory</p>
        <h1>Chinese-speaking Unit Directory</h1>
        <p className="hero-copy">
          A simple map-based directory for Mandarin and Chinese-speaking
          Latter-day Saint units, beginning with manually curated U.S. seed
          data.
        </p>
        <p className="hero-copy zh-copy">
          一份以地圖為入口的海外國語中文單位目錄，先從美國的初始資料開始整理。
        </p>
        <div className="language-cards" aria-label="Choose language">
          <Link className="language-card" href="/map?lang=zh">
            <span>國語</span>
            <strong>繁體中文</strong>
          </Link>
          <Link className="language-card" href="/map?lang=en">
            <span>English</span>
            <strong>Continue in English</strong>
          </Link>
        </div>
        <p className="quiet-note">Currently tracking {branches.length} units</p>
      </section>
    </main>
  );
}
