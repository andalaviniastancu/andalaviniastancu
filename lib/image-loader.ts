type LoaderArgs = { src: string; width: number; quality?: number };

export default function sanityImageLoader({ src, width, quality }: LoaderArgs) {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 72));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
}
