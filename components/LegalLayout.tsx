import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: ReactNode;
  children: ReactNode;
}

export function LegalLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <Nav />
      <main className="flex flex-1 flex-col">
        <section className="bg-grid-faint bg-bg">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
            <Link
              href="/"
              className="mb-6 flex w-fit items-center gap-2 text-sm font-medium text-brand-blue hover:text-brand-blue/80"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
              {eyebrow}
            </span>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-brand-blue sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-ink-soft">
              Last updated: {lastUpdated}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
              {intro}
            </p>
          </div>
        </section>

        <section className="bg-bg pb-20 sm:pb-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="flex flex-col divide-y divide-black/5 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(17,19,24,0.04)] sm:p-10">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 py-6 first:pt-0 last:pb-0">
      <h2 className="font-heading text-lg font-semibold text-brand-blue sm:text-xl">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink-soft sm:text-base">
        {children}
      </div>
    </div>
  );
}
