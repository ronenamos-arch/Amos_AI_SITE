"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, UserCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const resources = [
    { href: "/academy", label: "🎓 האקדמיה (מרכז בלעדי)" },
    { href: "/guides", label: "מדריכים" },
    { href: "/skill-vault", label: "ספריית הפרומפטים והסקילים" },
    { href: "/lessons", label: "וובינרים" },
    { href: "/tools", label: "כלים פיננסיים" },
];

const navLinks = [
    { href: "/academy", label: "האקדמיה ✨" },
    { href: "/blog", label: "בלוג" },
    { href: "/courses", label: "קורסים והכשרות" },
    { href: "/contact", label: "צור קשר" },
];

export function HeaderV2() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();
        const nameFrom = (user: { user_metadata?: { full_name?: string; name?: string }; email?: string } | null) =>
            user ? user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split("@")[0] ?? null : null;

        supabase.auth.getUser().then(({ data: { user } }) => setDisplayName(nameFrom(user)));
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) =>
            setDisplayName(nameFrom(session?.user ?? null))
        );
        return () => subscription.unsubscribe();
    }, []);

    const accountLink = displayName ? (
        <Link href="/academy" className="rv2-link flex items-center gap-1.5 text-sm font-bold text-neon-teal" title="לאקדמיה שלי">
            <UserCircle2 size={18} className="text-[var(--rv2-accent)]" />
            <span className="max-w-[9rem] truncate">{displayName}</span>
        </Link>
    ) : (
        <Link href="/login" className="rv2-link text-sm">
            התחברות
        </Link>
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
                            <div className="absolute top-full right-0 w-56 rounded-xl border border-[var(--rv2-border-strong)] bg-[var(--rv2-surface)] p-2 shadow-xl">
                                {resources.map((r) => (
                                    <Link
                                        key={r.href}
                                        href={r.href}
                                        className="rv2-link block rounded-lg px-3 py-2 text-sm hover:bg-[var(--rv2-surface-2)]"
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
                    {accountLink}
                    <a href={"/api/subscribe"} className="rv2-btn rv2-btn-primary px-5 py-2 text-sm">
                        רכוש מנוי
                    </a>
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
                    <div className="mt-4 flex items-center gap-4">
                        <a href={"/api/subscribe"} className="rv2-btn rv2-btn-primary text-sm">
                            רכוש מנוי
                        </a>
                        {accountLink}
                    </div>
                </div>
            )}
        </header>
    );
}
