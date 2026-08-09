"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectImage } from "../data/projects";
import { EASE_SWIFT } from "../site";

type ImagePlateProps = {
  plateKey: string;
  image: ProjectImage;
  sizeClass: string;
  href?: string;
};

export function ImagePlate({ plateKey, image, sizeClass, href }: ImagePlateProps) {
  const reduceMotion = useReducedMotion() ?? false;

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0, pointerEvents: "none" as const },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
        animate: {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.45, ease: EASE_SWIFT },
        },
        exit: {
          opacity: 0,
          scale: 1.01,
          filter: "blur(4px)",
          pointerEvents: "none" as const,
          transition: { duration: 0.35, ease: EASE_SWIFT },
        },
      };

  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 768px) 80vw, 52vw"
      priority
      className={`h-auto w-auto object-contain ${sizeClass}`}
    />
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-20 grid grid-rows-[1fr] pt-16 pb-4 md:pt-20 md:pb-6">
      <AnimatePresence>
        <motion.div
          key={plateKey}
          className="col-start-1 row-start-1 flex h-full min-h-0 w-full items-center justify-center"
          {...motionProps}
        >
          {href ? (
            <Link href={href} className="pointer-events-auto flex h-full min-h-0 items-center">
              {picture}
            </Link>
          ) : (
            picture
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
