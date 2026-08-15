"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { SanityImage } from "../../lib/sanity";
import { EASE_SWIFT } from "../site";

type EditorialFrameProps = {
  image: SanityImage;
  priority: boolean;
  fallbackAlt: string;
};

export function EditorialFrame({
  image,
  priority,
  fallbackAlt,
}: EditorialFrameProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: EASE_SWIFT }}
      className="flex justify-center"
    >
      <Image
        src={image.src}
        alt={image.alt || fallbackAlt}
        width={image.width}
        height={image.height}
        priority={priority}
        placeholder={image.lqip ? "blur" : "empty"}
        blurDataURL={image.lqip ?? undefined}
        sizes="(max-width: 768px) 90vw, min(52vw, 44rem)"
        className="h-auto max-h-[85svh] w-auto max-w-full object-contain"
      />
    </motion.div>
  );
}
