"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IndexEntry } from "../../lib/sanity";
import { IndexMenu } from "./index-menu";

const ITEM_CLASS =
  "chrome-in pointer-events-auto whitespace-nowrap transition-colors duration-150";

type SiteHeaderProps = {
  siteName: string;
  email: string;
  indexEntries: IndexEntry[];
};

export function SiteHeader({ siteName, email, indexEntries }: SiteHeaderProps) {
  const pathname = usePathname();
  const onInfo = pathname === "/info";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
      <Link
        href="/"
        className={`${ITEM_CLASS} hover:text-ink-muted`}
        style={{ animationDelay: "180ms" }}
      >
        {siteName}
      </Link>

      <nav className="flex shrink-0 items-center gap-4 md:gap-6">
        <IndexMenu
          entries={indexEntries}
          className={ITEM_CLASS}
          style={{ animationDelay: "240ms" }}
        />

        <Link
          href="/info"
          aria-current={onInfo ? "page" : undefined}
          className={`${ITEM_CLASS} ${
            onInfo ? "text-ink" : "text-ink-muted hover:text-ink"
          }`}
          style={{ animationDelay: "300ms" }}
        >
          Info
        </Link>

        <a
          href={`mailto:${email}`}
          className={`${ITEM_CLASS} text-ink-muted hover:text-ink`}
          style={{ animationDelay: "360ms" }}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
