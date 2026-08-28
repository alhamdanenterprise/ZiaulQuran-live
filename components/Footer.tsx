import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Landmark, Mail, MapPin, Phone } from "lucide-react";
import { RiFacebookFill, RiInstagramFill, RiTiktokFill } from "@remixicon/react";
import { CONTACT_INFO, SOCIAL_LINKS } from "@/lib/siteConfig";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programmes", href: "#programmes" },
  { label: "Facilities", href: "#facilities" },
  { label: "Events", href: "#events" },
  { label: "Achievements", href: "#achievements" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

const PROGRAMME_LINKS = [
  "Nursery Onward",
  "Matric & Intermediate",
  "Dars-e-Nizami",
  "Postgraduate Studies",
];

const SOCIALS = [
  { icon: RiFacebookFill, label: "Facebook", href: SOCIAL_LINKS.facebook, bg: "bg-[#1877F2]" },
  { icon: RiInstagramFill, label: "Instagram", href: SOCIAL_LINKS.instagram, bg: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]" },
  // ⚠️ PLACEHOLDER — TikTok link to follow from the client.
  { icon: RiTiktokFill, label: "TikTok", href: SOCIAL_LINKS.tiktok, bg: "bg-black" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Image
              src="/logo.webp"
              alt="Zia-ul-Quran Sulemania Lilbanat logo"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-contain"
            />
            <h3 className="font-heading leading-tight text-ink">
              <span className="block text-2xl font-semibold">
                Zia-ul-Quran
              </span>
              <span className="block text-base font-medium text-ink-soft">
                Sulemania Lilbanat
              </span>
            </h3>
            <p className="text-sm font-medium text-brand-blue">
              Deen · Taleem · Tarbiyat · Khidmat
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              A Sunni-Sufi girls&apos; madarsa in Azam Basti, Karachi,
              established in 1979, dedicated to Islamic education, character
              building and the service of Deen.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-brand-blue">
              Quick Links
            </h4>
            <span className="mt-2 mb-4 block h-0.5 w-8 bg-brand-blue" />
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${link.href}`}
                    className="flex items-center justify-between text-sm text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-brand-blue">
              Our Programmes
            </h4>
            <span className="mt-2 mb-4 block h-0.5 w-8 bg-brand-blue" />
            <ul className="flex flex-col gap-3">
              {PROGRAMME_LINKS.map((label) => (
                <li key={label}>
                  <Link
                    href="/#programmes"
                    className="flex items-center justify-between text-sm text-ink-soft transition-colors hover:text-brand-blue"
                  >
                    {label}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-base font-semibold text-brand-blue">
              Contact Us
            </h4>
            <span className="mt-2 mb-4 block h-0.5 w-8 bg-brand-blue" />
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </span>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="text-sm text-ink-soft hover:text-brand-blue"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-ink-soft hover:text-brand-blue"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-ink-soft">
                  {CONTACT_INFO.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label, href, bg }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-250 hover:scale-[1.05] ${bg}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} Zia-ul-Quran Sulemania Lilbanat. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Karachi, Pakistan</span>
            <span className="text-gold">|</span>
            <span>Est. 1979</span>
            <span className="text-gold">|</span>
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-brand-green">
              <Landmark className="h-4 w-4" aria-hidden="true" />
              Ilm Se Ujala, Ummat Ka Mustaqbil
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-blue">
              Privacy Policy
            </Link>
            <span className="text-gold">|</span>
            <Link href="/terms" className="hover:text-brand-blue">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
