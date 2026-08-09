import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectGallery } from "../../components/project-gallery";
import { PROJECTS } from "../../data/projects";
import { SITE_NAME } from "../../site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);

  if (!project) return {};

  return {
    title: `${project.name}, ${SITE_NAME}`,
    description: `${project.name}, styled by ${SITE_NAME}.`,
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = PROJECTS.find((entry) => entry.slug === slug);

  if (!project) notFound();

  return <ProjectGallery project={project} />;
}
