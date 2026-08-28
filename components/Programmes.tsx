"use client";

import { useRef } from "react";
import { BookOpen, GraduationCap, Layers, ScrollText } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

const PROGRAMMES: {
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
}[] = [
  {
    icon: BookOpen,
    title: "Nursery Onward",
    description:
      "Foundational academic education in a nurturing Islamic environment that develops knowledge, character, confidence, and strong moral values.",
  },
  {
    icon: GraduationCap,
    title: "Matric & Intermediate",
    description:
      "A balanced modern curriculum combined with Islamic values, preparing students for higher education and future opportunities.",
  },
  {
    icon: ScrollText,
    title: "Dars-e-Nizami / Alimah Programme",
    description:
      "Comprehensive Islamic scholarship covering Quran, Hadith, Fiqh, Arabic, and other essential Islamic sciences.",
  },
  {
    icon: Layers,
    title: "Quranic & Skills Education",
    description:
      "Nazra, Hifz, Tajweed, Qirat, Arabic and English language learning, computer education, stitching, and practical skills development.",
  },
];

export function Programmes() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  return (
    <section
      id="programmes"
      ref={containerRef}
      className="bg-bg-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Academic Programmes"
          eyebrowIcon={GraduationCap}
          heading="Two curricula, taught as one path."
          description="A unique integration of modern and religious learning, empowering students with knowledge, character, and purpose to serve society with faith and excellence."
          className="mb-12"
        />

        <div
          data-reveal-group
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {PROGRAMMES.map(({ icon: Icon, title, description }) => (
            <SurfaceCard
              key={title}
              data-reveal-item
              className="flex items-start gap-5"
            >
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gold/60">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span
                  className="absolute -bottom-1.5 h-2 w-2 rotate-45 bg-gold"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-xl font-semibold text-brand-blue">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {description}
                </p>
              </div>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
