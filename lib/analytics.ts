// Google Analytics 4 (GA4) client-side tracking helper for ronenamoscpa.co.il
// Respects Google Consent Mode v2 & CookieConsent.
// Never send personal data (PII like names, emails, phone numbers) in params.

export const GA_MEASUREMENT_ID = "G-EWLVGXCWLK";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
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

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | unknown[]>
) {
  if (typeof window === "undefined") return;

  // Make sure gtag exists or push to dataLayer
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params || {});
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(["event", eventName, params || {}]);
  }
}

// ---------------------------------------------------------------------------
// High-Level Conversion & E-Commerce Events (SmartBee + PayPal)
// ---------------------------------------------------------------------------

export interface AnalyticsItem {
  item_id?: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_category?: string;
}

export interface BeginCheckoutParams {
  value: number;
  currency?: string;
  provider: "smartbee" | "paypal" | "direct";
  items: AnalyticsItem[];
}

export function trackBeginCheckout({
  value,
  currency = "ILS",
  provider,
  items,
}: BeginCheckoutParams) {
  trackEvent("begin_checkout", {
    currency,
    value,
    payment_provider: provider,
    items,
  });
}

export interface PurchaseParams {
  transactionId: string;
  value: number;
  currency?: string;
  provider: "smartbee" | "paypal" | "direct";
  items: AnalyticsItem[];
}

export function trackPurchase({
  transactionId,
  value,
  currency = "ILS",
  provider,
  items,
}: PurchaseParams) {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value,
    currency,
    payment_provider: provider,
    items,
  });
}

// ---------------------------------------------------------------------------
// Lead & Contact Events
// ---------------------------------------------------------------------------

export interface LeadParams {
  formName: string;
  leadType?: "cfo_consultation" | "contact_general" | "enterprise";
}

export function trackLead({ formName, leadType = "cfo_consultation" }: LeadParams) {
  trackEvent("generate_lead", {
    form_name: formName,
    lead_type: leadType,
  });
}

export interface WhatsAppClickParams {
  pageLocation?: string;
  channel?: "float" | "contact_page" | "header" | "footer";
}

export function trackWhatsAppClick(params?: WhatsAppClickParams) {
  trackEvent("whatsapp_click", {
    channel: params?.channel || "float",
    page_location: params?.pageLocation || (typeof window !== "undefined" ? window.location.pathname : ""),
  });
}

export interface NewsletterSignupParams {
  placement: "popup" | "sticky_bar" | "footer" | "home" | "article_inline" | "blog_sidebar";
}

export function trackNewsletterSignup({ placement }: NewsletterSignupParams) {
  trackEvent("newsletter_signup", {
    placement,
  });
}

// ---------------------------------------------------------------------------
// Content & Skill Vault & Paywall Events
// ---------------------------------------------------------------------------

export interface PaywallViewParams {
  postSlug?: string;
  title?: string;
}

export function trackPaywallView(params?: PaywallViewParams) {
  trackEvent("paywall_view", {
    post_slug: params?.postSlug || (typeof window !== "undefined" ? window.location.pathname : ""),
    post_title: params?.title || "",
  });
}

export interface PaywallCtaClickParams {
  postSlug?: string;
  plan?: string;
}

export function trackPaywallCtaClick(params?: PaywallCtaClickParams) {
  trackEvent("paywall_cta_click", {
    post_slug: params?.postSlug || (typeof window !== "undefined" ? window.location.pathname : ""),
    plan: params?.plan || "monthly_subscription",
  });
}

export interface PromptCopyParams {
  promptId: string;
  promptTitle: string;
  category?: string;
  level?: string;
  isPro?: boolean;
}

export function trackPromptCopy(params: PromptCopyParams) {
  trackEvent("prompt_copy", {
    prompt_id: params.promptId,
    prompt_title: params.promptTitle,
    category: params.category || "",
    level: params.level || "",
    is_pro: Boolean(params.isPro),
  });
}
