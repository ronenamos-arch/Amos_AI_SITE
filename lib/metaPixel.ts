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

export function trackMeta(event: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}
