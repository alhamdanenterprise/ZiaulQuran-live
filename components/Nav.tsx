"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Coins, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
] as const;

/**
 * Nav bar background/blur is a persistent UI state driven by scroll
 * position — a plain CSS transition, intentionally NOT part of the GSAP
 * ScrollTrigger reveal system used for section content.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#about");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter((el): el is Element => Boolean(el));

    if (!sections.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="sticky top-4 z-50 px-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] border px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-black/5 bg-white/85 shadow-lg shadow-black/5 backdrop-blur-md"
            : "border-transparent bg-white/60 backdrop-blur-sm"
        )}
      >
        <Link href="/#top" className="flex items-center gap-3">
          <Image
            src="/logo.webp"
            alt="Zia-ul-Quran Sulemania Lilbanat logo"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full object-contain"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-lg font-semibold text-brand-blue sm:text-xl">
              Zia-ul-Quran
            </span>
            <span className="font-heading text-xs font-medium text-brand-blue/80 sm:text-sm">
              Sulemania Lilbanat
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${link.href}`}
                data-active={activeHref === link.href}
                className="nav-link text-sm font-medium text-ink data-[active=true]:text-brand-blue"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/#donate"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-250 hover:scale-[1.02] hover:bg-brand-green-dark"
          >
            Donate
            <Coins className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full text-brand-blue transition-colors hover:bg-brand-blue/10 lg:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-black/5 bg-white/95 p-4 shadow-lg backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  onClick={closeMobile}
                  data-active={activeHref === link.href}
                  className="flex min-h-11 items-center rounded-xl px-3 text-base font-medium text-ink data-[active=true]:text-brand-blue"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#donate"
            onClick={closeMobile}
            className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-green px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark"
          >
            Donate
            <Coins className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </header>
  );
}
