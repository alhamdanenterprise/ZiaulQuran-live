import type { MetadataRoute } from "next";

// This route has no request-time data, so it's safe (and faster) to
// prerender it once at build time instead of computing it per request.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ziaulquransulemania.com/sitemap.xml",
  };
}
