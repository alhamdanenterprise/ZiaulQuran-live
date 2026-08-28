"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Coins, MapPin } from "lucide-react";
import gsap from "gsap";

const ARABIC_DUA = "رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا";

/**
 * Hero gets a one-time entrance animation on mount — separate from the
 * shared ScrollTrigger reveal system, never scroll-triggered and never
 * re-fires. The logo does a plain opacity fade only (no y-movement, no
 * scale bounce).
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll<HTMLElement>(
        "[data-hero-item]"
      );

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(
        items,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }
      );

      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "<0.2"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="bg-grid-faint relative overflow-hidden bg-bg"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-28">
        <div className="flex flex-col gap-6">
          <div data-hero-item className="flex flex-col gap-2">
            <div className="flex items-center gap-3 text-lg font-medium text-ink sm:text-xl">
              <span className="text-brand-blue" aria-hidden="true">
                ✦
              </span>
              <span dir="rtl" className="font-amiri" lang="ar">
                {ARABIC_DUA}
              </span>
              <span className="text-brand-blue" aria-hidden="true">
                ✦
              </span>
            </div>
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-px w-14 bg-gold" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-14 bg-gold" />
            </div>
          </div>

          <h1
            data-hero-item
            className="font-heading font-bold leading-[1.15] text-brand-blue"
          >
            <span className="block text-4xl sm:text-5xl lg:text-[3.25rem]">
              Zia-ul-Quran
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl">
              Sulemania Lilbanat
            </span>
          </h1>

          <p
            data-hero-item
            className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            A long-established Sunni-Sufi girls&apos; madarsa in Karachi,
            dedicated to nurturing faith, imparting authentic Islamic
            knowledge, and building character through Islamic education
            rooted in the Quran and Sunnah.
          </p>

          <div data-hero-item className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-250 hover:scale-[1.02] hover:bg-brand-blue/90"
            >
              Admissions Enquiry
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#donate"
              className="inline-flex items-center gap-2 rounded-full border-2 border-brand-green px-6 py-3.5 text-sm font-semibold text-brand-green transition-all duration-250 hover:scale-[1.02] hover:bg-brand-green hover:text-white"
            >
              Support the Madarsa
              <Coins className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div
            data-hero-item
            className="flex flex-wrap items-center gap-3 text-sm text-ink-soft"
          >
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              Established 1979
            </span>
            <span className="text-brand-blue" aria-hidden="true">
              •
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-blue" aria-hidden="true" />
              Azam Basti, Karachi
            </span>
          </div>
        </div>

        <div ref={logoRef} className="mx-auto lg:mx-0 lg:justify-self-end">
          <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white p-6 shadow-xl shadow-brand-blue/10 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            <Image
              src="/logo.webp"
              alt="Zia-ul-Quran Sulemania Lilbanat emblem"
              width={400}
              height={400}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
