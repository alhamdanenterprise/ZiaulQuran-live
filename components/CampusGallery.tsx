import fs from "node:fs";
import path from "node:path";
import { CampusGalleryClient } from "@/components/CampusGalleryClient";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/**
 * Reads whatever image files currently sit in `public/images/` — no
 * hardcoded filenames, so this keeps working as photos are added,
 * removed, or renamed/optimized later. This runs at build time (this
 * page is statically prerendered), so a rebuild is needed to pick up
 * changes to that folder, same as any other static asset here.
 */
function getGalleryImages(): string[] {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort()
      .map((file) => `/images/${encodeURIComponent(file)}`);
  } catch {
    // Folder missing entirely — render nothing rather than break the page.
    return [];
  }
}

/**
 * Server Component wrapper: filesystem access (`fs`) only runs on the
 * server/at build time, so the list-building lives here, while the
 * animated marquee UI (refs, GSAP) lives in the client component it
 * renders.
 */
export function CampusGallery() {
  const images = getGalleryImages();
  if (images.length === 0) return null;

  return <CampusGalleryClient images={images} />;
}
