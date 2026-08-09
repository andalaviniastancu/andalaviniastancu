type ImageLoaderArgs = {
  src: string;
  width: number;
};

export default function imageLoader({ src, width }: ImageLoaderArgs) {
  return `${src}-${width}.webp`;
}
