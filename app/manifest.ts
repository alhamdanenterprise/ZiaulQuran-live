import type { MetadataRoute } from "next";

// This route has no request-time data, so it's safe (and faster) to
// prerender it once at build time instead of computing it per request.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zia-ul-Quran Sulemania Lilbanat",
    short_name: "Zia-ul-Quran",
    description:
      "An independent Islamic educational institution in Azam Basti, Karachi, established 1979.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fb",
    theme_color: "#0e86d4",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
