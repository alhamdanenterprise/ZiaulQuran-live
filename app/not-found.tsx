import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Divider } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Page Not Found — Zia-ul-Quran Sulemania Lilbanat",
  description:
    "The page you're looking for doesn't exist or may have moved.",
};

/**
 * App Router's special not-found.tsx — rendered (with a real 404 status)
 * for any unmatched route, inside the root layout's <html>/<body>. Reuses
 * the same icon-badge motif as Programmes/Events and the same button
 * styles as Hero, so it reads as part of the site rather than a generic
 * framework error page.
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <section className="bg-grid-faint flex min-h-[70vh] items-center bg-bg">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gold/60">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <span
                className="absolute -bottom-1.5 h-2 w-2 rotate-45 bg-gold"
                aria-hidden="true"
              />
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
              Error 404
            </span>

            <h1 className="font-heading text-4xl font-bold leading-tight text-brand-blue sm:text-5xl">
              Page Not Found
            </h1>

            <Divider align="center" />

            <p className="max-w-md text-base leading-relaxed text-ink-soft">
              The page you&apos;re looking for doesn&apos;t exist, may have
              been moved, or the link may be outdated. Let&apos;s help you
              find your way back.
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-250 hover:scale-[1.02] hover:bg-brand-blue/90"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand-green px-6 py-3.5 text-sm font-semibold text-brand-green transition-all duration-250 hover:scale-[1.02] hover:bg-brand-green hover:text-white"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
