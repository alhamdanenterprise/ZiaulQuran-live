"use client";

import { useEffect, useRef } from "react";

/**
 * Loads a stylesheet without blocking the initial render.
 *
 * A `<link rel="stylesheet" media="print">` doesn't match a screen
 * rendering context, so the browser fetches it at low priority instead
 * of holding up first paint on it — the standard "preload and swap"
 * pattern for deferring non-critical CSS. This component flips it to
 * `media="all"` once it has actually finished loading (PageSpeed
 * flagged the Google Fonts stylesheet specifically as render-blocking).
 */
export function DeferredStylesheet({ href }: { href: string }) {
  const linkRef = useRef<HTMLLinkElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    if (link.sheet) {
      // Already finished loading (e.g. served from cache) before this
      // effect ran — the "load" event won't fire again.
      link.media = "all";
      return;
    }

    const handleLoad = () => {
      link.media = "all";
    };

    link.addEventListener("load", handleLoad);
    return () => link.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      <link ref={linkRef} rel="stylesheet" href={href} media="print" />
      <noscript>
        <link rel="stylesheet" href={href} />
      </noscript>
    </>
  );
}
