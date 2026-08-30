# Zia-ul-Quran Sulemania Lilbanat

Single-page marketing site for Zia-ul-Quran Sulemania Lilbanat, a Sunni-Sufi
girls' madarsa in Azam Basti, Karachi, established 1979. Built with Next.js
(App Router), Tailwind CSS v4, and GSAP ScrollTrigger.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Before launch — things the client must supply

A few pieces of content are intentionally placeholders and **must** be
replaced before the site goes live:

1. **Contact form — done.** The Contact section sends via
   [EmailJS](https://www.emailjs.com) (`@emailjs/browser`), not Formspree —
   a notification lands in the madarsa's inbox and an auto-reply goes to
   whoever submitted the form. Copy `.env.local.example` to `.env.local`
   and fill in `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
   `NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID`,
   `NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID`, and
   `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` from your EmailJS dashboard. Add the
   same four in your Vercel project's environment variables for production.

2. **Contact details — done.** Address, phone, email, and WhatsApp number
   in `CONTACT_INFO` (`lib/siteConfig.ts`) are all real, client-provided
   details.

3. **Donation account details — done.** Bank Transfer and JazzCash both
   use the madarsa's real account details (`components/Donate.tsx`,
   `PAYMENT_METHODS`), client-provided — the JazzCash QR code
   (`public/barcode.PNG`) is real too. There's no Easypaisa row currently
   (no account was provided) — add one back in if that changes.

4. **Social links — mostly done.** The madarsa's real socials are Facebook,
   Instagram, and TikTok (`SOCIAL_LINKS` in `lib/siteConfig.ts`, rendered as
   icons in the Footer). Facebook and Instagram are live; **TikTok is still
   a ⚠️ placeholder** (`href: "#"`) pending the client's link.

5. **Founder / CEO photos & names — done.** Both cards use the client's
   real photos (`public/founder.webp`, `public/ceo.webp`) and real names
   (Peer Syed Abul Hasan Shah Manzoor Hamdani; Syed Ameena Hamdani).

## Tech stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4 (`app/globals.css` holds the full design token theme)
- GSAP + ScrollTrigger for scroll-reveal animation (`lib/scrollAnimations.ts`)
- [lucide-react](https://lucide.dev) for general UI icons
- [@remixicon/react](https://remixicon.com) for the social brand icons
- EmailJS for the contact form (no custom backend)

## Deploying

This site runs as a normal server-rendered Next.js app (no
`output: "export"`) — every route here happens to be static content, but
it's served by a real Next.js runtime rather than a static export.

### Hostinger (primary target — ziaulquransulemania.com)

Hostinger's "Web App" hosting for Next.js is a genuine Node.js SSR/ISR
runtime behind their own CDN, connected directly to the
`alhamdanenterprise/ZiaulQuran-live` GitHub repo (hPanel → Websites →
ziaulquransulemania.com → **Deployments**). Every push to `main` triggers
an automatic build (`npm install` → `npm run build`, output directory
`.next`) and deploy — there is no manual FTP step and no GitHub Action
involved.

One-time setup already done, for reference:

1. Domain pointed at Hostinger and the free SSL certificate issued in
   hPanel → **SSL**.
2. `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID`,
   `NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   set as environment variables in hPanel → **Environment variables**
   (same values as your local `.env.local`) — `NEXT_PUBLIC_*` values are
   baked in at build time, so they must be set there, not just locally.
3. GitHub repo connected under hPanel → **Deployments** → *Connected with
   GitHub*.

Security headers (CSP, etc.) are set via `next.config.mjs`'s `headers()`
— this is a real Next.js server, so that mechanism actually applies at
request time. (An earlier version of this project used a static export
with a `public/.htaccess` file for headers instead; that file is gone
now — it turned out Apache was never in this hosting's request path to
begin with, so those headers were silently not being applied.)

### Alternative: Vercel

Also deploys cleanly to [Vercel](https://vercel.com/new) as-is — set the
four `NEXT_PUBLIC_EMAILJS_*` variables in the project's environment
variables and it just works, no config changes needed.
