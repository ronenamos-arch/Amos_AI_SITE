import { VaultTabBar } from "@/components/skill-vault/VaultTabBar";
import type { Metadata } from "next";

// Redeploy trigger
export const metadata: Metadata = {
  title: { absolute: "ספריית פרומפטים – פרומפטים מוכנים לאנשי פיננסים | AI Finance" },
  description:
    "פרומפטים מוכנים לשימוש לאנשי FP&A, CFO ורואי חשבון. העתק, הדבק ותן ל-AI לעבוד בשבילך — תקציב, תזרים, P&L ועוד.",
  keywords: [
    "פרומפטים AI פיננסים",
    "ChatGPT לרואי חשבון",
    "AI FP&A",
    "ניתוח כספי AI",
    "כלי AI לכספים",
    "פרומפטים CFO",
  ],
};

export default function SkillVaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VaultTabBar />
      {children}
    </>
  );
}
