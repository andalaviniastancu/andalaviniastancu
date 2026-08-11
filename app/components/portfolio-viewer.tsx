"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Frame } from "../data/sequence";
import { useMountEffect } from "../hooks/useMountEffect";
import { EASE_SWIFT, SITE_NAME } from "../site";
import { EdgeNav } from "./edge-nav";
import { ImagePlate } from "./image-plate";

export function PortfolioViewer({ frames }: { frames: Frame[] }) {
  const [[position, direction], setCursor] = useState([0, 1]);
  const reduceMotion = useReducedMotion() ?? false;

  const frame = frames[position];

  const step = (delta: number) =>
    setCursor(([current]) => [
      (current + delta + frames.length) % frames.length,
      delta,
    ]);

  useMountEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const shift = reduceMotion ? 0 : 10;

  return (
    <main className="relative flex h-[100svh] flex-col overflow-hidden">
      <h1 className="sr-only">{SITE_NAME}, selected work</h1>

      <div className="relative min-h-0 flex-1">
        <EdgeNav
          onPrevious={() => step(-1)}
          onNext={() => step(1)}
          previousLabel="Previous image"
          nextLabel="Next image"
        />
        <ImagePlate
          plateKey={frame.src}
          image={frame}
          sizeClass="max-h-full max-w-[calc(100vw-2.5rem)] md:max-w-[min(52vw,44rem)]"
        />
      </div>

      <div
        className="pointer-events-none z-30 flex shrink-0 justify-center px-5 pb-5 md:pb-6"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={frame.publication}
            initial={{ opacity: 0, y: direction * shift }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -shift }}
            transition={{ duration: 0.2, ease: EASE_SWIFT }}
          >
            {frame.publication}
          </motion.p>
        </AnimatePresence>
      </div>
    </main>
  );
}
