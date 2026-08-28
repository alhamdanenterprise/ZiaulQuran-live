"use client";

import { useRef } from "react";
import Image from "next/image";
import { Award, BookOpen, BookOpenCheck, Calendar, GraduationCap, HeartHandshake, MapPin, Users } from "lucide-react";
import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading, Divider } from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: HeartHandshake,
    title: "Faith-Centred Education",
    description:
      "Nurturing hearts and minds through authentic Islamic teachings and values.",
  },
  {
    icon: BookOpen,
    title: "Character & Compassion",
    description:
      "Building strong character grounded in compassion, respect and integrity.",
  },
  {
    icon: Award,
    title: "Knowledge for Generations",
    description:
      "Empowering our students to serve Deen, society and humanity with excellence.",
  },
];

const PROFILES = [
  {
    photo: "/founder.webp",
    label: "Founder",
    name: "Peer Syed Abul Hassan Shah Manzoor Hamdani",
    lineOne: "Founder General Secretary, Anjuman Qamar-ul-Islam Sulemania",
  },
  {
    photo: "/ceo.webp",
    label: "Current CEO",
    name: "Syed Ameena Hamdani",
    lineOne: "Leader. Educator. Guide.",
    lineTwo: "Continuing the Legacy",
  },
];

const STATS = [
  { icon: Calendar, label: "Established", value: "1979" },
  { icon: MapPin, label: "Location", value: "Azam Basti, Karachi" },
  { icon: Users, label: "Students", value: "Thousands of Girls" },
  { icon: GraduationCap, label: "Mission", value: "Faith. Knowledge. Shelter." },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  return (
    <section id="about" ref={containerRef} className="bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="About Us"
              eyebrowIcon={BookOpenCheck}
              headingClassName="text-ink"
              heading={
                <>
                  A Legacy of Faith,
                  <br />A Future of Excellence.
                </>
              }
              description={
                <>
                  Zia-ul-Quran Sulemania Lilbanat was established in 1979 in
                  Azam Basti, Karachi, with a noble vision — to provide
                  quality Islamic education to young girls in the light of
                  {" "}
                  <span className="font-semibold text-brand-green">
                    Quran and Sunnah
                  </span>
                  , while instilling the timeless values of the Sunni-Sufi
                  tradition.
                </>
              }
            />

            <div
              data-reveal-group
              className="grid grid-cols-1 gap-8 divide-y divide-black/5 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-y-0"
            >
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  data-reveal-item
                  className="flex flex-col gap-3 pt-6 first:pt-0 sm:pt-0 sm:first:pl-0 sm:pl-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-green text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-heading text-base font-semibold text-ink">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div
              data-reveal-group
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {PROFILES.map((profile) => (
                <div
                  key={profile.name}
                  data-reveal-item
                  className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(17,19,24,0.04)] transition-all duration-300 hover:[transform:translateY(-4px)] hover:shadow-[0_20px_36px_-16px_rgba(14,134,212,0.18)]"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-bg-alt">
                    <Image
                      src={profile.photo}
                      alt={`${profile.name}, ${profile.label}`}
                      fill
                      sizes="(min-width: 640px) 220px, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      {profile.label}
                    </span>
                    <h3 className="font-heading text-base font-semibold text-brand-green sm:text-lg">
                      {profile.name}
                    </h3>
                    <Divider align="center" />
                    <p className="text-sm text-ink-soft">{profile.lineOne}</p>
                    <p className="text-sm text-ink-soft">{profile.lineTwo}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              data-reveal
              className="flex gap-4 rounded-2xl bg-bg-alt p-6"
            >
              <span
                className="mt-1 w-1 shrink-0 rounded-full bg-brand-green"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                Our mission is to spread Islam by making its teachings
                accessible to orphans and those in need, to{" "}
                <span className="font-semibold text-ink">
                  instil the Sunnah and Hadith of the Holy Prophet ﷺ as a way
                  of life
                </span>
                , and to provide shelter and education to children affected
                by hardship and orphans without guardians.
              </p>
            </div>
          </div>
        </div>

        <div
          data-reveal-group
          className="mt-12 grid grid-cols-2 gap-6 divide-black/5 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(17,19,24,0.04)] sm:grid-cols-4 sm:divide-x"
        >
          {STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              data-reveal-item
              className="flex items-center gap-3 sm:pl-6 sm:first:pl-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex flex-col">
                <span className="font-heading text-sm font-semibold text-ink">
                  {label}
                </span>
                <span className="text-sm text-ink-soft">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
