"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EMAIL, SITE_NAME } from "../site";

const NAV = [
  { label: "Index", href: "/" },
  { label: "Information", href: "/information" },
];

const ITEM_CLASS =
  "chrome-in pointer-events-auto whitespace-nowrap transition-colors duration-150";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/work/");
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
      <Link
        href="/"
        className={`${ITEM_CLASS} hover:text-ink-muted`}
        style={{ animationDelay: "180ms" }}
      >
        {SITE_NAME}
      </Link>

      <nav className="flex shrink-0 items-center gap-4 md:gap-6">
        {NAV.map(({ label, href }, position) => {
          const current = isCurrent(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={current ? "page" : undefined}
              className={`${ITEM_CLASS} ${
                current ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
              style={{ animationDelay: `${240 + position * 60}ms` }}
            >
              {label}
            </Link>
          );
        })}

        <a
          href={`mailto:${EMAIL}`}
          className={`${ITEM_CLASS} text-ink-muted hover:text-ink`}
          style={{ animationDelay: "360ms" }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
