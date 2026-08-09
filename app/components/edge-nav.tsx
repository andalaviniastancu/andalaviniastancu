"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { PLATE_INSET } from "../site";

const ZONE_CLASS = `group absolute inset-y-0 z-10 flex w-1/2 items-center px-5 focus-visible:-outline-offset-4 md:px-8 ${PLATE_INSET}`;

const ARROW_CLASS =
  "size-5 opacity-0 transition-[opacity,translate,scale] duration-200 ease-swift group-hover:opacity-100 group-focus-visible:opacity-100 group-active:scale-90 pointer-coarse:opacity-100";

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
        className={`${ZONE_CLASS} left-0 cursor-w-resize justify-start`}
      >
        <ArrowLeft weight="light" className={`${ARROW_CLASS} group-hover:-translate-x-1`} />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className={`${ZONE_CLASS} right-0 cursor-e-resize justify-end`}
      >
        <ArrowRight weight="light" className={`${ARROW_CLASS} group-hover:translate-x-1`} />
      </button>
    </>
  );
}
