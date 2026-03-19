import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Problems } from "@/components/sections/Problems";
import { Solutions } from "@/components/sections/Solutions";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: 'רונן עמוס | רו"ח ויועץ AI פיננסי – ייעוץ חשבונאי וטכנולוגי',
  description:
    'רו"ח מוסמך עם מעל עשור ניסיון. מסייע לעסקים לחסוך זמן וכסף בעזרת Power BI, AI ואוטומציה פיננסית. פגישת ייעוץ ראשונה חינם.',
  alternates: {
    canonical: "https://www.ronenamoscpa.co.il",
  },
  keywords: [
    "רואה חשבון",
    "יועץ AI",
    "Power BI",
    "אוטומציה פיננסית",
    "ייעוץ פיננסי",
    "בינה מלאכותית עסקים",
    "דשבורד פיננסי",
    'רו"ח דיגיטלי',
    "אוטומציה Excel",
  ],
  openGraph: {
    title: 'רונן עמוס | רו"ח ויועץ AI פיננסי',
    description:
      "חסוך שעות עבודה כל שבוע עם Power BI, AI ואוטומציה פיננסית. פגישת ייעוץ ראשונה חינם.",
    url: "https://www.ronenamoscpa.co.il",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Problems />
      <Solutions />
      <Services />
      <Testimonials />
      <Newsletter />
      <CTA />
    </>
  );
}
