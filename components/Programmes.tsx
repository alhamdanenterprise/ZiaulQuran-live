"use client";

import { useRef } from "react";
import {
  BookOpen,
  GraduationCap,
  Languages,
  Scale,
  School,
  ScrollText,
} from "lucide-react";
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
    title: "Hifz & Tajweed",
    description:
      "Quranic education focused on Hifz, Nazra, correct recitation and Tajweed.",
  },
  {
    icon: ScrollText,
    title: "Dars-e-Nizami",
    description:
      "Traditional Islamic studies covering essential religious sciences.",
  },
  {
    icon: Languages,
    title: "Arabic Studies",
    description:
      "Arabic language and literature including Adab-e-Arabi and Fazil Arabi.",
  },
  {
    icon: Scale,
    title: "Tafsir & Fiqh",
    description:
      "Study of Quran translation, Tafsir and Islamic jurisprudence.",
  },
  {
    icon: School,
    title: "English-Medium School",
    description:
      "Quality English-medium education alongside Islamic learning.",
  },
  {
    icon: GraduationCap,
    title: "Modern Education",
    description:
      "Contemporary education from Matric and Intermediate through higher academic levels.",
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
