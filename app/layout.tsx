import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "Scopeveil | Private project payments",
    template: "%s | Scopeveil",
  },
  description:
    "Start funded. Pay privately. Funded milestones, private contractor allocations and paid scope changes for software agencies on Base. In development.",
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
