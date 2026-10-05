"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { META_PIXEL_ID, trackMetaCustom } from "@/lib/metaPixel";

// Loads the Meta Pixel only after cookie consent was granted,
// sends PageView on route change, and tracks EngagedVisit (30s on page OR scrolled to 50%).
export function MetaPixel() {
  const [allowed, setAllowed] = useState(false);
  const pathname = usePathname();
  const engagedFiredRef = useRef(false);

  useEffect(() => {
    const check = () => {
      try {
        setAllowed(localStorage.getItem("cookie-consent") === "granted");
      } catch {
        setAllowed(false);
      }
    };
    check();
    window.addEventListener("cookie-consent-change", check);
    return () => window.removeEventListener("cookie-consent-change", check);
  }, []);

  // Track PageView on route changes
  useEffect(() => {
    if (allowed && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, allowed]);

  // Track EngagedVisit (custom event): fired once per page view after 30s OR scrolling 50% of the page
  useEffect(() => {
    if (!allowed) return;

    engagedFiredRef.current = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      window.removeEventListener("scroll", handleScroll);
    };

    const triggerEngaged = () => {
      if (engagedFiredRef.current) return;
      engagedFiredRef.current = true;
      trackMetaCustom("EngagedVisit");
      cleanup();
    };

    const handleScroll = () => {
      if (engagedFiredRef.current) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolledHalfway = scrollHeight > 0 && scrollTop / scrollHeight >= 0.5;
      const reachedMidPage = scrollTop + window.innerHeight >= document.documentElement.scrollHeight * 0.5;

      if (scrolledHalfway || reachedMidPage) {
        triggerEngaged();
      }
    };

    // Timer: 30 seconds
    timer = setTimeout(() => {
      triggerEngaged();
    }, 30000);

    // Scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run an initial check in case page is loaded with scroll restore or already halfway
    handleScroll();

    return cleanup;
  }, [pathname, allowed]);

  if (!allowed) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
