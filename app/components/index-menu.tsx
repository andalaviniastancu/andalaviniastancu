"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { EDITORIALS } from "../data/editorials";
import { useMountEffect } from "../hooks/useMountEffect";
import { EASE_SWIFT } from "../site";

type IndexMenuProps = {
  className: string;
  style?: React.CSSProperties;
};

export function IndexMenu({ className, style }: IndexMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const onEditorial = pathname.startsWith("/editorial/");

  useMountEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen((current) => {
        if (current) triggerRef.current?.focus();
        return false;
      });
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`${className} ${
          open || onEditorial ? "text-ink" : "text-ink-muted hover:text-ink"
        }`}
        style={style}
      >
        Index
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
            transition={{ duration: 0.16, ease: EASE_SWIFT }}
            className="pointer-events-auto absolute top-full right-0 mt-3 flex min-w-max flex-col gap-1.5 border border-ink/15 bg-ground px-3 py-2.5"
          >
            {EDITORIALS.map(({ slug, title }) => {
              const current = pathname === `/editorial/${slug}`;

              return (
                <li key={slug}>
                  <Link
                    href={`/editorial/${slug}`}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block whitespace-nowrap transition-colors duration-150 ${
                      current ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
