"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EMAIL, SITE_NAME } from "../site";
import { IndexMenu } from "./index-menu";

const ITEM_CLASS =
  "chrome-in pointer-events-auto whitespace-nowrap transition-colors duration-150";

export function SiteHeader() {
  const pathname = usePathname();
  const onInfo = pathname === "/info";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-4 px-5 py-5 md:px-8 md:py-6">
      <Link
        href="/"
        className={`${ITEM_CLASS} hover:text-ink-muted`}
        style={{ animationDelay: "180ms" }}
      >
        {SITE_NAME}
      </Link>

      <nav className="flex shrink-0 items-center gap-4 md:gap-6">
        <IndexMenu className={ITEM_CLASS} style={{ animationDelay: "240ms" }} />

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
