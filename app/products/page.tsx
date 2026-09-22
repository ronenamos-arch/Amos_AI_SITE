import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products-data";
import { ProductsCatalogClient } from "@/components/products/ProductsCatalogClient";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "מוצרים דיגיטליים, כלי AI ותבניות פיננסיות | רונן עמוס, רו״ח" },
  description:
    "חנות המוצרים הדיגיטליים של רונן עמוס, רו״ח. דשבורדים אינטראקטיביים, מודלי אקסל מתקדמים, פלייבוקים ומאגרי פרומפטים מובנים לסמנכ״לי כספים, חשבים וצוותי Finance.",
  alternates: { canonical: "https://www.ronenamoscpa.co.il/products" },
  keywords: [
    "מוצרים דיגיטליים לכספים",
    "דשבורד ניהול חייבים",
    "AR Command Center",
    "מודל תזרים אקסל",
    "פרומפטים לרואי חשבון",
    "Claude למנהלי כספים",
    "ChatGPT for Finance",
    "אוטומציה פיננסית",
    "סגירת חודש ב-AI",
  ],
  openGraph: {
    title: "מוצרים דיגיטליים, כלי AI ותבניות פיננסיות | רונן עמוס, רו״ח",
    description:
      "דשבורדים אינטראקטיביים, מודלי אקסל מתקדמים, פלייבוקים ומאגרי פרומפטים מובנים לסמנכ״לי כספים וחשבים.",
    url: "https://www.ronenamoscpa.co.il/products",
    type: "website",
  },
};

export default function ProductsPage() {
  const products = getAllProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "ItemList"],
    name: "מוצרים דיגיטליים וכלי AI פיננסיים מאת רונן עמוס, רו״ח",
    description: "חנות מוצרים דיגיטליים, תבניות אקסל, פלייבוקים ודשבורדים לצוותי כספים וחשבונאות.",
    url: "https://www.ronenamoscpa.co.il/products",
    itemListElement: products.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.tagline,
        offers: {
          "@type": "Offer",
          price: p.priceNumeric,
          priceCurrency: "ILS",
          availability: "https://schema.org/InStock",
          url: p.internalUrl
            ? `https://www.ronenamoscpa.co.il${p.internalUrl}`
            : p.gumroadUrl,
        },
      },
    })),
  };

  return (
    <div className="pt-24 pb-20" dir="rtl">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <section className="relative text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold text-indigo-400">
            חנות מוצרים דיגיטליים • AI & FINANCE
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            כלים, מודלים ופרומפטים <br className="hidden sm:inline" />
            <span className="bg-gradient-to-l from-indigo-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              שחוסכים ימי עבודה
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            כל המוצרים והתבניות נבנו מתוך ניסיון שטח מעשי במחלקות כספים וביקורת. 
            הורדה מיידית, קבצים פתוחים לשימוש, ללא מנויים חודשיים.
          </p>
        </section>

        {/* Catalog Section */}
        <ProductsCatalogClient products={products} />

        {/* Bottom Newsletter Box */}
        <section className="pt-12 border-t border-white/[0.08]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 sm:p-12 text-center max-w-3xl mx-auto backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white mb-2">
              רוצים לקבל עדכון כשיוצא כלי או מודל חדש?
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-lg mx-auto">
              הצטרפו לניוזלטר הפיננסי של רונן עמוס — תובנות שבועיות, פרומפטים בלעדיים ועדכוני כלים לפני כולם.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm source="products_catalog_footer" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
