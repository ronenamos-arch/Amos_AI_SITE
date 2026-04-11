import Link from "next/link";

interface VaultPageSwitchProps {
  currentPage: "prompts" | "cleaning";
}

export function VaultPageSwitch({ currentPage }: VaultPageSwitchProps) {
  if (currentPage === "prompts") {
    return (
      <div className="vault-pageswitch">
        <div className="vault-inner">
          <div className="vault-pageswitch-inner">
            <div className="vault-pageswitch-text">
              <p className="vault-pageswitch-label">כלי נוסף</p>
              <p className="vault-pageswitch-title">
                רוצה לנקות נתונים פיננסיים עם AI?
              </p>
              <p className="vault-pageswitch-desc">
                מודול ניקוי הנתונים כולל שיטות מעשיות, פרומפטים לביקורת ותוצאות CFO-ready
              </p>
            </div>
            <Link href="/skill-vault/cleaning" className="vault-pageswitch-btn">
              עבור לדף ניקוי הנתונים ←
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vault-pageswitch">
      <div className="vault-inner">
        <div className="vault-pageswitch-inner">
          <div className="vault-pageswitch-text">
            <p className="vault-pageswitch-label">כלי נוסף</p>
            <p className="vault-pageswitch-title">
              מחפש פרומפטים מוכנים לתקציב, P&L ותחזית?
            </p>
            <p className="vault-pageswitch-desc">
              22 פרומפטים מקצועיים לאנשי FP&A, CFO ורואי חשבון — העתק והשתמש מיד
            </p>
          </div>
          <Link href="/skill-vault" className="vault-pageswitch-btn">
            עבור ל-Prompt Vault ←
          </Link>
        </div>
      </div>
    </div>
  );
}
