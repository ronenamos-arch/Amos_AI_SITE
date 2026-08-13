"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the global site chrome (header, footer, floating widgets) on
 * redesign preview routes, which render their own scoped chrome.
 */
/** Routes that ship their own HeaderV2/FooterV2 and must not get the global pair. */
const V2_CHROME_ROUTES = ["/lessons"];

export function Chrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    if (pathname === "/" || V2_CHROME_ROUTES.some((route) => pathname?.startsWith(route))) return null;
    return <>{children}</>;
}
