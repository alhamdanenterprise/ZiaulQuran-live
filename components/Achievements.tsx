"use client";

import { useRef } from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="bg-bg py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div
          data-reveal
          className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80"
        >
          <Image
            src="/trophy.webp"
            alt="Trophy in a laurel wreath, representing prizes and shields won by our students"
            width={320}
            height={320}
            className="h-full w-full rounded-full object-contain"
          />
        </div>

        <SectionHeading
          eyebrow="Recognition"
          eyebrowIcon={Trophy}
          heading="Prizes, trophies, and shields — won by our students."
          description="Our students consistently excel in inter-madarsa and educational competitions, bringing honor to the madarsa. These achievements reflect their dedication, hard work, and the quality of Islamic education imparted at our institution."
        />
      </div>
    </section>
  );
}
