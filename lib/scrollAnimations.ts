"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REVEAL_FROM = { opacity: 0, y: 24 };
const REVEAL_TO = {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: "power2.out",
  // Once the reveal finishes, drop the inline transform-related styles
  // GSAP leaves behind. An inline style always beats a CSS class, so
  // without this a card's `hover:-translate-y-1` (or any other hover
  // transform) would be silently overridden forever after its
  // scroll-reveal plays once — GSAP pins `translate`/`rotate`/`scale` to
  // "none" inline (Tailwind v4's hover utilities animate those same
  // modern CSS properties, not the legacy `transform` shorthand) while it
  // owns the animation. This only clears on the forward "revealed"
  // completion, not on reverse, so the scroll-away hide still works.
  clearProps: "transform,translate,rotate,scale",
};

/**
 * Shared scroll-reveal animation for section content.
 *
 * Attach the returned-from `containerRef` to a section wrapper, then mark
 * elements to animate with data attributes:
 *  - `data-reveal`        — an individual element (heading, paragraph) that
 *                            fades + rises in on scroll into view, and
 *                            reverses on scroll back out.
 *  - `data-reveal-group`  — a grid/row wrapper whose `data-reveal-item`
 *                            children stagger in together as one animation.
 *
 * Every trigger uses the same play/reverse behaviour on scroll down and
 * scroll back up, and is cleaned up via `gsap.context().revert()` so no
 * ScrollTrigger instances leak across route changes or fast refresh.
 */
export function useScrollReveal<T extends HTMLElement>(
  containerRef: RefObject<T | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll<HTMLElement>("[data-reveal]");
      items.forEach((el) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            // "end" only governs when this reveal REVERSES (toggleActions'
            // onLeave/onLeaveBack) — it intentionally is NOT a tight "top
            // 50%" window. With a narrow end point, tall elements (card
            // grids, multi-line paragraphs) would still be visibly on
            // screen when "onLeave" fires and reverse them back to
            // hidden — content would flash in then vanish again while the
            // user is still scrolling straight down past it. "bottom top"
            // instead only reverses once the element has fully scrolled
            // out of view (off the top going down, or back below the fold
            // scrolling back up), which is what "fades out when scrolled
            // back away from" means in practice.
            end: "bottom top",
            toggleActions: "play reverse play reverse",
            // A very fast/instant scroll (flick, keyboard "End", or a
            // non-smooth anchor jump) can otherwise skip straight past
            // "start" to "end" in one tick, firing onLeave before onEnter
            // ever ran and leaving the element stuck at its hidden state.
            fastScrollEnd: true,
          },
        }).fromTo(el, REVEAL_FROM, REVEAL_TO);
      });

      const groups = container.querySelectorAll<HTMLElement>(
        "[data-reveal-group]"
      );
      groups.forEach((group) => {
        const groupItems = group.querySelectorAll<HTMLElement>(
          "[data-reveal-item]"
        );
        if (!groupItems.length) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            // "end" only governs when this reveal REVERSES (toggleActions'
            // onLeave/onLeaveBack) — it intentionally is NOT a tight "top
            // 50%" window. With a narrow end point, tall elements (card
            // grids, multi-line paragraphs) would still be visibly on
            // screen when "onLeave" fires and reverse them back to
            // hidden — content would flash in then vanish again while the
            // user is still scrolling straight down past it. "bottom top"
            // instead only reverses once the element has fully scrolled
            // out of view (off the top going down, or back below the fold
            // scrolling back up), which is what "fades out when scrolled
            // back away from" means in practice.
            end: "bottom top",
            toggleActions: "play reverse play reverse",
            // A very fast/instant scroll (flick, keyboard "End", or a
            // non-smooth anchor jump) can otherwise skip straight past
            // "start" to "end" in one tick, firing onLeave before onEnter
            // ever ran and leaving the element stuck at its hidden state.
            fastScrollEnd: true,
          },
        }).fromTo(
          groupItems,
          REVEAL_FROM,
          { ...REVEAL_TO, stagger: 0.1 }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
