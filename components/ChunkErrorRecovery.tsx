"use client";

import { useEffect } from "react";

/**
 * Recovers from "ChunkLoadError" / "Loading CSS chunk ... failed" errors.
 *
 * These happen when a visitor's browser tab has been open since before a
 * new deployment went out: the tab is still running the *previous*
 * build's JavaScript, which references that build's content-hashed
 * chunk filenames (e.g. `page-<hash>.js`, `<hash>.css`). A fresh deploy
 * replaces `_next/static/` with the new build's files and removes the
 * old ones, so any later lazy chunk fetch from that stale tab — a route
 * prefetch, a dynamic import, a background cache revalidation — 404s.
 * This is a well-known failure class for Next.js apps hosted anywhere
 * that doesn't keep every past deployment's assets around forever.
 *
 * The fix isn't reachable from the app's own render path — it's a
 * stale in-memory module manifest. A one-time hard reload fetches the
 * current build's fresh HTML/JS and resolves it. The sessionStorage
 * guard (auto-cleared once the page has been stable for a few seconds)
 * prevents a reload loop if the site is genuinely down for another
 * reason, while still allowing recovery again after a later deploy.
 */

const RELOAD_GUARD_KEY = "chunk-error-reload-attempted";
const GUARD_RESET_DELAY_MS = 10_000;

function isChunkLoadError(value: unknown): boolean {
  if (!(value instanceof Error)) return false;

  return (
    value.name === "ChunkLoadError" ||
    /Loading (chunk|CSS chunk) [\w.-]+ failed/i.test(value.message)
  );
}

function hasAlreadyAttemptedReload(): boolean {
  try {
    return sessionStorage.getItem(RELOAD_GUARD_KEY) === "1";
  } catch {
    // sessionStorage unavailable (private browsing, etc.) — assume no
    // prior attempt rather than blocking recovery entirely.
    return false;
  }
}

function markReloadAttempted() {
  try {
    sessionStorage.setItem(RELOAD_GUARD_KEY, "1");
  } catch {
    // Ignore — worst case this reloads more than once.
  }
}

export function ChunkErrorRecovery() {
  useEffect(() => {
    const recover = (error: unknown) => {
      if (!isChunkLoadError(error)) return;
      if (hasAlreadyAttemptedReload()) return;

      markReloadAttempted();
      window.location.reload();
    };

    const handleError = (event: ErrorEvent) => recover(event.error);
    const handleRejection = (event: PromiseRejectionEvent) =>
      recover(event.reason);

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    // Once the page has run cleanly for a few seconds, clear the guard
    // so a *later* deploy-triggered staleness (in this same long-lived
    // tab) can still trigger one more automatic recovery.
    const resetGuardTimer = window.setTimeout(() => {
      try {
        sessionStorage.removeItem(RELOAD_GUARD_KEY);
      } catch {
        // Ignore.
      }
    }, GUARD_RESET_DELAY_MS);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      window.clearTimeout(resetGuardTimer);
    };
  }, []);

  return null;
}
