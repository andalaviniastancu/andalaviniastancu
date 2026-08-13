"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { Frame } from "../data/sequence";
import { EASE_SWIFT } from "../site";

type EditorialFrameProps = {
  frame: Frame;
  priority: boolean;
};

export function EditorialFrame({ frame, priority }: EditorialFrameProps) {
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
        src={frame.src}
        alt={frame.alt}
        width={frame.width}
        height={frame.height}
        priority={priority}
        sizes="(max-width: 768px) 90vw, min(52vw, 44rem)"
        className="h-auto max-h-[85svh] w-auto max-w-full object-contain"
      />
    </motion.div>
  );
}
