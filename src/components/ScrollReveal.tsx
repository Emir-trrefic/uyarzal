"use client";

import { useEffect } from "react";

/**
 * Fades `.reveal` elements up as they enter the viewport. Content is only
 * hidden once this has run (the `js-reveal` class), so it stays visible
 * without JavaScript, and reduced-motion users get no movement.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
