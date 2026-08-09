"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const ARROW_CLASS =
  "absolute top-1/2 size-5 -translate-y-1/2 opacity-0 transition-[opacity,translate,scale] duration-200 ease-swift group-hover:opacity-100 group-focus-visible:opacity-100 group-active:scale-90 pointer-coarse:opacity-100";

type EdgeNavProps = {
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
};

export function EdgeNav({ onPrevious, onNext, previousLabel, nextLabel }: EdgeNavProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrevious}
        aria-label={previousLabel}
        className="group absolute inset-y-0 left-0 z-10 w-1/2 cursor-w-resize focus-visible:-outline-offset-4"
      >
        <ArrowLeft
          weight="light"
          className={`${ARROW_CLASS} left-5 group-hover:-translate-x-1 md:left-8`}
        />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="group absolute inset-y-0 right-0 z-10 w-1/2 cursor-e-resize focus-visible:-outline-offset-4"
      >
        <ArrowRight
          weight="light"
          className={`${ARROW_CLASS} right-5 group-hover:translate-x-1 md:right-8`}
        />
      </button>
    </>
  );
}
