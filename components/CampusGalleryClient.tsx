"use client";

import { useRef } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";

// "4–5 rows to fill roughly a laptop screen height" — fixed at 5, but
// capped below if there aren't enough photos to spread across that many.
const MAX_ROWS = 5;
// A different duration per row (seconds) so rows never feel synced —
// values aren't just increasing, so neighbouring rows don't drift in a
// visibly regular pattern either.
const ROW_DURATIONS_S = [32, 44, 27, 50, 37];

interface CampusGalleryClientProps {
  images: string[];
}

export function CampusGalleryClient({ images }: CampusGalleryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  const rowCount = Math.min(MAX_ROWS, images.length);
  // Round-robin distribution so row sizes stay even regardless of the
  // total photo count (works whether there are 12 photos or 40).
  const rows = Array.from({ length: rowCount }, (_, rowIndex) =>
    images.filter((_, i) => i % rowCount === rowIndex)
  );

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="overflow-x-hidden bg-bg py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Campus Gallery"
          eyebrowIcon={Images}
          align="center"
          heading="A glimpse into everyday life at the madarsa."
          description="Moments from our classrooms, events, and campus — captured over the years."
          className="mb-12"
        />
      </div>

      <div data-reveal-group className="flex flex-col gap-3 sm:gap-4">
        {rows.map((rowImages, rowIndex) => {
          if (rowImages.length === 0) return null;

          const direction = rowIndex % 2 === 0 ? "marquee-left" : "marquee-right";
          const duration = ROW_DURATIONS_S[rowIndex % ROW_DURATIONS_S.length];

          return (
            <div key={rowIndex} data-reveal-item className="marquee-row overflow-hidden">
              <div
                className="marquee-track gap-3 sm:gap-4"
                style={{ animationName: direction, animationDuration: `${duration}s` }}
              >
                {/* Real set, announced to assistive tech. */}
                <ImageSet images={rowImages} hidden={false} />
                {/* Exact duplicate, back-to-back, purely for the seamless
                    loop — hidden from assistive tech so nothing is
                    announced twice. */}
                <ImageSet images={rowImages} hidden />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ImageSet({ images, hidden }: { images: string[]; hidden: boolean }) {
  return (
    <div className="flex gap-3 sm:gap-4" aria-hidden={hidden}>
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl ring-1 ring-black/5 sm:h-28 sm:w-44 md:h-36 md:w-56"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 768px) 224px, (min-width: 640px) 176px, 128px"
            className="pointer-events-none select-none object-cover"
          />
        </div>
      ))}
    </div>
  );
}
