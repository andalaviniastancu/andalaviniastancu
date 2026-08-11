import type { Metadata } from "next";
import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_ROLE,
} from "../site";

export const metadata: Metadata = {
  title: `Information, ${SITE_NAME}`,
  description: `${SITE_ROLE} available worldwide. Contact ${SITE_NAME}.`,
};

const LINK_CLASS = "w-fit transition-colors duration-150 hover:text-ink-muted";

export default function Information() {
  return (
    <main className="relative h-[100svh] overflow-hidden">
      <div className="absolute bottom-5 left-5 flex flex-col gap-8 pr-5 md:bottom-6 md:left-8">
        <h1 className="chrome-in max-w-[24ch]" style={{ animationDelay: "180ms" }}>
          {SITE_ROLE} available worldwide
        </h1>

        <div className="flex flex-col gap-1">
          <a
            href={`mailto:${EMAIL}`}
            className={`chrome-in ${LINK_CLASS}`}
            style={{ animationDelay: "240ms" }}
          >
            {EMAIL}
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={`chrome-in ${LINK_CLASS}`}
            style={{ animationDelay: "290ms" }}
          >
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        <p className="chrome-in text-ink-muted" style={{ animationDelay: "340ms" }}>
          Commercial portfolio upon request
        </p>
      </div>
    </main>
  );
}
