import { MEDIA } from "./media";

export type Frame = {
  position: number;
  src: string;
  width: number;
  height: number;
  alt: string;
  publication: string;
};

const PUBLICATIONS: Record<number, string> = {
  1: "C41 Magazine",
  2: "Vakuum Magazine",
  3: "C41 Magazine",
  4: "C41 Magazine",
  5: "C41 Magazine",
  6: "C41 Magazine",
  7: "C41 Magazine",
  8: "Numéro Switzerland",
  9: "Numéro Switzerland",
  10: "Numéro Switzerland",
  11: "Numéro Switzerland",
  12: "Numéro Switzerland",
  13: "Numéro Switzerland",
  14: "Numéro Switzerland",
  15: "PAP Magazine",
  16: "PAP Magazine",
  17: "PAP Magazine",
  18: "PAP Magazine",
  19: "Nyankiir in London",
  20: "Nyankiir in London",
  21: "Nyankiir in London",
};

export const SEQUENCE: Frame[] = MEDIA.map((entry) => {
  const publication = PUBLICATIONS[entry.position] ?? "";

  return {
    position: entry.position,
    src: entry.src,
    width: entry.width,
    height: entry.height,
    publication,
    alt: `${publication}, image ${entry.position}`,
  };
});
