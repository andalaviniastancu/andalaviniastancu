import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "../data/projects";
import { EMAIL, SITE_NAME, SITE_ROLE } from "../site";

export const metadata: Metadata = {
  title: `Information, ${SITE_NAME}`,
  description: `Index of work and contact details for ${SITE_NAME}.`,
};

export default function Information() {
  return (
    <main className="relative h-[100svh] overflow-hidden">
      <div className="absolute bottom-5 left-5 flex flex-col gap-8 md:bottom-6 md:left-8">
        <h1 className="chrome-in" style={{ animationDelay: "180ms" }}>
          {SITE_ROLE}
        </h1>

        <ul className="flex flex-col gap-1">
          {PROJECTS.map(({ slug, name }, position) => (
            <li
              key={slug}
              className="chrome-in"
              style={{ animationDelay: `${240 + position * 50}ms` }}
            >
              <Link
                href={`/work/${slug}`}
                className="text-ink-muted transition-colors duration-150 hover:text-ink"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${EMAIL}`}
          className="chrome-in w-fit transition-colors duration-150 hover:text-ink-muted"
          style={{ animationDelay: "480ms" }}
        >
          {EMAIL}
        </a>
      </div>
    </main>
  );
}
