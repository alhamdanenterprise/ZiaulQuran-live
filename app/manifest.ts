import type { MetadataRoute } from "next";

// Required for `output: "export"` — this route has no request-time data,
// so it's safe to mark fully static.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zia-ul-Quran Sulemania Lilbanat",
    short_name: "Zia-ul-Quran",
    description:
      "A Sunni-Sufi girls' madarsa in Azam Basti, Karachi, established 1979.",
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
