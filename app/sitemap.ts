import type { MetadataRoute } from "next";
import { FALLBACK_SITE_URL, getEditorialIndex, getSettings } from "../lib/sanity";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, editorials] = await Promise.all([
    getSettings(),
    getEditorialIndex(),
  ]);

  const base = (settings?.siteUrl ?? FALLBACK_SITE_URL).replace(/\/$/, "");
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/info`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...editorials.map(({ slug, updatedAt }) => ({
      url: `${base}/editorial/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
