"use client";

import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function VaultCTA() {
  return (
    <section className="vault-cta-section">
      <div className="vault-inner">
        <div className="vault-cta-eyebrow">הישאר מחובר</div>
        <h2 className="vault-cta-title">
          קבל <span className="vault-gradient-text">פרומפטים חדשים</span> ועדכונים
        </h2>
        <p className="vault-cta-subtitle">
          הצטרף לקהילה של אנשי פיננסים שמשתמשים ב-AI בעבודה היומיומית
        </p>

        <div className="vault-cta-grid">
          {/* WhatsApp Card */}
          <div className="vault-cta-card vault-cta-whatsapp">
            <div className="vault-cta-card-icon">💬</div>
            <h3 className="vault-cta-card-title">קהילת WhatsApp</h3>
            <p className="vault-cta-card-desc">
              טיפים יומיים, פרומפטים חדשים ודיונים עם אנשי כספים שמשתמשים ב-AI.
              <br />
              <span style={{ color: 'var(--vault-accent)', fontSize: '0.8rem', fontWeight: 600 }}>
                +200 חברים פעילים
              </span>
            </p>
            <a
              href="https://chat.whatsapp.com/CS6dgqnK45Q9XAMqScNr6R?mode=gi_t"
              target="_blank"
              rel="noopener noreferrer"
              className="vault-cta-btn vault-cta-btn-whatsapp"
            >
              הצטרף לקהילה ←
            </a>
          </div>

          {/* Newsletter Card */}
          <div className="vault-cta-card vault-cta-newsletter">
            <div className="vault-cta-card-icon">📧</div>
            <h3 className="vault-cta-card-title">עדכונים למייל</h3>
            <p className="vault-cta-card-desc">
              פרומפטים חדשים, מדריכי AI לכספים ותובנות מקצועיות — פעם בשבוע, ללא ספאם.
            </p>
            <div className="vault-cta-form">
              <NewsletterForm source="skill-vault-cta" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
