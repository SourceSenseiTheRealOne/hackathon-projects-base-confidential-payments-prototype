import Link from "next/link";
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Scopeveil home">
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      scopeveil
    </Link>
  );
}
export function Header({ home = false }: { home?: boolean }) {
  return (
    <header className="header wrap">
      <Brand />
      <nav aria-label="Main navigation">
        <Link href="/product">Product</Link>
        <Link href={home ? "#privacy" : "/#privacy"}>Privacy</Link>
        <a className="button button-small" href={home ? "#pilot" : "/#pilot"}>
          Join the pilot <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <div>
        <Brand />
        <p>Good work deserves a clear agreement.</p>
      </div>
      <div className="footer-links">
        <Link href="/product">Product</Link>
        <Link href="/privacy">Privacy & data</Link>
        <a
          href="https://docs.inco.org/ctoken/overview"
          target="_blank"
          rel="noreferrer"
        >
          Privacy technology ↗
        </a>
      </div>
      <p className="footer-note">
        Independent project. Built for Base.
        <br />
        In development. Not accepting funds.
      </p>
    </footer>
  );
}
