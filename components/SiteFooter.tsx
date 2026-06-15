export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="site-footer-copy">
        &copy; {year} LDS Chinese Directory
      </p>
      <p className="site-footer-note">
        Community-maintained directory. Not an official church website.
        <span className="site-footer-zh">社群維護的非官方目錄。</span>
      </p>
      <p className="site-footer-license">
        Licensed under{" "}
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.html"
          rel="license noreferrer"
          target="_blank"
        >
          GNU GPLv3
        </a>
      </p>
    </footer>
  );
}
