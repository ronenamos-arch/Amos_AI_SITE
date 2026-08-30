/* Standalone sales-funnel layout — no site nav, no footer, no distractions.
   The page uses the existing rv2 design tokens from home.css. */
import "../home.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "Claude לכספים — 5 הוובינרים המלאים | רונן עמוס רו״ח",
    },
    description:
        "חמישה וובינרים מוקלטים על Claude לרואי חשבון ואנשי כספים — 5 שעות של עבודה חיה על המסך, עם פרומפטים, חוברות Excel, Skills ומצגות להורדה.",
    keywords: [
        "Claude לרואי חשבון",
        "וובינר Claude",
        "AI לכספים",
        "Claude Excel",
        "Claude Skills",
        "Claude Projects",
        "Claude Artifacts",
        "רונן עמוס",
        "וובינר AI כספים",
    ],
    robots: { index: true, follow: true },
    openGraph: {
        title: "Claude לכספים — 5 הוובינרים המלאים",
        description:
            "5 שעות של עבודה חיה על Claude, עם כל החומרים להורדה. ₪150 בלבד.",
        locale: "he_IL",
        type: "website",
    },
};

export default function BundleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="rv2 min-h-[100dvh]">
            {children}
        </div>
    );
}
