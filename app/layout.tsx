import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Confidential Payments Prototype | Base",
    template: "%s | Confidential Payments Prototype on Base",
  },
  description:
    "A concept website and local confidential-escrow experiment for agency payments on Base. Payments are disabled; no escrow is deployed.",
  robots: { index: true, follow: true },
};
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
