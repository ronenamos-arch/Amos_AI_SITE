import type { Metadata } from "next";
import { ARCommandCenterClient } from "@/components/products/ARCommandCenterClient";
import { getProductBySlug } from "@/lib/products-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "חמ״ל ניהול חייבים ותזרים ב-AI | AR Command Center v2.4" },
  description:
    "מערכת ניהול גבייה ותזרים מזומנים מבוססת AI לסמנכ״לי כספים (CFO), חשבים ומנהלי כספים. חיזוי מריחת אשראי, התאמות בנק אוטומטיות, ניהול מחלוקות ומודל אקסל רב-ישותי מאת רונן עמוס, רו״ח.",
  alternates: { canonical: "https://www.ronenamoscpa.co.il/products/ar-command-center" },
  keywords: [
    "AR Command Center",
    "חמ״ל ניהול חייבים",
    "ניהול תזרים מזומנים AI",
    "חיזוי מועדי פירעון",
    "Median Drift",
    "דשבורד גבייה באקסל",
    "רונן עמוס רואה חשבון",
    "אוטומציה בגבייה",
    "ספר ראשי התאמות",
  ],
  openGraph: {
    title: "חמ״ל ניהול חייבים ותזרים ב-AI | AR Command Center v2.4",
    description:
      "דוחות החייבים שלכם תקועים ב-1995? הגיע הזמן לחמ״ל AI. דשבורד מנהלים אינטראקטיבי, מודל אקסל 6 גיליונות ופרומפט מאסטר ב-₪99 בלבד.",
    url: "https://www.ronenamoscpa.co.il/products/ar-command-center",
    type: "website",
    images: [
      {
        url: "https://www.ronenamoscpa.co.il/products/ar-command-center/dashboard-main.png",
        width: 1200,
        height: 630,
        alt: "AR Command Center v2.4 מאת רונן עמוס, רו״ח",
      },
    ],
  },
};

export default function ARCommandCenterPage() {
  const product = getProductBySlug("ar-command-center");

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        image: "https://www.ronenamoscpa.co.il/products/ar-command-center/dashboard-main.png",
        description: product.description,
        brand: {
          "@type": "Person",
          name: "רונן עמוס, רו״ח",
        },
        offers: {
          "@type": "Offer",
          url: "https://www.ronenamoscpa.co.il/products/ar-command-center",
          priceCurrency: "ILS",
          price: product.priceNumeric,
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "בית",
            item: "https://www.ronenamoscpa.co.il",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "מוצרים",
            item: "https://www.ronenamoscpa.co.il/products",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "חמ״ל ניהול חייבים AR Command Center",
            item: "https://www.ronenamoscpa.co.il/products/ar-command-center",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "האם הנתונים הפיננסיים שלי נשארים מאובטחים ופרטיים?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "100% פרטיות. הדשבורד הוא קובץ HTML עצמאי הפועל לחלוטין בדפדפן המקומי שלכם ללא שליחת נתונים לשרת חיצוני כלשהו.",
            },
          },
          {
            "@type": "Question",
            name: "איך המערכת מתחברת לתוכנת הנהלת החשבונות שלי?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "מייצאים דוח גיול חובות או כרטיסי לקוחות (Ledger) כקובץ Excel או CSV מכל מערכת ERP (פריוריטי, חשבשבת, SAP), ומדביקים במודל.",
            },
          },
          {
            "@type": "Question",
            name: "מה זה מדד חיזוי מריחת אשראי (Median Drift)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "אלגוריתם המחשב את מרווח הימים האמיתי בין מועד הפירעון החוזי לתשלום בפועל על פני היסטוריית הלקוח, ומזהה חריגות מראש.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="pt-24 pb-20" dir="rtl">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <div className="mb-8 flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            בית
          </Link>
          <ArrowRight className="h-3 w-3 rtl:rotate-180" />
          <Link href="/products" className="hover:text-white transition-colors">
            מוצרים דיגיטליים
          </Link>
          <ArrowRight className="h-3 w-3 rtl:rotate-180" />
          <span className="text-indigo-400 font-medium truncate">
            AR Command Center v2.4
          </span>
        </div>

        {/* Main Content Component */}
        <ARCommandCenterClient
          smartbeeUrl={product.smartbeeUrl || ""}
          gumroadUrl={product.gumroadUrl}
        />
      </div>
    </div>
  );
}
