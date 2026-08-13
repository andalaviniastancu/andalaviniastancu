import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreditList } from "../../components/credit-list";
import { EditorialFrame } from "../../components/editorial-frame";
import { EDITORIALS, findEditorial } from "../../data/editorials";
import { SITE_NAME } from "../../site";

export const dynamicParams = false;

export function generateStaticParams() {
  return EDITORIALS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/editorial/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const editorial = findEditorial(slug);

  if (!editorial) return {};

  return {
    title: `${editorial.title}, ${SITE_NAME}`,
    description: `${editorial.title}, styled by ${SITE_NAME}.`,
  };
}

export default async function EditorialPage({
  params,
}: PageProps<"/editorial/[slug]">) {
  const { slug } = await params;
  const editorial = findEditorial(slug);

  if (!editorial) notFound();

  return (
    <main className="min-h-[100svh] px-5 pt-20 pb-14 md:px-8 md:pt-24 md:pb-20">
      <div className="mx-auto flex w-full max-w-[44rem] flex-col items-center gap-14 md:gap-20">
        <h1 className="chrome-in" style={{ animationDelay: "180ms" }}>
          {editorial.title}
        </h1>

        {editorial.frames.map((frame, position) => (
          <EditorialFrame
            key={frame.src}
            frame={frame}
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
