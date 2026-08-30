/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: this project previously used `output: "export"` (a static
  // export to `out/`), on the assumption that Hostinger's "Web App"
  // hosting was plain Apache static hosting. Live response headers
  // (x-nextjs-cache, x-nextjs-prerender, a Hostinger CDN in front of a
  // real Node.js runtime) plus hPanel's own deployment settings — its
  // configured output directory is `.next`, not `out` — confirmed that
  // assumption was wrong: Hostinger runs a genuine Next.js SSR/ISR
  // runtime here. Forcing a static export made every route permanently
  // static with no real revalidation behind it, while Hostinger's CDN
  // still applied long-lived ISR-style cache headers to it and each new
  // deploy deleted the previous build's hashed asset files — the
  // combination is what caused visitors with an old cached page to hit
  // 404s on deleted chunks ("ChunkLoadError") after a redeploy. Running
  // as a normal server-rendered app lets Hostinger's real ISR/deploy
  // caching behave as designed instead.

  // Local public/ images only, no remote domains — left unoptimized to
  // avoid depending on the `sharp` native binary in this same
  // old-glibc build environment that previously broke Next's own native
  // SWC/Turbopack binaries (see the `build` script in package.json).
  images: {
    unoptimized: true,
  },

  // Security headers. These previously lived in public/.htaccess
  // because output: "export" meant there was no server left to attach
  // them at request time — but Apache/.htaccess was never actually in
  // this hosting's request path to begin with (confirmed: the live CSP
  // header was Hostinger's own default, not this file's). This is the
  // mechanism Hostinger's Next.js runtime actually serves.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data: https:; connect-src 'self' https://api.emailjs.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
