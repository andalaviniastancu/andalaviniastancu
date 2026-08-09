"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "../data/projects";
import { useMountEffect } from "../hooks/useMountEffect";
import { EASE_SWIFT } from "../site";
import { EdgeNav } from "./edge-nav";
import { ImagePlate } from "./image-plate";

export function ProjectViewer({ projects }: { projects: Project[] }) {
  const [[position, direction], setCursor] = useState([0, 1]);
  const reduceMotion = useReducedMotion() ?? false;

  const project = projects[position];
  const previous = projects[(position - 1 + projects.length) % projects.length];
  const next = projects[(position + 1) % projects.length];

  const step = (delta: number) =>
    setCursor(([current]) => [
      (current + delta + projects.length) % projects.length,
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
    <main className="relative h-[100svh] overflow-hidden">
      <h1 className="sr-only">Anda Lavinia Stancu, selected work</h1>

      <ImagePlate
        plateKey={project.slug}
        image={project.images[0]}
        href={`/work/${project.slug}`}
        sizeClass="max-h-[calc(100svh-9rem)] max-w-[calc(100vw-6.5rem)] cursor-pointer md:max-h-[calc(100svh-11rem)] md:max-w-[min(52vw,44rem)]"
      />

      <EdgeNav
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
        previousLabel={`Previous project, ${previous.name}`}
        nextLabel={`Next project, ${next.name}`}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex justify-center md:bottom-6"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: direction * shift }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction * -shift }}
            transition={{ duration: 0.2, ease: EASE_SWIFT }}
          >
            <Link
              href={`/work/${project.slug}`}
              className="pointer-events-auto transition-colors duration-150 hover:text-ink-muted"
            >
              {project.name}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
