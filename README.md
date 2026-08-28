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

This site builds as a fully static export (`output: "export"` in
`next.config.ts` — every route here is static, so nothing is lost). That
makes it deployable to any static host.

### Hostinger (primary target — ziaulquransulemania.com)

`.github/workflows/deploy.yml` builds the site and FTP-deploys the `out/`
folder to Hostinger on every push to `main`. One-time setup:

1. In Hostinger's hPanel, open **Files → FTP Accounts** and note the FTP
   hostname, username, and password (or create a dedicated FTP account).
2. In the GitHub repo, go to **Settings → Secrets and variables →
   Actions** and add these repository secrets:
   - `HOSTINGER_FTP_SERVER`, `HOSTINGER_FTP_USERNAME`, `HOSTINGER_FTP_PASSWORD`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_NOTIFY_TEMPLATE_ID`,
     `NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID`, `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
     (same values as your local `.env.local`)
3. Point the domain at Hostinger (already the case if it was bought
   through Hostinger) and issue the free SSL certificate for it in
   hPanel → **SSL**.
4. Push to `main` — the Action builds and uploads `out/` to
   `public_html/`, and the site goes live at the domain.

Security headers (CSP, etc.) live in `public/.htaccess` instead of
`next.config.ts`'s `headers()`, since there's no Next.js server left to
apply them at request time under a static export — Apache (which
Hostinger runs) reads `.htaccess` directly.

### Alternative: Vercel

Also deploys cleanly to [Vercel](https://vercel.com/new) if needed —
remove `output: "export"`/`images.unoptimized` from `next.config.ts` first
to get Vercel's on-demand image optimization back, and set the four
`NEXT_PUBLIC_EMAILJS_*` variables in the project's environment variables.
