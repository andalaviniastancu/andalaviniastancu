import { SITE_NAME } from "../site";
import { MEDIA } from "./media";

export type Credit = { label: string; value: string };

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  look?: Credit[];
};

export type Project = {
  slug: string;
  name: string;
  credits: Credit[];
  images: ProjectImage[];
};

const TK = "TK";
const FULL_LOOK: Credit[] = [{ label: "Full look", value: TK }];

const teamCredits = (): Credit[] => [
  { label: "Photography", value: TK },
  { label: "Model", value: TK },
  { label: "Hair", value: TK },
  { label: "Make-up", value: TK },
  { label: "Styling", value: SITE_NAME },
];

export const PROJECTS: Project[] = [
  {
    slug: "vakuum-universe",
    name: "Vakuum Universe",
    credits: teamCredits(),
    images: [
      {
        ...MEDIA["vakuum-universe/1"],
        alt: "A model crouching on a pale cyclorama in layered cream and pink knitwear, a compact disc worn as an earring.",
        look: [
          { label: "Top", value: TK },
          { label: "Corset", value: TK },
          { label: "Tights", value: TK },
          { label: "Shoes", value: TK },
        ],
      },
      { ...MEDIA["vakuum-universe/2"], alt: "Vakuum Universe, look 2", look: FULL_LOOK },
      { ...MEDIA["vakuum-universe/3"], alt: "Vakuum Universe, look 3", look: FULL_LOOK },
      { ...MEDIA["vakuum-universe/4"], alt: "Vakuum Universe, look 4", look: FULL_LOOK },
      { ...MEDIA["vakuum-universe/5"], alt: "Vakuum Universe, look 5", look: FULL_LOOK },
    ],
  },
  {
    slug: "numero-switzerland",
    name: "Numéro Switzerland",
    credits: teamCredits(),
    images: [
      {
        ...MEDIA["numero-switzerland/1"],
        alt: "Overhead view of a figure standing in dense green undergrowth in a black satin dress, a pale blue opera glove and white slingback heels.",
        look: [
          { label: "Dress", value: TK },
          { label: "Gloves", value: TK },
          { label: "Shoes", value: TK },
        ],
      },
      { ...MEDIA["numero-switzerland/2"], alt: "Numéro Switzerland, look 2", look: FULL_LOOK },
      { ...MEDIA["numero-switzerland/3"], alt: "Numéro Switzerland, look 3", look: FULL_LOOK },
      { ...MEDIA["numero-switzerland/4"], alt: "Numéro Switzerland, look 4", look: FULL_LOOK },
      { ...MEDIA["numero-switzerland/5"], alt: "Numéro Switzerland, look 5", look: FULL_LOOK },
      { ...MEDIA["numero-switzerland/6"], alt: "Numéro Switzerland, look 6", look: FULL_LOOK },
    ],
  },
  {
    slug: "nyankiir",
    name: "Nyankiir",
    credits: teamCredits(),
    images: [
      {
        ...MEDIA["nyankiir/1"],
        alt: "Close view from behind of a shoulder and arm in a black patent racerback top, against a glass block wall lit cool blue.",
        look: [{ label: "Top", value: TK }],
      },
      { ...MEDIA["nyankiir/2"], alt: "Nyankiir, look 2", look: FULL_LOOK },
    ],
  },
  {
    slug: "c41-magazine",
    name: "C41 Magazine",
    credits: teamCredits(),
    images: [
      {
        ...MEDIA["c41-magazine/1"],
        alt: "Extreme close-up of a face with pale brows and a downward gaze, tangled white cord resting against the cheek.",
      },
      { ...MEDIA["c41-magazine/2"], alt: "C41 Magazine, look 2", look: FULL_LOOK },
      { ...MEDIA["c41-magazine/3"], alt: "C41 Magazine, look 3", look: FULL_LOOK },
      { ...MEDIA["c41-magazine/4"], alt: "C41 Magazine, look 4", look: FULL_LOOK },
    ],
  },
];
