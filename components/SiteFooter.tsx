export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <p className="site-footer-line">
        &copy; {year} Abraham Yin
      </p>
    </footer>
  );
}
