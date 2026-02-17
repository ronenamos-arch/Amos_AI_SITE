import type { Metadata } from "next";
import { Heebo, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { AIChat } from "@/components/ui/AIChat";

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
    "AI",
    "Power BI",
    "אוטומציה פיננסית",
    "ASC 606",
    "ייעוץ פיננסי",
    "הכשרות כספים",
  ],
  metadataBase: new URL("https://ronenamos-cpa.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "רונן עמוס - רו\"ח ויועץ טכנולוגי פיננסי",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${outfit.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <AIChat />
        <WhatsAppFloat />
        <Footer />
      </body>
    </html>
  );
}
