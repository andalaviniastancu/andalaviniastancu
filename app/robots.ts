import type { MetadataRoute } from "next";
import { FALLBACK_SITE_URL, getSettings } from "../lib/sanity";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSettings();
  const base = (settings?.siteUrl ?? FALLBACK_SITE_URL).replace(/\/$/, "");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
