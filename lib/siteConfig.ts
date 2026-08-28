/**
 * Real contact details, provided directly by the client. Centralised here
 * and consumed by both the Contact section and the Footer so the two can
 * never contradict each other.
 */
export const CONTACT_INFO = {
  addressLines: ["Zia ul Quran Sulemania", "St No. 20, Azam Basti, Karachi"],
  phoneDisplay: "+92 303 2002263",
  phoneHref: "tel:+923032002263",
  email: "contact@ziaulquransulemania.com",
  /** Digits only, international format, for the WhatsApp deep link. */
  whatsappDigits: "923032002263",
} as const;

/**
 * The madarsa's real social accounts are Facebook, Instagram, and TikTok
 * (WhatsApp is a direct-contact channel, not one of the "socials," and is
 * used only for the Contact section's "Message on WhatsApp" button below).
 */
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/share/18sZwjAKpQ/",
  instagram: "https://www.instagram.com/ziaulquransulemania",
  /** ⚠️ PLACEHOLDER — TikTok link to follow from the client. */
  tiktok: "#",
  whatsapp: `https://wa.me/${CONTACT_INFO.whatsappDigits}`,
} as const;
