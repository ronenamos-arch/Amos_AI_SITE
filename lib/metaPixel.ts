// Meta (Facebook) Pixel helpers.
// The pixel only loads after the visitor accepts cookies (see CookieConsent + MetaPixel).
// Never pass personal data (name, email, phone) in params.

export const META_PIXEL_ID = "1043312542008124";

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

export function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("cookie-consent") === "granted";
  } catch {
    return false;
  }
}

export function trackMeta(event: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (!hasCookieConsent()) return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}

export function trackMetaCustom(event: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (!hasCookieConsent()) return;
  if (params) window.fbq("trackCustom", event, params);
  else window.fbq("trackCustom", event);
}
