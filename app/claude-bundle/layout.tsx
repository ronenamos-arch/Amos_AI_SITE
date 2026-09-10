/* Standalone sales-funnel layout — no site nav, no footer, no distractions.
   The page uses the existing rv2 design tokens from home.css. */
import "../home.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: "באנדל Claude לרואי חשבון ואנשי כספים — 5 וובינרים, פרומפטים ו-Skills | רונן עמוס, CPA",
    },
    description:
        "5 וובינרים מעשיים מוקלטים על Claude לרואי חשבון, CFOs ומנהלי כספים: 5 שעות עבודה על המסך, 30+ תבניות פרומפטים, קבצי Excel, תבניות PPT, ספריית Skills מוכנה וגישה לצמיתות ב-₪150 בלבד.",
    keywords: [
        "Claude לרואי חשבון",
        "באנדל Claude לכספים",
        "פרומפטים ל-Claude רואי חשבון",
        "Claude Excel",
        "Claude Skills",
        "Claude Projects",
        "Claude Artifacts",
        "וובינר Claude למנהלי כספים",
        "אוטומציה פיננסית ב-AI",
        "רונן עמוס",
    ],
    robots: { index: true, follow: true },
    alternates: {
        canonical: "https://www.ronenamoscpa.co.il/claude-bundle",
    },
    openGraph: {
        title: "באנדל Claude לרואי חשבון ואנשי כספים — 5 וובינרים, פרומפטים ו-Skills",
        description:
            "5 שעות של עבודה מעשית על Claude, עם 30+ פרומפטים, קבצי Excel ו-Skills להורדה. ₪150 בלבד לכל החיים.",
        url: "https://www.ronenamoscpa.co.il/claude-bundle",
        locale: "he_IL",
        type: "website",
        images: [
            {
                url: "/images/bundle/fpa-analytics-hub.jpg",
                width: 1200,
                height: 630,
                alt: "באנדל Claude לרואי חשבון — דשבורד כספי חי",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "באנדל Claude לרואי חשבון ואנשי כספים — 5 וובינרים מלאים",
        description: "5 שעות עבודה מעשית, 30+ פרומפטים, קבצי Excel ו-Skills להורדה. ₪150 בלבד.",
        images: ["/images/bundle/fpa-analytics-hub.jpg"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Product",
            "name": "באנדל Claude לרואי חשבון ומנהלי כספים — 5 הוובינרים המלאים",
            "description": "סדרת 5 וובינרים מוקלטים מעשיים על Claude לרואי חשבון, כולל פרומפטים, חוברות Excel, תבניות מצגות ו-Skills להורדה.",
            "image": "https://www.ronenamoscpa.co.il/images/bundle/fpa-analytics-hub.jpg",
            "brand": {
                "@type": "Person",
                "name": "רונן עמוס, רו\"ח"
            },
            "offers": {
                "@type": "Offer",
                "price": "150.00",
                "priceCurrency": "ILS",
                "availability": "https://schema.org/InStock",
                "url": "https://www.ronenamoscpa.co.il/claude-bundle",
                "seller": {
                    "@type": "Person",
                    "name": "רונן עמוס, רו\"ח"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "28"
            }
        },
        {
            "@type": "Course",
            "name": "באנדל Claude לרואי חשבון ואנשי כספים",
            "description": "5 שעות עבודה מוקלטות על Claude, כולל Projects, Artifacts, Skills וחיבור ל-Excel.",
            "provider": {
                "@type": "Person",
                "name": "רונן עמוס, CPA",
                "sameAs": "https://www.ronenamoscpa.co.il"
            },
            "educationalLevel": "Intermediate",
            "inLanguage": "he"
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "למי החבילה הזו מתאימה?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "לרואי חשבון, מנהלי כספים, CFOs, חשבים, בוקרים וכל מי שעובד עם נתונים פיננסיים ורוצה להשתמש ב-Claude כסביבת עבודה יומיומית."
                    }
                },
                {
                    "@type": "Question",
                    "name": "לכמה זמן הגישה?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "גישה לצמיתות לכל החיים. אחרי הרכישה תקבלו קישור אישי שפועל תמיד — בלי הגבלת זמן ובלי דמי מנוי."
                    }
                },
                {
                    "@type": "Question",
                    "name": "צריך ידע טכני מוקדם?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "לא. הסדרה מתחילה מהבסיס ומתקדמת בהדרגה צעד-אחר-צעד. מספיק לדעת לעבוד עם Excel."
                    }
                },
                {
                    "@type": "Question",
                    "name": "מה הפורמט של החומרים להורדה?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "כל פרק כולל הקלטת וידאו מלאה + דף מלווה עם פרומפטים מוכנים, חוברות Excel, תבניות PowerPoint, וקבצי Skills מוכנים להטמעה."
                    }
                },
                {
                    "@type": "Question",
                    "name": "במה Claude טוב יותר מ-ChatGPT למחלקת הכספים?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Claude מצטיין בניתוח קבצי נתונים גדולים בדיוק ללא 'הזיות', כולל סביבת Projects לזיכרון ארגוני ארוך טווח, ויכולת Live Artifacts לבניית דשבורדים אינטראקטיביים בזמן אמת."
                    }
                },
                {
                    "@type": "Question",
                    "name": "האם החומרים מתאימים גם למשתמשי הגרסה החינמית של Claude?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "כן, הפרומפטים ושיטות העבודה פועלים גם בגרסה החינמית. עם זאת, לשימוש ב-Projects מומלץ מנוי Claude Pro."
                    }
                }
            ]
        }
    ]
};

export default function BundleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="rv2 min-h-[100dvh]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </div>
    );
}
