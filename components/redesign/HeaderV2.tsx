"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, UserCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { SMARTBEE_CONFIG } from "@/lib/smartbee-config";

const resources = [
    { href: "/products", label: "מוצרים דיגיטליים" },
    { href: "/guides", label: "מדריכים" },
    { href: "/skill-vault", label: "ספריית הפרומפטים והסקילים" },
    { href: "/lessons", label: "וובינרים" },
    { href: "/tools", label: "כלים פיננסיים" },
];

// "מנוי פרימיום" is deliberately absent: the header CTA button already covers
// that intent, and it now goes straight to SmartBee rather than to a pricing page.
const navLinks = [
    { href: "/blog", label: "בלוג" },
    { href: "/courses", label: "קורסים והכשרות" },
    { href: "/contact", label: "צור קשר" },
];

export function HeaderV2() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const [userState, setUserState] = useState<{
        isLoggedIn: boolean;
        isSubscriber: boolean;
        displayName: string | null;
    }>({
        isLoggedIn: false,
        isSubscriber: false,
        displayName: null,
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch("/api/user/access-status");
                if (res.ok) {
                    const data = await res.json();
                    setUserState(data);
                    return;
                }
            } catch (err) {
                console.error("Failed to fetch user access status in header:", err);
            }
            setUserState({ isLoggedIn: false, isSubscriber: false, displayName: null });
        };

        fetchStatus();

        const supabase = createClient();
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            fetchStatus();
        });

        return () => subscription.unsubscribe();
    }, []);

    const desktopActions = userState.isLoggedIn ? (
        userState.isSubscriber ? (
            <Link
                href="/dashboard"
                className="rv2-btn rv2-btn-primary px-5 py-2 text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20"
                title="כניסה לאזור האישי"
            >
                <UserCircle2 size={18} />
                <span>כניסה לאזור האישי</span>
            </Link>
        ) : (
            <div className="flex items-center gap-3">
                <Link href="/dashboard" className="rv2-link flex items-center gap-1.5 text-sm" title="לאזור האישי">
                    <UserCircle2 size={18} className="text-[var(--rv2-accent)]" />
                    <span className="max-w-[8rem] truncate">{userState.displayName}</span>
                </Link>
                <a
                    href={SMARTBEE_CONFIG.products.monthlySubscription.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv2-btn rv2-btn-primary px-5 py-2 text-sm"
                >
                    רכוש מנוי
                </a>
            </div>
        )
    ) : (
        <div className="flex items-center gap-3">
            <Link href="/login" className="rv2-link text-sm">
                התחברות
            </Link>
            <a
                href={SMARTBEE_CONFIG.products.monthlySubscription.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rv2-btn rv2-btn-primary px-5 py-2 text-sm"
            >
                רכוש מנוי
            </a>
        </div>
    );

    const mobileActions = userState.isLoggedIn ? (
        userState.isSubscriber ? (
            <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rv2-btn rv2-btn-primary w-full text-center py-2.5 text-sm flex items-center justify-center gap-2"
            >
                <UserCircle2 size={18} />
                <span>כניסה לאזור האישי ({userState.displayName})</span>
            </Link>
        ) : (
            <div className="flex flex-col gap-3 w-full">
                <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="rv2-link flex items-center justify-center gap-1.5 text-sm py-1"
                >
                    <UserCircle2 size={18} className="text-[var(--rv2-accent)]" />
                    <span>האזור האישי ({userState.displayName})</span>
                </Link>
                <a
                    href={SMARTBEE_CONFIG.products.monthlySubscription.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rv2-btn rv2-btn-primary w-full text-center py-2 text-sm"
                >
                    רכוש מנוי Pro
                </a>
            </div>
        )
    ) : (
        <div className="flex items-center gap-4 w-full justify-between">
            <a
                href={SMARTBEE_CONFIG.products.monthlySubscription.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rv2-btn rv2-btn-primary text-sm flex-1 text-center"
            >
                רכוש מנוי
            </a>
            <Link href="/login" onClick={() => setMobileOpen(false)} className="rv2-link text-sm px-2">
                התחברות
            </Link>
        </div>
    );

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--rv2-border)] bg-[rgba(7,11,20,0.9)] backdrop-blur-md text-white">
            <div className="rv2-container flex h-16 items-center justify-between">
                <Link
                    href="/"
                    className="flex shrink-0 items-center"
                    aria-label="AI Finance Transformation — רונן עמוס"
                >
                    <Image
                        src="/logo-ai-finance.jpg"
                        alt="AI Finance Transformation"
                        width={512}
                        height={106}
                        priority
                        className="rv2-logo h-7 w-auto sm:h-8"
                    />
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    <div
                        className="relative"
                        onMouseEnter={() => setResourcesOpen(true)}
                        onMouseLeave={() => setResourcesOpen(false)}
                    >
                        <button
                            className="rv2-link flex items-center gap-1 rounded-lg px-4 py-2 text-sm text-white"
                            onClick={() => setResourcesOpen((v) => !v)}
                            aria-expanded={resourcesOpen}
                        >
                            משאבים
                            <ChevronDown size={14} />
                        </button>
                        {resourcesOpen && (
                            <div className="absolute top-full right-0 w-60 rounded-xl border border-white/20 bg-[#080D1A] p-2 shadow-2xl z-50">
                                {resources.map((r) => (
                                     <Link
                                         key={r.href}
                                         href={r.href}
                                         className="block rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-100 hover:bg-slate-800/90 hover:text-cyan-300 transition-colors"
                                     >
                                         {r.label}
                                     </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    {navLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="rv2-link rounded-lg px-4 py-2 text-sm text-white">
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    {desktopActions}
                </div>

                <button
                    className="text-[var(--rv2-text)] lg:hidden"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="תפריט"
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {mobileOpen && (
                <div className="rv2-container border-t border-[var(--rv2-border)] pb-6 pt-3 lg:hidden">
                    <div className="rv2-kicker mb-1 px-2 pt-2">משאבים</div>
                    {resources.map((r) => (
                        <Link key={r.href} href={r.href} className="rv2-link block rounded-lg px-2 py-2">
                            {r.label}
                        </Link>
                    ))}
                    <div className="rv2-divider my-3" />
                    {navLinks.map((l) => (
                        <Link key={l.href} href={l.href} className="rv2-link block rounded-lg px-2 py-2">
                            {l.label}
                        </Link>
                    ))}
                    <div className="mt-4 flex items-center">
                        {mobileActions}
                    </div>
                </div>
            )}
        </header>
    );
}
