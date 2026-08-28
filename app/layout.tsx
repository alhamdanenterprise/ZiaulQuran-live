import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zia-ul-Quran Sulemania Lilbanat",
  description:
    "A Sunni-Sufi girls' madarsa in Azam Basti, Karachi, established 1979 — dedicated to nurturing faith, imparting authentic Islamic knowledge, and building character through education rooted in the Quran and Sunnah.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via <link> tags in the App Router root layout
            (this project's single entry point for every route) rather than
            next/font/google, since next/font can fail to fetch in
            network-restricted build environments. The no-page-custom-font
            lint rule targets the Pages Router's pages/_document.js and
            doesn't recognize this App Router equivalent, hence the disable. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* suppressHydrationWarning: some browser extensions (e.g. ColorZilla's
          cz-shortcut-listen) inject attributes onto <body> before React
          hydrates. That's an unavoidable, harmless DOM mismatch coming from
          the user's browser, not from this app — this tells React to accept
          the DOM as-is instead of logging a false-positive hydration error. */}
      <body
        className="min-h-full flex flex-col bg-bg text-ink antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
