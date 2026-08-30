"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { ComponentType } from "react";
import { Check, Copy, HandCoins, Landmark, Smartphone } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { useScrollReveal } from "@/lib/scrollAnimations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * Bank Transfer and JazzCash both use the madarsa's real account details,
 * provided by the client. Easypaisa isn't listed — no real account was
 * given for it (add a row back here if/when one is).
 */
const PAYMENT_METHODS: {
  icon: ComponentType<LucideProps>;
  title: string;
  accountName: string;
  accountNumber: string;
}[] = [
  {
    icon: Landmark,
    title: "Bank Transfer",
    accountName: "M.D Ziaul Quran Sulemania (UBL Bank, Branch Code 1514)",
    accountNumber: "0112154101028060",
  },
  {
    icon: Smartphone,
    title: "JazzCash",
    accountName: "Ameena Hamdani",
    accountNumber: "0303 2002263",
  }
];

function PaymentMethodRow({
  icon: Icon,
  title,
  accountName,
  accountNumber,
}: (typeof PAYMENT_METHODS)[number]) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — silently ignore, the number is still visible to copy manually.
    }
  };

  return (
    <div className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="flex-1">
        <h3 className="font-heading text-base font-semibold text-ink">
          {title}
        </h3>
        <p className="text-sm text-ink-soft">
          <span className="text-ink-soft/70">Account Name </span>
          {accountName}
        </p>
        <p className="text-sm text-ink-soft">
          <span className="text-ink-soft/70">Account Number </span>
          {accountNumber}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-200",
          copied
            ? "border-brand-green bg-brand-green/10 text-brand-green"
            : "border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5"
        )}
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}


export function Donate() {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(containerRef);

  return (
    <section id="donate" ref={containerRef} className="bg-bg py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Support the Madarsa"
          eyebrowIcon={HandCoins}
          align="center"
          divider={false}
          heading="Your contribution keeps this trust running."
          description="Every donation — Cash, Zakat, Sadaqah, or Fitrana — helps us shelter and educate our students, including orphans and children affected by hardship."
          className="mb-10"
        />

        <div
          data-reveal-group
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]"
        >
          <div
            data-reveal-item
            className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(17,19,24,0.04)] transition-all duration-300 hover:[transform:translateY(-4px)] hover:shadow-[0_20px_36px_-16px_rgba(14,134,212,0.22)] sm:p-8"
          >
            <div className="divide-y divide-black/5">
              {PAYMENT_METHODS.map((method) => (
                <PaymentMethodRow key={method.title} {...method} />
              ))}
            </div>
          </div>

          <div
            data-reveal-item
            className="flex items-center justify-center rounded-2xl bg-brand-blue p-8 transition-all duration-300 hover:[transform:translateY(-4px)] hover:shadow-[0_20px_40px_-16px_rgba(9,55,92,0.45)]"
          >
            <div className="w-full max-w-[240px] overflow-hidden rounded-xl bg-white p-4">
              <Image
                src="/barcode.PNG"
                alt="JazzCash QR code for donations"
                width={276}
                height={221}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
