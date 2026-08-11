"use client";

const ZONE_CLASS =
  "absolute inset-y-0 z-10 w-1/2 focus-visible:-outline-offset-4";

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
        className={`${ZONE_CLASS} left-0 cursor-w-resize`}
      />
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className={`${ZONE_CLASS} right-0 cursor-e-resize`}
      />
    </>
  );
}
