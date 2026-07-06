"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the global site chrome (header, footer, floating widgets) on
 * redesign preview routes, which render their own scoped chrome.
 */
export function Chrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    if (pathname?.startsWith("/preview-home")) return null;
    return <>{children}</>;
}
