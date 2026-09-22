import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: { absolute: "ניקוי נתונים פיננסיים עם AI – ספריית פרומפטים | AI Finance" },
  description:
    "שיטות ניקוי נתונים פיננסיים עם AI: Claude, Python, Google Colab. פרומפטים לביקורת נתונים, אימות מטבע, ניתוח שלמות מבנית — מוכנים לשימוש.",
  alternates: {
    canonical: "https://www.ronenamoscpa.co.il/skill-vault",
  },
};

export default function DataCleaningPage() {
  // Seamlessly route users to the unified Skill Vault hub
  redirect("/skill-vault");
}
