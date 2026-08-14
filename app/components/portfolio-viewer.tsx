"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Frame } from "../../lib/sanity";
import { useMountEffect } from "../hooks/useMountEffect";
import { EASE_SWIFT } from "../site";
import { EdgeNav } from "./edge-nav";
import { ImagePlate } from "./image-plate";

type PortfolioViewerProps = {
  frames: Frame[];
  siteName: string;
};

export function PortfolioViewer({ frames, siteName }: PortfolioViewerProps) {
  const [[position, direction], setCursor] = useState([0, 1]);
  const reduceMotion = useReducedMotion() ?? false;

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

  if (frames.length === 0) {
    return (
      <main className="flex h-[100svh] items-center justify-center px-5">
        <p className="text-ink-muted">No images published yet.</p>
      </main>
    );
  }

  const frame = frames[position];
  const shift = reduceMotion ? 0 : 10;

  return (
    <main className="relative flex h-[100svh] flex-col overflow-hidden">
      <h1 className="sr-only">{siteName}, selected work</h1>

      <div className="relative min-h-0 flex-1">
        <EdgeNav
          onPrevious={() => step(-1)}
          onNext={() => step(1)}
          previousLabel="Previous image"
          nextLabel="Next image"
        />
        <ImagePlate
          plateKey={frame.key}
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
            key={frame.publication ?? frame.key}
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
