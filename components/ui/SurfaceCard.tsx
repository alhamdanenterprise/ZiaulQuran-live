import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Shared white card surface used across Programmes, Facilities and Events
 * grids. Hover micro-interaction is a lightweight CSS transition (not GSAP)
 * per the project's animation split between GSAP scroll-reveal and CSS
 * hover states.
 */
export function SurfaceCard({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-black/[0.04] bg-white p-6 shadow-[0_1px_2px_rgba(17,19,24,0.04)]",
        // A literal transform (not Tailwind's calc()-based -translate-y-1)
        // so the hover lift is unaffected by GSAP having previously
        // animated this element's transform for the scroll-reveal.
        "transition-all duration-300 ease-out hover:[transform:translateY(-4px)] hover:shadow-[0_20px_36px_-16px_rgba(14,134,212,0.22)]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
