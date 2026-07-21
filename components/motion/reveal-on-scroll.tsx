"use client";

import { useEffect } from "react";

/**
 * Reveals elements marked with `data-reveal` as they scroll into view.
 *
 * Renders nothing. The initial hidden state lives in CSS behind both
 * `.js-reveal` (added here) and `prefers-reduced-motion: no-preference`, so
 * the server-rendered page is fully visible without JS and under reduced
 * motion. Elements already in view when this mounts are revealed synchronously
 * in the same tick the hidden state is enabled, so they never flash.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Enable the hidden state, then immediately reveal whatever is already on
    // screen — both happen before the next paint, so no in-view element blinks.
    root.classList.add("js-reveal");
    const pending: HTMLElement[] = [];
    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add("is-revealed");
      } else {
        pending.push(element);
      }
    }

    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    for (const element of pending) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return null;
}
