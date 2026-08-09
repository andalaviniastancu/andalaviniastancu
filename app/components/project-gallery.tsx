"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "../data/projects";
import { useMountEffect } from "../hooks/useMountEffect";
import { EASE_SWIFT } from "../site";
import { CreditList } from "./credit-list";
import { EdgeNav } from "./edge-nav";
import { ImagePlate } from "./image-plate";

const RUN_IN = "flex flex-wrap justify-center gap-x-3";

export function ProjectGallery({ project }: { project: Project }) {
  const router = useRouter();
  const [position, setPosition] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;

  const count = project.images.length;
  const image = project.images[position];

  const step = (delta: number) =>
    setPosition((current) => (current + delta + count) % count);

  useMountEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <main className="relative h-[100svh] overflow-hidden">
      <ImagePlate
        plateKey={image.src}
        image={image}
        sizeClass="max-h-[calc(100svh-16rem)] max-w-[calc(100vw-6.5rem)] lg:max-h-[calc(100svh-14rem)] lg:max-w-[min(52vw,44rem)]"
      />

      <EdgeNav
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
        previousLabel="Previous image"
        nextLabel="Next image"
      />

      <div className="absolute inset-x-0 bottom-5 z-30 flex flex-col items-center gap-4 px-5 lg:bottom-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-end lg:gap-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: 0.2, ease: EASE_SWIFT }}
            className="lg:justify-self-start"
          >
            <CreditList credits={image.look} className={`${RUN_IN} lg:block lg:text-left`} />
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col items-center gap-3 lg:gap-4">
          <div className="flex items-end gap-1.5 lg:gap-2">
            {project.images.map((entry, index) => (
              <button
                key={entry.src}
                type="button"
                onClick={() => setPosition(index)}
                aria-label={`Show image ${index + 1} of ${count}`}
                aria-current={index === position}
                className={`block transition-opacity duration-150 ${
                  index === position ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image
                  src={entry.src}
                  alt=""
                  width={entry.width}
                  height={entry.height}
                  sizes="112px"
                  className="h-10 w-auto lg:h-12"
                />
              </button>
            ))}
          </div>

          <h1>{project.name}</h1>
        </div>

        <CreditList
          credits={project.credits}
          className={`${RUN_IN} lg:block lg:justify-self-end lg:text-right`}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        Image {position + 1} of {count}
      </p>
    </main>
  );
}
