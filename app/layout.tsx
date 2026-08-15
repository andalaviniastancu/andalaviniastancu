import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteHeader } from "./components/site-header";
import { FALLBACK_SITE_URL, getSettings } from "../lib/sanity";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const name = settings?.name ?? "";
  const siteUrl = settings?.siteUrl ?? FALLBACK_SITE_URL;
  const description =
    settings?.infoHeading ?? `Selected work by ${name}.`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: name, template: `%s, ${name}` },
    description,
    applicationName: name,
    authors: [{ name }],
    creator: name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: name,
      title: name,
      description,
      url: siteUrl,
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: { "format-detection": "telephone=no" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();
  const siteUrl = settings?.siteUrl ?? FALLBACK_SITE_URL;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings?.name ?? "",
    jobTitle: settings?.role ?? "",
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    ...(settings?.email ? { email: `mailto:${settings.email}` } : {}),
    ...(settings?.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <html lang="en" className={geist.variable}>
      <head>
        <meta name="theme-color" content="#ebebeb" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </head>
      <body>
        <SiteHeader
          siteName={settings?.name ?? ""}
          email={settings?.email ?? ""}
          indexEntries={settings?.indexOrder ?? []}
        />
        {children}
      </body>
    </html>
  );
}
