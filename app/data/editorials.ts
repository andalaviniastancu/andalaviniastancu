import { SITE_NAME } from "../site";
import { SEQUENCE, type Frame } from "./sequence";

export type Credit = { label: string; value: string };

export type Editorial = {
  slug: string;
  title: string;
  credits: Credit[];
  frames: Frame[];
};

const TK = "TK";

const teamCredits = (): Credit[] => [
  { label: "Photography", value: TK },
  { label: "Model", value: TK },
  { label: "Hair", value: TK },
  { label: "Make-up", value: TK },
  { label: "Styling", value: SITE_NAME },
];

const INDEX: { slug: string; title: string }[] = [
  { slug: "numero-switzerland", title: "Numéro Switzerland" },
  { slug: "c41-magazine", title: "C41 Magazine" },
  { slug: "vakuum-magazine", title: "VAKUUM Magazine" },
  { slug: "pap-magazine", title: "PAP Magazine" },
];

export const EDITORIALS: Editorial[] = INDEX.map(({ slug, title }) => ({
  slug,
  title,
  credits: teamCredits(),
  frames: SEQUENCE.filter((frame) => frame.publication === title),
}));

export function findEditorial(slug: string) {
  return EDITORIALS.find((editorial) => editorial.slug === slug);
}
