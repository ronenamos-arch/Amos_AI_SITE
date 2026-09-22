import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "ספריית ה-AI והפרומפטים למנהלי כספים ורואי חשבון | AI Finance Skill Vault",
  },
  description:
    "מעל 100 פרומפטים מוכנים, מודולי ניקוי נתונים וסקריפטים לאנשי FP&A, CFOs ורואי חשבון. תקציב, תזרים, P&L, ביקורת נתונים ודוחות לדירקטוריון.",
  alternates: {
    canonical: "https://www.ronenamoscpa.co.il/skill-vault",
  },
  keywords: [
    "פרומפטים AI פיננסים",
    "ChatGPT לרואי חשבון",
    "Claude למנהלי כספים",
    "AI FP&A",
    "ניתוח כספי AI",
    "אוטומציה פיננסית",
    "ניקוי נתונים באקסל",
    "פרומפטים CFO",
    "דוחות כספיים AI",
    "ביקורת נתונים פיננסיים",
  ],
  openGraph: {
    title: "ספריית ה-AI והפרומפטים למנהלי כספים ורואי חשבון | Skill Vault",
    description:
      "מעל 100 פרומפטים מוכנים, סקריפטים ומודולי ניקוי נתונים לאנשי FP&A ו-CFO. העתק והדבק ב-Claude או ChatGPT.",
    url: "https://www.ronenamoscpa.co.il/skill-vault",
    type: "website",
  },
};

export default function SkillVaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
