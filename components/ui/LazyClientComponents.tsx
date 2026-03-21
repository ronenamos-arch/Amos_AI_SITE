"use client";

import dynamic from "next/dynamic";

// These components are deferred out of the initial JS bundle.
// ssr: false is only allowed inside Client Components in the App Router.
const AIChat = dynamic(
  () => import("@/components/ui/AIChat").then((m) => ({ default: m.AIChat })),
  { ssr: false }
);

const StickyNewsletterBar = dynamic(
  () =>
    import("@/components/ui/StickyNewsletterBar").then((m) => ({
      default: m.StickyNewsletterBar,
    })),
  { ssr: false }
);

export function LazyAIChat() {
  return <AIChat />;
}

export function LazyStickyNewsletterBar() {
  return <StickyNewsletterBar />;
}
