"use client";

import { useRef } from "react";
import {
  CalendarHeart,
  Medal,
  MessagesSquare,
  Mic2,
  MicVocal,
  Palette,
  PartyPopper,
} from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

const EVENTS: {
  icon: ComponentType<LucideProps>;
  title: string;
  description: string;
}[] = [
  {
    icon: Mic2,
    title: "Milad & Seerat",
    description:
      "Religious gatherings focused on the life and teachings of Prophet Muhammad ﷺ.",
  },
  {
    icon: MicVocal,
    title: "Qirat & Naat",
    description:
      "Competitions encouraging Quran recitation, Naat and student confidence.",
  },
  {
    icon: MessagesSquare,
    title: "Speech & Debate",
    description:
      "Activities developing communication, knowledge and presentation skills.",
  },
  {
    icon: Medal,
    title: "Sports & Awards",
    description:
      "Annual sports activities and award ceremonies recognising student achievements.",
  },
  {
    icon: Palette,
    title: "Creative Skills",
    description:
      "Art, designing, sewing and other educational skill-development activities.",
  },
  {
    icon: CalendarHeart,
    title: "Islamic & National Events",
    description:
      "Educational programmes observing important Islamic and national occasions.",
  },
];

export function Events() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  return (
    <section
      id="events"
      ref={containerRef}
      className="bg-bg-alt py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Events & Occasions"
          eyebrowIcon={PartyPopper}
          heading="Celebrated with zeal, every year."
          description="From spiritual gatherings to academic competitions, our events strengthen faith, nurture knowledge, and build a sense of community among our students."
          className="mb-12"
        />

        <div
          data-reveal-group
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {EVENTS.map(({ icon: Icon, title, description }) => (
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
                <h3 className="font-heading text-lg font-semibold text-brand-blue sm:text-xl">
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
