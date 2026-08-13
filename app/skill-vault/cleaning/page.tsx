import type { Metadata } from "next";
import DataCleaningModule from "@/components/skill-vault/DataCleaningModule";
import { VaultCTA } from "@/components/skill-vault/VaultCTA";
import "../../skills-vault.css";

export const metadata: Metadata = {
  title: { absolute: "ניקוי נתונים פיננסיים עם AI – ספריית פרומפטים | AI Finance" },
  description:
    "שיטות ניקוי נתונים פיננסיים עם AI: Claude, Python, Google Colab. פרומפטים לביקורת נתונים, אימות מטבע, ניתוח שלמות מבנית — מוכנים לשימוש.",
  keywords: [
    "ניקוי נתונים פיננסיים",
    "AI ניקוי אקסל",
    "Python ניתוח נתונים",
    "Claude ניקוי נתונים",
    "ביקורת נתונים פיננסיים",
    "FP&A ניקוי נתונים",
  ],
};

export default function DataCleaningPage() {
  return (
    <div className="vault-container">
      {/* Page Hero */}
      <section className="vault-hero" style={{ paddingBottom: "32px" }}>
        <div className="vault-inner">
          <p className="vault-hero-eyebrow">Data Module</p>
          <h1 className="vault-hero-headline">
            אמנות{" "}
            <span className="vault-gradient-text">הנתונים הנקיים</span>
          </h1>
          <p className="vault-hero-subtitle">
            ניקוי נתונים פיננסיים עם AI — שיטות מעשיות, פרומפטים מוכנים,
            <br />
            ביקורת תוצאות כמו CFO אמיתי.
          </p>

          <div className="vault-stats-row">
            <div className="vault-stat">
              <span className="vault-gradient-text font-bold text-2xl">3</span>
              <span className="text-xs text-gray-400">שיטות ניקוי</span>
            </div>
            <div className="vault-stat-divider" />
            <div className="vault-stat">
              <span className="vault-gradient-text font-bold text-2xl">5</span>
              <span className="text-xs text-gray-400">פרומפטי ביקורת</span>
            </div>
            <div className="vault-stat-divider" />
            <div className="vault-stat">
              <span className="vault-gradient-text font-bold text-2xl">CFO</span>
              <span className="text-xs text-gray-400">Ready Output</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo File Download Box */}
      <section className="vault-demo-section">
        <div className="vault-inner">
          <div className="vault-demo-box">
            <h2 className="vault-demo-heading">קובץ לתרגול — נסה בעצמך</h2>
            <p className="vault-demo-description">
              גיליון PNL עם 4 אזורים — ישראל, אירופה, אמריקה, אסיה
              <br />
              בדיוק הדאטה המבולגן שצריך לנקות עם ה-AI.
            </p>
            <div className="vault-demo-sheets">
              <span className="vault-demo-chip">ישראל</span>
              <span className="vault-demo-chip">אירופה</span>
              <span className="vault-demo-chip">אמריקה</span>
              <span className="vault-demo-chip">אסיה</span>
            </div>
            <a
              href="/downloads/pnl-demo.xlsx"
              download="pnl-demo.xlsx"
              className="vault-demo-button"
            >
              📥 הורד קובץ לדוגמה
            </a>
          </div>
        </div>
      </section>

      {/* Data Cleaning Module */}
      <section className="vault-skills-section" style={{ paddingTop: 0 }}>
        <div className="vault-inner">
          <DataCleaningModule />
        </div>
      </section>

      {/* CTA */}
      <VaultCTA />
    </div>
  );
}
