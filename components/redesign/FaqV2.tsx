import { Plus } from "lucide-react";

/**
 * Subscription objection-handling FAQ.
 *
 * Deliberately scoped to the membership — the existing /faq page answers
 * consulting questions and does not address billing, cancellation or what the
 * subscription includes. Uses native <details> so the section stays a server
 * component and remains keyboard- and screen-reader-accessible with no JS.
 */
const faqs = [
    {
        q: "מה בדיוק כלול במנוי?",
        a: "גישה מלאה לכל התוכן המקצועי באתר: כל המדריכים המסומנים כפרימיום, ספריית 100+ הפרומפטים והסקילים, כל הוובינרים המוקלטים, חוברות Excel ותבניות להורדה, וקבוצת וואטסאפ שקטה לעדכונים בלעדיים.",
    },
    {
        q: "כמה זה עולה ואיך מחייבים אותי?",
        a: "₪100 לחודש, בתשלום מאובטח דרך PayPal. החיוב מתחדש אוטומטית מדי חודש עד שתבטלו.",
    },
    {
        q: "אפשר לבטל את המנוי?",
        a: "כן — ביטול בכל עת, ללא התחייבות ובלי לדבר עם אף אחד. הביטול מתבצע ישירות מחשבון ה-PayPal שלכם, והגישה לתוכן נשארת פתוחה עד סוף תקופת החיוב ששולמה.",
    },
    {
        q: "יש תוכן שאפשר לקרוא בחינם לפני שמשלמים?",
        a: "יש מבחר מצומצם של מדריכים ומאמרים פתוחים, והניוזלטר השבועי חינמי — מספיק כדי להתרשם מרמת התוכן ומסגנון העבודה. עם זאת, רוב התוכן באתר שמור למנויים בלבד: המדריכים המתקדמים, ספריית הפרומפטים והסקילים, הוובינרים המוקלטים וחוברות ה-Excel נפתחים רק עם מנוי.",
    },
    {
        q: "למי המנוי מתאים?",
        a: "רואי חשבון, מנהלי כספים, בקרים ו-CFOs שרוצים לעבוד עם AI בפועל — לא ללמוד תיאוריה. כל התוכן נכתב בעברית ומבוסס על עבודה אמיתית מול צוותי כספים בישראל.",
    },
    {
        q: "נוסף תוכן חדש, או שזו ספרייה סטטית?",
        a: "הספרייה מתעדכנת באופן שוטף — מדריכים חדשים, פרומפטים נוספים ווובינרים מוקלטים נכנסים לאורך זמן, והגישה אליהם כלולה במנוי הקיים ללא תוספת תשלום.",
    },
];

export function FaqV2() {
    return (
        <section className="rv2-container py-14">
            <div className="mb-8">
                <div className="rv2-kicker mb-2">שאלות נפוצות</div>
                <h2 className="rv2-display text-3xl">כל מה שכדאי לדעת לפני שמצטרפים</h2>
            </div>

            {/* items-start: an expanded answer must not stretch its closed
                neighbour into an empty box */}
            <div className="grid items-start gap-3 lg:grid-cols-2">
                {faqs.map((f, i) => (
                    <details key={f.q} className="rv2-faq rv2-surface bg-[rgba(15,23,42,0.7)]">
                        <summary className="rv2-faq-q">
                            <span className="rv2-mono rv2-faq-index" aria-hidden>
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1">{f.q}</span>
                            <Plus size={18} aria-hidden className="rv2-faq-icon shrink-0" />
                        </summary>
                        <p className="rv2-faq-a">{f.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
