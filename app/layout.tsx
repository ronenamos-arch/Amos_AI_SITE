import type { Metadata } from "next";
import { Heebo, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { AIChat } from "@/components/ui/AIChat";
import { StickyNewsletterBar } from "@/components/ui/StickyNewsletterBar";
import StructuredData from "@/components/seo/StructuredData";

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
    default: "רונן עמוס | רו\"ח ויועץ טכנולוגי פיננסי",
    template: "%s | רונן עמוס",
  },
  description:
    "רו\"ח מוסמך המתמחה בשילוב טכנולוגיה וכספים. ייעוץ פיננסי, הכשרות Power BI ו-AI, אוטומציות וחדשנות פיננסית.",
  keywords: [
    "רואה חשבון",
    "רואה חשבון דיגיטלי",
    "AI",
    "בינה מלאכותית פיננסים",
    "AI לרואי חשבון",
    "Power BI",
    "Power BI לעסקים",
    "אוטומציה פיננסית",
    "אוטומציה חשבונאית",
    "אוטומציה Excel",
    "ASC 606",
    "IFRS 15",
    "ייעוץ פיננסי",
    "ייעוץ AI לעסקים",
    "הכשרות כספים",
    "ניתוח נתונים פיננסי",
    "דשבורד CFO",
    "דוחות כספיים AI",
    "ChatGPT לעסקים",
    "סגירת חודש מהירה",
    "ERP הטמעה",
    "רו\"ח סטארטאפ",
  ],
  metadataBase: new URL("https://www.ronenamoscpa.co.il"),
  verification: {
    google: "h6QCaukFQ3DE1M7n84R35IvuQp4RyhhCjYhjq5b_Lu4",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "רונן עמוס - רו\"ח ויועץ טכנולוגי פיננסי",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "רונן עמוס | רו\"ח ויועץ טכנולוגי פיננסי",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "רונן עמוס | רו\"ח ויועץ טכנולוגי פיננסי",
    description: "שילוב טכנולוגיה וכספים, AI, Power BI ואוטומציה פיננסית.",
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
        <Header />
        <main>{children}</main>
        <AIChat />
        <WhatsAppFloat />
        <StickyNewsletterBar />
        <Footer />
      </body>
    </html>
  );
}
