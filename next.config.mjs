/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger's standard web hosting serves static files only (no Node.js
  // server process for a custom app) — this outputs a fully static site to
  // `out/` on `next build`, deployable to any static host. Every route on
  // this site is already static-only (no server actions, no dynamic
  // rendering, no route handlers that need a request), so this is a
  // free change with no functional loss.
  output: "export",

  // The default next/image loader optimizes images on-demand via a
  // Node.js server, which doesn't exist on static hosting. This serves
  // images as-is instead — still fine for this site's image sizes.
  images: {
    unoptimized: true,
  },

  // NOTE: Next.js `headers()` (previously used here for CSP/security
  // headers) has no effect under `output: "export"` — there's no server
  // left to attach them at request time. The equivalent headers are now
  // set via Apache directives in `public/.htaccess`, which ships as-is
  // into the exported site and is read by Hostinger's Apache server.
};

export default nextConfig;
