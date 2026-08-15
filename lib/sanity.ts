import { createClient } from "@sanity/client";

export type SanityImage = {
  src: string;
  width: number;
  height: number;
  lqip: string | null;
  alt: string | null;
};

export type Frame = SanityImage & {
  key: string;
  publication: string | null;
};

export type Credit = { label: string; value: string };

export type Editorial = {
  title: string;
  slug: string;
  credits: Credit[] | null;
  images: (SanityImage & { key: string })[] | null;
};

export type IndexEntry = { title: string; slug: string };

export const FALLBACK_SITE_URL = "https://andastancu.com";

const listFormatter = new Intl.ListFormat("en-GB", {
  style: "long",
  type: "conjunction",
});

export function siteDescription(settings: SiteSettings | null) {
  const heading = settings?.infoHeading?.replace(/\.$/, "") ?? "";
  const titles = (settings?.indexOrder ?? []).map(({ title }) => title);

  if (titles.length === 0) return `${heading}.`;

  return `${heading}. Selected editorial work for ${listFormatter.format(titles)}.`;
}

export function editorialDescription(
  title: string,
  settings: SiteSettings | null,
) {
  const role = settings?.role?.toLowerCase() ?? "";
  const name = settings?.name ?? "";

  return `${title}, an editorial styled by ${name}, ${role} available worldwide.`;
}

export type SiteSettings = {
  name: string;
  role: string;
  email: string;
  siteUrl: string | null;
  instagramHandle: string | null;
  instagramUrl: string | null;
  infoHeading: string | null;
  infoNote: string | null;
  indexOrder: IndexEntry[] | null;
};

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6jvpibwc";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-10-01",
  useCdn: false,
});

const IMAGE_FIELDS = `
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  alt
`;

export async function getFrames(): Promise<Frame[]> {
  const result = await client.fetch<Frame[] | null>(`
    *[_type == "homeSequence"][0].frames[defined(image.asset)]{
      "key": _key,
      "publication": editorial->title,
      ...image{${IMAGE_FIELDS}}
    }
  `);

  return result ?? [];
}

export async function getEditorial(slug: string): Promise<Editorial | null> {
  return client.fetch<Editorial | null>(
    `
    *[_type == "editorial" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      credits[]{label, value},
      images[defined(asset)]{"key": _key, ${IMAGE_FIELDS}}
    }
  `,
    { slug },
  );
}

export async function getEditorialSlugs(): Promise<string[]> {
  const result = await client.fetch<string[] | null>(
    `*[_type == "editorial" && defined(slug.current)].slug.current`,
  );

  return result ?? [];
}

export async function getSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(`
    *[_type == "siteSettings"][0]{
      name, role, email, siteUrl, instagramHandle, instagramUrl, infoHeading, infoNote,
      indexOrder[]->{title, "slug": slug.current}
    }
  `);
}

export async function getEditorialIndex(): Promise<
  { slug: string; title: string; updatedAt: string }[]
> {
  const result = await client.fetch<
    { slug: string; title: string; updatedAt: string }[] | null
  >(`
    *[_type == "editorial" && defined(slug.current)]{
      "slug": slug.current,
      title,
      "updatedAt": _updatedAt
    }
  `);

  return result ?? [];
}
