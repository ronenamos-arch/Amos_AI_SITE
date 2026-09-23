import type { Metadata } from "next";
import { Heebo, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./home.css";
import { HeaderV2 } from "@/components/redesign/HeaderV2";
import { FooterV2 } from "@/components/redesign/FooterV2";
import { Chrome } from "@/components/layout/Chrome";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import StructuredData from "@/components/seo/StructuredData";
import { LazyAIChat, LazyStickyNewsletterBar } from "@/components/ui/LazyClientComponents";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "רונן עמוס | רו\"ח ויועץ AI פיננסי – המרכז ל-AI בכספים",
    template: "%s | רונן עמוס",
  },
  description:
    "רו\"ח ומומחה AI פיננסי. ייעוץ אסטרטגי, בניית דשבורדים חכמים ל-CFO, אוטומציה של תהליכי כספים והרצאות AI לארגונים.",
  keywords: [
    "רואה חשבון",
    "יועץ AI פיננסי",
    "דשבורד CFO",
    "AI לרואי חשבון",
    "בינה מלאכותית בכספים",
    "אוטומציה פיננסית",
    "ייעוץ פיננסי טכנולוגי",
    "הרצאות AI לארגונים",
    "סדנאות AI פיננסים",
    "קיצור סגירת חודש",
    "Power BI לעסקים",
    "הטמעת ERP",
    "ASC 606",
    "IFRS 15",
    "דוחות כספיים AI",
    "ChatGPT לעסקים",
  ],
  metadataBase: new URL("https://www.ronenamoscpa.co.il"),
  verification: {
    google: [
      "h6QCaukFQ3DE1M7n84R35IvuQp4RyhhCjYhjq5b_Lu4",
      "Qb4gOaZzEmtn_QSohy-v6cglMkkYnTEnkykVaRF6J9M",
    ],
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://www.ronenamoscpa.co.il",
    siteName: "רונן עמוס | AI Finance Transformation",
    title: "רונן עמוס | רו\"ח ויועץ AI פיננסי",
    description: "ייעוץ פיננסי מבוסס AI, דשבורדים ניהוליים ל-CFO, אוטומציה של סגירת חודש והרצאות AI לארגונים.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "רונן עמוס | רו\"ח ויועץ AI פיננסי",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "רונן עמוס | רו\"ח ויועץ AI פיננסי",
    description: "ייעוץ פיננסי מבוסס AI, דשבורדים ניהוליים ל-CFO, אוטומציה של סגירת חודש והרצאות AI לארגונים.",
    images: ["/og-image.png"],
  },
};


export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${outfit.variable}`}>
      <head>
        {/* Consent Mode v2 — must run before GA4 loads (default denied) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EWLVGXCWLK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EWLVGXCWLK');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <StructuredData />
        <Chrome>
          {/* The V2 chrome needs the .rv2 scope for its design tokens (home.css). */}
          <div className="rv2">
            <HeaderV2 />
          </div>
        </Chrome>
        <main>{children}</main>
        <Chrome>
          <LazyAIChat />
          <WhatsAppFloat />
          <LazyStickyNewsletterBar />
          <div className="rv2">
            <FooterV2 />
          </div>
        </Chrome>
        <CookieConsent />
        <MetaPixel />
      </body>
    </html>
  );
}
