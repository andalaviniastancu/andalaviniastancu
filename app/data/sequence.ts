import { MEDIA } from "./media";

export type Frame = {
  position: number;
  src: string;
  width: number;
  height: number;
  alt: string;
  publication: string;
};

const PUBLICATION_STARTS: Record<number, string> = {
  1: "C41 Magazine",
  2: "Vakuum Magazine",
  8: "Numéro Switzerland",
  15: "PAP Magazine",
  19: "Nyankiir in London",
};

export const SEQUENCE: Frame[] = MEDIA.reduce<Frame[]>((frames, entry) => {
  const publication =
    PUBLICATION_STARTS[entry.position] ?? frames.at(-1)?.publication ?? "";

  frames.push({
    position: entry.position,
    src: entry.src,
    width: entry.width,
    height: entry.height,
    publication,
    alt: `${publication}, image ${entry.position}`,
  });

  return frames;
}, []);
