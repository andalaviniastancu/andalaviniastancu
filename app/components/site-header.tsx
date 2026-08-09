import Link from "next/link";
import { EMAIL, SITE_NAME } from "../site";

const LINKS = [
  { label: "Information", href: "/information" },
  { label: "Contact", href: `mailto:${EMAIL}` },
];

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 md:px-8 md:py-6">
      <Link
        href="/"
        className="chrome-in pointer-events-auto transition-colors duration-150 hover:text-ink-muted"
        style={{ animationDelay: "180ms" }}
      >
        {SITE_NAME}
      </Link>

      <nav className="flex items-center gap-6 md:gap-8">
        {LINKS.map(({ label, href }, position) => (
          <a
            key={href}
            href={href}
            className="chrome-in pointer-events-auto transition-colors duration-150 hover:text-ink-muted"
            style={{ animationDelay: `${240 + position * 60}ms` }}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
