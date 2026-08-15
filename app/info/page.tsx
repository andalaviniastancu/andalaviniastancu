import type { Metadata } from "next";
import { getSettings } from "../../lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const description = settings?.infoHeading ?? undefined;

  return {
    title: "Info",
    description,
    alternates: { canonical: "/info" },
    openGraph: { title: `Info, ${settings?.name ?? ""}`, description, url: "/info" },
  };
}

const LINK_CLASS = "w-fit transition-colors duration-150 hover:text-ink-muted";

export default async function Info() {
  const settings = await getSettings();

  return (
    <main className="relative h-[100svh] overflow-hidden">
      <div className="absolute bottom-5 left-5 flex flex-col gap-8 pr-5 md:bottom-6 md:left-8">
        {settings?.infoHeading && (
          <h1 className="chrome-in max-w-[24ch]" style={{ animationDelay: "180ms" }}>
            {settings.infoHeading}
          </h1>
        )}

        <div className="flex flex-col gap-1">
          {settings?.email && (
            <a
              href={`mailto:${settings.email}`}
              className={`chrome-in ${LINK_CLASS}`}
              style={{ animationDelay: "240ms" }}
            >
              {settings.email}
            </a>
          )}
          {settings?.instagramHandle && settings?.instagramUrl && (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className={`chrome-in ${LINK_CLASS}`}
              style={{ animationDelay: "290ms" }}
            >
              {settings.instagramHandle}
            </a>
          )}
        </div>

        {settings?.infoNote && (
          <p className="chrome-in text-ink-muted" style={{ animationDelay: "340ms" }}>
            {settings.infoNote}
          </p>
        )}
      </div>
    </main>
  );
}
