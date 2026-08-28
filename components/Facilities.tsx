"use client";

import { useRef } from "react";
import {
  Building2,
  BookOpen,
  Plus,
  Utensils,
  Scissors,
  Users,
  Sparkle,
} from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

const FACILITIES: {
  icon: ComponentType<LucideProps>;
  circled?: boolean;
  title: string;
  description: string;
}[] = [
  {
    icon: Building2,
    title: "Campus Building",
    description: "Safe, clean, and secure spaces for learning and daily life.",
  },
  {
    icon: BookOpen,
    title: "Library",
    description:
      "A quiet resource center with books to inspire knowledge and reflection.",
  },
  {
    icon: Plus,
    circled: true,
    title: "Medical Support",
    description: "Access to basic healthcare and on-call medical assistance.",
  },
  {
    icon: Utensils,
    title: "Nutritious Meals",
    description: "Balanced, hygienic meals prepared with care and compassion.",
  },
  {
    icon: Scissors,
    title: "Tailoring & Vocational Room",
    description:
      "Hands-on skills training for confidence, self-reliance, and future opportunities.",
  },
  {
    icon: Users,
    title: "Communal Spaces",
    description: "Spaces to connect, collaborate, and grow together in harmony.",
  },
];

export function Facilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  return (
    <section
      id="facilities"
      ref={containerRef}
      className="bg-bg py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Life on Campus"
          eyebrowIcon={Sparkle}
          align="center"
          heading="Facilities built for comfort and growth."
          className="mb-12"
        />

        <div
          data-reveal-group
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {FACILITIES.map(({ icon: Icon, circled, title, description }) => (
            <SurfaceCard
              key={title}
              data-reveal-item
              className="relative flex flex-col items-center gap-4 text-center"
            >
              {circled ? (
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-green text-brand-green">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
              ) : (
                <Icon
                  className="h-12 w-12 text-brand-green"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              )}

              <h3 className="font-heading text-lg font-semibold text-brand-blue">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
