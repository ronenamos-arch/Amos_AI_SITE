"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const resources = [
    { href: "/guides", label: "מדריכים" },
    { href: "/skill-vault", label: "Skill Vault — פרומפטים" },
    { href: "/webinar-excel-ai", label: "וובינרים" },
    { href: "/tools", label: "כלים פיננסיים" },
];

const navLinks = [
    { href: "/blog", label: "בלוג" },
    { href: "/courses", label: "קורסים והכשרות" },
    { href: "/pricing", label: "מנוי פרימיום" },
    { href: "/contact", label: "צור קשר" },
];

export function HeaderV2() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--rv2-border)] bg-[rgba(16,18,20,0.92)] backdrop-blur-md">
            <div className="rv2-container flex h-16 items-center justify-between">
                <Link href="/preview-home" className="flex items-baseline gap-2">
                    <span className="rv2-display text-lg text-[var(--rv2-text)]">רונן עמוס</span>
                    <span className="hidden text-xs text-[var(--rv2-text-2)] sm:inline">
                        המרכז ל-AI בכספים
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    <div
                        className="relative"
                        onMouseEnter={() => setResourcesOpen(true)}
                        onMouseLeave={() => setResourcesOpen(false)}
                    >
                        <button
                            className="rv2-link flex items-center gap-1 rounded-lg px-4 py-2 text-sm"
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
                        <Link key={l.href} href={l.href} className="rv2-link rounded-lg px-4 py-2 text-sm">
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link href="/login" className="rv2-link text-sm">
                        התחברות
                    </Link>
                    <Link href="/pricing" className="rv2-btn rv2-btn-primary px-5 py-2 text-sm">
                        הצטרפו לקהילה
                    </Link>
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
                        <Link href="/pricing" className="rv2-btn rv2-btn-primary text-sm">
                            הצטרפו לקהילה
                        </Link>
                        <Link href="/login" className="rv2-link text-sm">
                            התחברות
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
