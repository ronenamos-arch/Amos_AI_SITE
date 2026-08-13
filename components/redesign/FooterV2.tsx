import Link from "next/link";

const columns = [
    {
        title: "משאבים",
        links: [
            { href: "/guides", label: "מדריכים" },
            { href: "/skill-vault", label: "ספריית פרומפטים" },
            { href: "/lessons", label: "וובינרים" },
            { href: "/tools", label: "כלים פיננסיים" },
            { href: "/blog", label: "בלוג" },
        ],
    },
    {
        title: "למידה",
        links: [
            { href: "/courses", label: "קורסים" },
            { href: "/training", label: "הכשרות לארגונים" },
            { href: "/", label: "מנוי פרימיום" },
        ],
    },
    {
        title: "אודות",
        links: [
            { href: "/about", label: "מי אני" },
            { href: "/services", label: "שירותי ייעוץ" },
            { href: "/contact", label: "צור קשר" },
            { href: "/legal", label: "פרטיות ותנאי שימוש" },
        ],
    },
];

export function FooterV2() {
    return (
        <footer className="rv2-divider mt-24">
            <div className="rv2-container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                <div>
                    <div className="rv2-display text-lg">רונן עמוס</div>
                    <p className="mt-3 max-w-xs text-sm text-[var(--rv2-text-2)]">
                        רואה חשבון ויועץ AI פיננסי. מרכז ידע ישראלי לאנשי כספים —
                        מדריכים, פרומפטים, קורסים וכלים שעובדים בשטח.
                    </p>
                    <p className="mt-4 text-sm text-[var(--rv2-text-2)]">
                        ronenamos@gmail.com · 050-5500344
                    </p>
                </div>
                {columns.map((col) => (
                    <div key={col.title}>
                        <div className="rv2-kicker mb-3">{col.title}</div>
                        <ul className="space-y-2">
                            {col.links.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="rv2-link text-sm">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="rv2-divider">
                <div className="rv2-container flex flex-wrap items-center justify-between gap-2 py-5 text-xs text-[var(--rv2-text-2)]">
                    <span>© 2026 רונן עמוס — AI Finance. כל הזכויות שמורות.</span>
                    <span className="rv2-mono">ronenamoscpa.co.il</span>
                </div>
            </div>
        </footer>
    );
}
