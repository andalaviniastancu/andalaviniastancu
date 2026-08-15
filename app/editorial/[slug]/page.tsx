import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreditList } from "../../components/credit-list";
import { EditorialFrame } from "../../components/editorial-frame";
import {
  FALLBACK_SITE_URL,
  getEditorial,
  getEditorialSlugs,
  getSettings,
} from "../../../lib/sanity";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getEditorialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/editorial/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [editorial, settings] = await Promise.all([
    getEditorial(slug),
    getSettings(),
  ]);

  if (!editorial) return {};

  const description = `${editorial.title}, styled by ${settings?.name ?? ""}.`;
  const path = `/editorial/${slug}`;

  return {
    title: editorial.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: `${editorial.title}, ${settings?.name ?? ""}`,
      description,
      url: path,
      images: editorial.images?.[0]
        ? [{ url: `${editorial.images[0].src}?w=1200&fit=max&auto=format` }]
        : undefined,
    },
  };
}

export default async function EditorialPage({
  params,
}: PageProps<"/editorial/[slug]">) {
  const { slug } = await params;
  const [editorial, settings] = await Promise.all([
    getEditorial(slug),
    getSettings(),
  ]);

  if (!editorial) notFound();

  const base = (settings?.siteUrl ?? FALLBACK_SITE_URL).replace(/\/$/, "");
  const work = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: editorial.title,
    url: `${base}/editorial/${slug}`,
    author: { "@type": "Person", name: settings?.name ?? "" },
    ...(editorial.images?.length
      ? { image: editorial.images.map((image) => image.src) }
      : {}),
  };

  return (
    <main className="min-h-[100svh] px-5 pt-20 pb-14 md:px-8 md:pt-24 md:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(work) }}
      />

      <div className="mx-auto flex w-full max-w-[44rem] flex-col items-center gap-14 md:gap-20">
        <h1 className="chrome-in" style={{ animationDelay: "180ms" }}>
          {editorial.title}
        </h1>

        {(editorial.images ?? []).map((image, position) => (
          <EditorialFrame
            key={image.key}
            image={image}
            priority={position === 0}
          />
        ))}

        <CreditList
          credits={editorial.credits}
          className="flex flex-col items-center gap-0.5 text-center"
        />
      </div>
    </main>
  );
}
