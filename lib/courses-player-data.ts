export interface CourseLesson {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  embedUrl: string;
  fallbackUrl?: string;
  videoUrl?: string;
  presentationUrl?: string;
  keyTakeaways: string[];
  prompts?: {
    title: string;
    description: string;
    promptText: string;
  }[];
  downloads?: {
    title: string;
    type: "pdf" | "excel" | "notion" | "zip" | "link" | "doc";
    url: string;
    size?: string;
  }[];
}

export interface PlayerCourse {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  level: string;
  duration: string;
  badge: string;
  accentColor: "teal" | "royal" | "gold";
  image: string;
  smartbeeUrl: string;
  isIncludedInPro: boolean;
  masterGammaUrl?: string;
  masterFallbackUrl?: string;
  lessons: CourseLesson[];
}

export const PLAYER_COURSES: Record<string, PlayerCourse> = {
  "ai-mastery": {
    slug: "ai-mastery",
    title: "AI לכספים: המדריך למתחילים",
    tagline: "מהפיכת ה-ChatGPT בעולם החשבונאות, הפיננסים וה-FP&A",
    description: "קורס יסוד מעשי בן 8 שיעורים המלמד אנשי כספים וחשבונאות לרתום את ChatGPT ו-Generative AI לחסכון של עשרות שעות, אוטומציה של דוחות וקבלת החלטות מהירה.",
    price: 250,
    originalPrice: 450,
    level: "מתחילים - בינוני",
    duration: "8 שיעורים • שעתיים וחצי",
    badge: "יסודות ופרקטיקה",
    accentColor: "royal",
    image: "/images/courses/ai-mastery-syllabus.png",
    smartbeeUrl: "https://smartbee.co.il/public-pages/?redirect-path=pay/6aa9542e3d393becc5dd187a",
    isIncludedInPro: true,
    masterGammaUrl: "https://gamma.app/embed/ChatGPT--wrvbq68o6zujsmt",
    masterFallbackUrl: "https://gamma.app/docs/ChatGPT--wrvbq68o6zujsmt",
    lessons: [
      {
        id: 1,
        slug: "lesson-1-intro",
        title: "שיעור 1: מבוא לעולם ה-AI Finance והגדרת סביבת עבודה",
        subtitle: "כלים, ציפיות, אבטחת מידע ומטרות אסטרטגיות",
        description: "הכרת סביבת העבודה, הכללים הקריטיים של פרטיות ואבטחת נתונים פיננסיים (Data Privacy & Compliance), והבנת הפוטנציאל של מודלי שפה בעבודת החשב ומנהל הכספים.",
        duration: "18 דק'",
        embedUrl: "https://drive.google.com/file/d/1259EmcO-QpBvtLItMKRham0AaRHwCkKc/preview",
        fallbackUrl: "https://drive.google.com/file/d/1259EmcO-QpBvtLItMKRham0AaRHwCkKc/view?usp=sharing",
        presentationUrl: "https://drive.google.com/file/d/1259EmcO-QpBvtLItMKRham0AaRHwCkKc/view?usp=sharing",
        keyTakeaways: [
          "הבנת גבולות הגזרה של AI בעבודה עם מספרי אמת ודוחות כספיים",
          "הגדרות פרטיות וביטול אימון מודלים על דאטה רגישה",
          "בניית שגרת עבודה יומיומית לצוות הכספים",
        ],
        prompts: [
          {
            title: "פרומפט הגדרת תפקיד (System Role) לאיש כספים",
            description: "הגדרת בינה מלאכותית כיועץ בכיר ל-CFO עם התאמה לכללי חשבונאות ישראליים ובינלאומיים.",
            promptText: `פעל כיועץ פיננסי בכיר, מומחה IFRS ותקינה ישראלית, עם ניסיון עשיר בליווי CFOs בחברות מובילות. 
בכל ניתוח שאתן לך:
1. שמור על גישה ביקורתית ומדויקת.
2. הצג תובנות מנהלים (Executive Summary) ולא רק חישובים גולמיים.
3. הדגש סיכונים, חריגות ונקודות תשומת לב לדירקטוריון.
4. השתמש במונחים פיננסיים מקצועיים (EBITDA, NWC, CapEx, Runway).`,
          },
        ],
        downloads: [
          {
            title: "🎓 תרגילים לקורס (Google Doc)",
            type: "doc",
            url: "https://docs.google.com/document/d/1DGeUXRPzhVaPOasnqAnc2Bh4kcRCmvYtF_5S_78FsWg/edit?usp=sharing",
          },
          {
            title: "מצגת שיעור 1 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1259EmcO-QpBvtLItMKRham0AaRHwCkKc/view?usp=sharing",
          },
          {
            title: "חוברת הדרכה מלאה לקורס (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1ZnI1W57I3bJe4-j05WEGRmYARcfbXsLx/view?usp=sharing",
          },
          {
            title: "מדריך אבטחת מידע ופרטיות לאנשי כספים (באתר)",
            type: "link",
            url: "/guides/chatgpt-finance-guide-hebrew",
          },
        ],
      },
      {
        id: 2,
        slug: "lesson-2-prompts",
        title: "שיעור 2: מאסטר פרומפטים פיננסיים ומסגרות עבודה",
        subtitle: "איך לנסח פקודות שמפיקות תוצאות מדויקות ללא הזיות",
        description: "לימוד 20 מסגרות עבודה (Prompt Frameworks) מנצחות לכתיבת פרומפטים בתחומי FP&A, ניתוח רווחיות, תקציב ובקרות פנימיות.",
        duration: "22 דק'",
        embedUrl: "https://drive.google.com/file/d/1fUbCFnq1Y1ocwsl3s6HulbawfLXOegTI/preview",
        fallbackUrl: "https://drive.google.com/file/d/1fUbCFnq1Y1ocwsl3s6HulbawfLXOegTI/view?usp=sharing",
        presentationUrl: "https://drive.google.com/file/d/1fUbCFnq1Y1ocwsl3s6HulbawfLXOegTI/view?usp=sharing",
        keyTakeaways: [
          "עקרון C-T-C-O (Context, Task, Constraints, Output)",
          "טכניקות Few-Shot Prompting להשגת פורמט מדויק של טבלאות",
          "מניעת טעויות חישוב ואימות נתונים",
        ],
        prompts: [
          {
            title: "תבנית פרומפט C-T-C-O לניתוח שונות תקציב (Variance Analysis)",
            description: "פרומפט מובנה לזיהוי הגורמים המרכזיים לסטייה בין תקציב לביצוע.",
            promptText: `[הקשר]: חברת הייטק B2B בשלב צמיחה, רבעון 3.
[משימה]: נתח את טבלת השונות המצורפת (תקציב מול ביצוע) בסעיפי ה-OPEX וה-COGS.
[מגבלות]: התעלם מסטיות קטנות מ-5%. הסבר מה מקור השונות (מחיר, כמות, תזמון).
[פלט רצוי]: טבלה מסודרת בעברית הכוללת: סעיף, סטייה בש"ח, סטייה באחוזים, סיבת השורש, והמלצה פרקטית לפעולה מתקנת.`,
          },
        ],
        downloads: [
          {
            title: "מדריך אסטרטגי להקמת ספריית פרומפטים מחלקתית (Google Doc)",
            type: "doc",
            url: "https://docs.google.com/document/d/1AdJ8fQHggUrz_xV5z6bUe3sg39lYlh43VHaBLLa7gVc/edit?usp=sharing",
          },
          {
            title: "Claude Finance Playbook בעברית (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1m_CMYKe01q15oLqZlKuY_NPkxcehg_sT/view?usp=sharing",
          },
          {
            title: "מדריך קלאוד אנתרופיק למנהלי כספים (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1CtD6Eh9PHFY1pweWThEtB2sT2x3pIqeU/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 2 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1fUbCFnq1Y1ocwsl3s6HulbawfLXOegTI/view?usp=sharing",
          },
        ],
      },
      {
        id: 3,
        slug: "lesson-3-data-cleaning",
        title: "שיעור 3: אוטומציה של איסוף וניקוי נתונים",
        subtitle: "מ-Excel מבולגן ו-PDF סרוק לטבלאות נקיות ומוכנות לעבודה",
        description: "שיטות עבודה מעשיות לייבוא דוחות בנק, כרטסות הנהלת חשבונות וחשבוניות, ניקוי שגיאות, הסרת כפילויות ונרמול נתונים בדקות ספורות.",
        duration: "25 דק'",
        embedUrl: "https://drive.google.com/file/d/1aaCGKdUiiUOo1r8v_1XwS2JCLpPPkOX0/preview",
        fallbackUrl: "https://drive.google.com/file/d/1aaCGKdUiiUOo1r8v_1XwS2JCLpPPkOX0/view?usp=sharing",
        presentationUrl: "https://drive.google.com/file/d/1aaCGKdUiiUOo1r8v_1XwS2JCLpPPkOX0/view?usp=sharing",
        keyTakeaways: [
          "המרת קבצי PDF סרוקים לטבלאות CSV מסודרות",
          "פרומפטים לאיתור חריגות בכרטסות הנהלת חשבונות",
          "שילוב כלי Python ב-Advanced Data Analysis",
        ],
        prompts: [
          {
            title: "פרומפט התאמת שמות ספקים ונרמול כרטסת",
            description: "איחוד שמות ספקים שנרשמו בווריאציות שונות בהנהלת חשבונות.",
            promptText: `קבל את רשימת התנועות הבאה. נרמל את שמות הספקים לשם תקני אחיד (לדוגמה: "בזק בינלאומי בע\"מ" ו-"בזק ביל\"מ" יאוחדו ל-"בזק בינלאומי"). הפק טבלת סיכום עם סך התשלום לכל ספק מנורמל.`,
          },
        ],
        downloads: [
          {
            title: "מדריך פרקטי: אוטומציה של דיווח חודשי ב-Excel (Google Doc)",
            type: "doc",
            url: "https://docs.google.com/document/d/1gnrMqvOihQmginrcAFnyeIPmWWQdcBxbI9t7wY0WbZk/edit?usp=sharing",
          },
          {
            title: "AI Data Cleaning for Beginners (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1K27d4G4zz9p_T06caxGS327TCdzwo4J9/view?usp=sharing",
          },
          {
            title: "100 טיפים מעשיים לניתוח דאטה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1CcdR09Sbx00OUPDc2ttsTTlz5wvPX_iV/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 3 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1aaCGKdUiiUOo1r8v_1XwS2JCLpPPkOX0/view?usp=sharing",
          },
        ],
      },
      {
        id: 4,
        slug: "lesson-4-creative-finance",
        title: "שיעור 4: חשיבה יצירתית וסיעור מוחות פיננסי",
        subtitle: "חדשנות באופטימיזציית עלויות, תמחור ומודלים עסקיים",
        description: "כיצד להשתמש ב-AI כשותף לחשיבה (Thinking Partner) לפיתוח מודלי תמחור חדשים, מציאת דרכים לשיפור תזרים והפחתת ימי אשראי לקוחות (DSO).",
        duration: "20 דק'",
        embedUrl: "https://drive.google.com/file/d/1tWRBGjEl4O28a7onru094WznfTDkLwpr/preview",
        fallbackUrl: "https://drive.google.com/file/d/1tWRBGjEl4O28a7onru094WznfTDkLwpr/view?usp=sharing",
        presentationUrl: "https://drive.google.com/file/d/1tWRBGjEl4O28a7onru094WznfTDkLwpr/view?usp=sharing",
        keyTakeaways: [
          "תרגילי סימולציית תרחישים (Scenario Modeling)",
          "איתור צווארי בקבוק בתהליכי גבייה",
          "בניית טיעונים למשא ומתן עם ספקים ובנקים",
        ],
        prompts: [
          {
            title: "סיעור מוחות לקיצור ימי אשראי לקוחות (DSO)",
            description: "קבלת תוכנית עבודה פרקטית לשיפור הגבייה וחיזוק תזרים המזומנים.",
            promptText: `נתון: ימי אשראי לקוחות (DSO) עומדים על 85 יום לעומת יעד של 60 יום בחברת שירותים. 
הצע 5 מהלכים יישומיים מבוססי תמריצים, מדיניות מסחרית ותהליכים פנימיים כדי להוריד את ה-DSO תוך 90 יום ללא פגיעה בקשרי הלקוחות.`,
          },
        ],
        downloads: [
          {
            title: "מדריך לבניית מודל חיזוי פיננסי רב-תרחישי (Google Doc)",
            type: "doc",
            url: "https://docs.google.com/document/d/19IyoCH2Ppi_FER77aaFbihte447f31Bhwd4vM1M1urc/edit?usp=sharing",
          },
          {
            title: "Excel Agent 10 Minute Cash Flow (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1nfwgpQFnZL9HTbz2kE6UwEo1agzd_wlV/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 4 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1tWRBGjEl4O28a7onru094WznfTDkLwpr/view?usp=sharing",
          },
        ],
      },
      {
        id: 5,
        slug: "lesson-5-data-to-insights",
        title: "שיעור 5: מנתונים לתובנות עסקיות מהירות",
        subtitle: "ניתוח דוחות כספיים, יחסים פיננסיים ומגמות",
        description: "מעבר מאיסוף נתונים להפקת משמעויות: חישוב יחסי נזילות, רווחיות ויעילות תפעולית, וניסוח תמצית מנהלים ברורה וחדה לדירקטוריון.",
        duration: "24 דק'",
        embedUrl: "https://drive.google.com/file/d/1pEfHKWk_ghPaHjVk4tYi-FwYLkgrLwtO/preview",
        fallbackUrl: "https://drive.google.com/file/d/1pEfHKWk_ghPaHjVk4tYi-FwYLkgrLwtO/view?usp=sharing",
        presentationUrl: "https://drive.google.com/file/d/1pEfHKWk_ghPaHjVk4tYi-FwYLkgrLwtO/view?usp=sharing",
        keyTakeaways: [
          "הפקת דוח יחסים פיננסיים מלא תוך 60 שניות",
          "זיהוי מגמות שחיקה ברווח הגולמי והתפעולי",
          "כתיבת תקציר מנהלים אפקטיבי (Executive Summary)",
        ],
        prompts: [
          {
            title: "תקציר מנהלים לדוח רווח והפסד",
            description: "תרגום טבלת רווח והפסד לנייר עמדה ממוקד לדירקטוריון.",
            promptText: `קבל את דוח רווח והפסד המצורף. 
כתוב תקציר מנהלים של עמוד אחד הכולל:
1. שורה תחתונה ותוצאות מפתח.
2. הגורמים המרכזיים שהשפיעו על הרווח הנקי.
3. 3 נקודות דאגה שדורשות מעקב מיוחד ברבעון הבא.`,
          },
        ],
        downloads: [
          {
            title: "Agent Mode Financial Modeling (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1N5YHYEztdkO2rzOVBf2L-cYsdl6LWLyT/view?usp=sharing",
          },
          {
            title: "Gemini Accountant AI Workflow (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/19mEq32s2Vo91xWcVXND359j7Z4TakhR6/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 5 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1pEfHKWk_ghPaHjVk4tYi-FwYLkgrLwtO/view?usp=sharing",
          },
        ],
      },
      {
        id: 6,
        slug: "lesson-6-troubleshooting",
        title: "שיעור 6: פתרון בעיות טכניות ושימוש ב-AI לתמיכה ב-Excel",
        subtitle: "תיקון נוסחאות מורכבות, מאקרו (VBA), ו-Power Query",
        description: "איך להשתמש ב-AI כדי לכתוב נוסחאות XLOOKUP, INDEX-MATCH, שאילתות Power Query וקוד VBA ללא רקע בתכנות.",
        duration: "18 דק'",
        embedUrl: "https://drive.google.com/file/d/1njOAfvQ4VTFV67sEmczI1mTayLrcK7-i/preview",
        fallbackUrl: "https://drive.google.com/file/d/1njOAfvQ4VTFV67sEmczI1mTayLrcK7-i/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1jF9BPTGGbq6pdoFgah2nCagK6TOHn6L5/preview",
        presentationUrl: "https://drive.google.com/file/d/1njOAfvQ4VTFV67sEmczI1mTayLrcK7-i/view?usp=sharing",
        keyTakeaways: [
          "דיבאג ופתרון שגיאות בנוסחאות Excel מורכבות (#N/A, #VALUE!)",
          "יצירת סקריפטים ב-Power Query M-Code",
          "אוטומציות קלות של שגרות שבועיות באמצעות VBA",
        ],
        prompts: [
          {
            title: "תיקון שגיאות אקסל ושיפור ביצועים",
            description: "ניתוח נוסחה תקולה ומתן חלופה אלגנטית ומהירה.",
            promptText: `הנוסחה הבאה מחזירה שגיאה: [הדבק נוסחה כאן]. 
הסבר מה סיבת השגיאה, הצע נוסחה מתוקנת המבוססת על XLOOKUP/FILTER, והסבר כיצד היא עובדת.`,
          },
        ],
        downloads: [
          {
            title: "צפייה בשיעור 6 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1jF9BPTGGbq6pdoFgah2nCagK6TOHn6L5/view?usp=sharing",
          },
          {
            title: "Gemini CLI for Finance (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1jGlkLuRdZi7M870_w1_i4yWqJO6e80DK/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 6 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1njOAfvQ4VTFV67sEmczI1mTayLrcK7-i/view?usp=sharing",
          },
        ],
      },
      {
        id: 7,
        slug: "lesson-7-multimodal-gpt4o",
        title: "שיעור 7: מודלים מתקדמים ויכולות מולטימדיה (Vision & Code)",
        subtitle: "קריאת גרפים, פענוח חשבוניות מתמונות וניתוח ויזואלי",
        description: "ניצול יכולות הראייה הממוחשבת (Vision) להעלאת צילומי מסך של דשבורדים, חשבוניות ספק בכתב יד וגרפים לקבלת ניתוח מיידי.",
        duration: "19 דק'",
        embedUrl: "https://drive.google.com/file/d/1s0JXOU70DlZP9ENglBmzwKmjFuR4GH1m/preview",
        fallbackUrl: "https://drive.google.com/file/d/1s0JXOU70DlZP9ENglBmzwKmjFuR4GH1m/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/17IMDwN8ATrNF0uGo1wjwcm4k_7AIrZxp/preview",
        presentationUrl: "https://drive.google.com/file/d/1s0JXOU70DlZP9ENglBmzwKmjFuR4GH1m/view?usp=sharing",
        keyTakeaways: [
          "המרת תמונת גרף לטבלת נתונים מספרית",
          "בקרת חשבוניות והצלבה מול הזמנות רכש מתמונות",
          "שימוש באפליקציית הנייד לישיבות ולתנועה",
        ],
        prompts: [
          {
            title: "חילוץ נתונים מובנה מתמונת חשבונית",
            description: "חילוץ שדות קריטיים (ספק, ח.פ, מע\"מ, תאריך, סכום) בפורמט JSON/CSV.",
            promptText: `קרא את תמונת החשבונית המצורפת וחלץ את השדות הבאים בפורמט טבלה נקייה:
- שם הספק
- מספר ע.מ / ח.פ
- תאריך החשבונית
- מספר חשבונית
- סכום לפני מע"מ
- סכום מע"מ
- סה"כ לתשלום`,
          },
        ],
        downloads: [
          {
            title: "צפייה בשיעור 7 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/17IMDwN8ATrNF0uGo1wjwcm4k_7AIrZxp/view?usp=sharing",
          },
          {
            title: "מדריך אוטומציית חשבוניות n8n + Claude (DOCX)",
            type: "doc",
            url: "https://drive.google.com/file/d/1H7UDNYdCAv3TZI02CjwpCAxxsObhpZaE/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 7 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1s0JXOU70DlZP9ENglBmzwKmjFuR4GH1m/view?usp=sharing",
          },
        ],
      },
      {
        id: 8,
        slug: "lesson-8-future-roadmap",
        title: "שיעור 8: עתיד ה-AI בכספים ומפת דרכים מקצועית",
        subtitle: "בניית יתרון תחרותי לאיש הכספים של 2026 ואילך",
        description: "סקירת המגמות הבאות: סוכנים אוטונומיים (Autonomous Agents), אינטגרציות API עם מערכות ERP (פריוריטי, סאפ, חשבשבת) ותוכנית פעולה אישית.",
        duration: "20 דק'",
        embedUrl: "https://drive.google.com/file/d/1Rty6thf6UgwGRUMXhkMXDrqi5Fcf7TgE/preview",
        fallbackUrl: "https://drive.google.com/file/d/1Rty6thf6UgwGRUMXhkMXDrqi5Fcf7TgE/view?usp=sharing",
        presentationUrl: "https://drive.google.com/file/d/1Rty6thf6UgwGRUMXhkMXDrqi5Fcf7TgE/view?usp=sharing",
        keyTakeaways: [
          "הבנת סוכני AI ואוטומציה ללא מגע אדם",
          "שילוב בסיסי ידע ארגוניים מבוססי AI",
          "סיכום הקורס וצעדים להמשך יישום בארגון",
        ],
        prompts: [
          {
            title: "בניית מפת דרכים אישית להטמעת AI במחלקה",
            description: "תוכנית 30-60-90 ימים לצוות הכספים.",
            promptText: `בנה תוכנית עבודה של 90 יום להטמעת כלי AI במחלקת הנהלת חשבונות וכספים של 5 עובדים. חלק ל-3 שלבים: יסודות והדרכה (יום 1-30), פיילוטים באקסל ודוחות (יום 31-60), אוטומציה ובקרות מלאות (יום 61-90).`,
          },
        ],
        downloads: [
          {
            title: "חוברת הקורס המלאה — AI Finance Master (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1ZnI1W57I3bJe4-j05WEGRmYARcfbXsLx/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 8 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1Rty6thf6UgwGRUMXhkMXDrqi5Fcf7TgE/view?usp=sharing",
          },
          {
            title: "ספריית המדריכים המלאה באתר",
            type: "link",
            url: "/guides",
          },
        ],
      },
    ],
  },
  "notebook-master": {
    slug: "notebook-master",
    title: "Mastering NotebookLM: קורס מעשי לאנשי פיננסים",
    tagline: "שליטה מלאה ב-NotebookLM להכנה לדירקטוריון, Deep Research ומצוינות רגולטורית ללא הזיות",
    description: "קורס מעשי מעמיק בן 8 שיעורים הכולל צילומי וידאו מלאים, מצגות PDF מקצועיות, ומדריכי פרויקט להצלבת עשרות דוחות כספיים, רגולציה ומסמכים עסקיים ב-100% דיוק ומראי מקום.",
    price: 150,
    originalPrice: 350,
    level: "מתחילים - מתקדמים",
    duration: "8 שיעורים • שעתיים וחצי • וידאו + מצגות",
    badge: "Grounded AI & Research",
    accentColor: "teal",
    image: "/images/courses/notebook-master-syllabus.png",
    smartbeeUrl: "https://smartbee.co.il/public-pages/?redirect-path=pay/6aa9542e3d393becc5dd187a",
    isIncludedInPro: true,
    masterGammaUrl: "https://gamma.app/embed/NotebookLM-Mster-gafs6d200bids42",
    masterFallbackUrl: "https://gamma.app/docs/NotebookLM-Mster-gafs6d200bids42",
    lessons: [
      {
        id: 1,
        slug: "lesson-1-financial-analysis",
        title: "שיעור 1: פיצוח דוחות כספיים באמצעות בינה מלאכותית",
        subtitle: "העלאת דוחות שנתיים, ניתוח רב-מקורות ומהפכת ה-Grounded AI",
        description: "הבנת ארכיטקטורת ה-Grounding של גוגל: כיצד NotebookLM מתבסס ב-100% אך ורק על המקורות שלכם, מונע הזיות לחלוטין ומספק ציטוטים מדויקים לכל מספר ומשפט מתוך דוחות כספיים.",
        duration: "18 דק'",
        embedUrl: "https://drive.google.com/file/d/1EOR8nw1H6TywvSs_KT7yHvW7cdqaNu6V/preview",
        fallbackUrl: "https://drive.google.com/file/d/1EOR8nw1H6TywvSs_KT7yHvW7cdqaNu6V/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/19_ywJw0ItlXQR4NkoU_pYylPlYlQ7r5N/preview",
        presentationUrl: "https://drive.google.com/file/d/1EOR8nw1H6TywvSs_KT7yHvW7cdqaNu6V/view?usp=sharing",
        keyTakeaways: [
          "ההבדל הקריטי בין ChatGPT (ידע כללי) ל-NotebookLM (ידע סגור ומאומת)",
          "כיצד מנגנון ה-Source Citations מגן עליכם בפני טעויות בדיווח",
          "העלאת דוחות שנתיים (10-K / דוח כספי מבוקר) ופילוח לפי פרקים",
        ],
        prompts: [
          {
            title: "פרומפט הצלבת נתונים מרובי מסמכים ב-NotebookLM",
            description: "הצלבת מספרי תקציב וביצוע מתוך 5 קבצי PDF נפרדים.",
            promptText: `בהתבסס אך ורק על המקורות שהועלו במחברת זו:
הצלב בין דוח ביצוע הרבעון השלישי (מקור 1) לבין תקציב היעד השנתי המקורי (מקור 3).
הצג בטבלה השוואתית:
1. סעיף תקציבי
2. יעד מקורי
3. ביצוע בפועל
4. מראה מקום מדויק (ציטוט ומספר עמוד בכל מסמך)`,
          },
        ],
        downloads: [
          {
            title: "מדריך יישומי: פיצוח דוחות כספיים ב-AI (Google Doc)",
            type: "doc",
            url: "https://docs.google.com/document/d/1fEK_8v-iIWtIZmSRqa7cCJe-7JHrkkmcsBKsn_6B4gA/edit?usp=sharing",
          },
          {
            title: "מצגת שיעור 1 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1EOR8nw1H6TywvSs_KT7yHvW7cdqaNu6V/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 1 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/19_ywJw0ItlXQR4NkoU_pYylPlYlQ7r5N/view?usp=sharing",
          },
        ],
      },
      {
        id: 2,
        slug: "lesson-2-fact-checking",
        title: "שיעור 2: אימות עובדות ובדיקות מהימנות פיננסית (Fact-Checking)",
        subtitle: "סריקת נתונים, איתור סתירות וביקורת עקיבה בין תקופות",
        description: "טכניקות מעשיות לבדיקת נאותות של מספרים וטענות הנהלה, הצלבת מידע מול דוחות קודמים וזיהוי אוטומטי של אי-התאמות או שינויים חשבונאיים.",
        duration: "20 דק'",
        embedUrl: "https://drive.google.com/file/d/185rEtCYX0gjXws5uQLxxdwkGI7f_AnXx/preview",
        fallbackUrl: "https://drive.google.com/file/d/185rEtCYX0gjXws5uQLxxdwkGI7f_AnXx/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1C7Dp7XBMRO9Z60eantLpNkKNc53-gHe6/preview",
        presentationUrl: "https://drive.google.com/file/d/185rEtCYX0gjXws5uQLxxdwkGI7f_AnXx/view?usp=sharing",
        keyTakeaways: [
          "בדיקת מהימנות ו-Fact Checking מתקדם ללא חשש להזיות",
          "זיהוי סתירות בין ביאורי הדוח לטבלאות המספריות",
          "שאלות אימות ביקורתיות להנהלה",
        ],
        downloads: [
          {
            title: "שאלות ותשובות לקורס NotebookLM (DOCX)",
            type: "doc",
            url: "https://drive.google.com/file/d/1BY9whBjNhyjxXyOYN_4rtlSEZJRDg9dW/view?usp=sharing",
          },
          {
            title: "מצגת שיעור 2 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/185rEtCYX0gjXws5uQLxxdwkGI7f_AnXx/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 2 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1C7Dp7XBMRO9Z60eantLpNkKNc53-gHe6/view?usp=sharing",
          },
        ],
      },
      {
        id: 3,
        slug: "lesson-3-audio-briefing-flashcards",
        title: "שיעור 3: תדרוך סמנכ\"ל כספים באודיו ובניית Flashcards ו‑Quiz",
        subtitle: "האזנה לפודקאסט AI מותאם אישית ויצירת כרטיסיות לימוד לבקרות",
        description: "שימוש בפיצ'ר ה-Audio Overview החדשני של NotebookLM: יצירת שיחת פודקאסט מעמיקה בין שני מגישי AI שמנתחים את הדוח הכספי שלכם, יחד עם הפקת Flashcards ו-Quiz אוטומטיים להדרכת הצוות.",
        duration: "22 דק'",
        embedUrl: "https://drive.google.com/file/d/1So8VY9205OdeKuQAKVFFWSO4VYKvatnu/preview",
        fallbackUrl: "https://drive.google.com/file/d/1So8VY9205OdeKuQAKVFFWSO4VYKvatnu/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1URMgAp1HhtzyCOshV9xaqVl3XEL6LpG4/preview",
        presentationUrl: "https://drive.google.com/file/d/1So8VY9205OdeKuQAKVFFWSO4VYKvatnu/view?usp=sharing",
        keyTakeaways: [
          "הגדרת פוקוס והנחיות מותאמות אישית ל-Audio Overview",
          "בניית Flashcards ו-Quiz לבדיקת הבנה בבקרות פנימיות",
          "שיתוף תובנות קוליות עם הנהלה בכירה",
        ],
        downloads: [
          {
            title: "מדריך פרויקט: הטמעת Audio Overview ותדרוך מנהלים (Google Doc)",
            type: "doc",
            url: "https://docs.google.com/document/d/1MJIdbZMNSZjMhjq5YUyamSvp6Z49A5KonmRIvh9hfno/edit?usp=sharing",
          },
          {
            title: "מדריך פרויקט: בנייה אוטומטית של Flashcards ו‑Quiz (Google Doc)",
            type: "doc",
            url: "https://docs.google.com/document/d/1rRrUKROuXrVbRGw4lXygiky4RuzKqK3bIG67poYQYGE/edit?usp=sharing",
          },
          {
            title: "מצגת שיעור 3 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1So8VY9205OdeKuQAKVFFWSO4VYKvatnu/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 3 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1URMgAp1HhtzyCOshV9xaqVl3XEL6LpG4/view?usp=sharing",
          },
        ],
      },
      {
        id: 4,
        slug: "lesson-4-board-meeting-prep",
        title: "שיעור 4: הכנה לישיבת דירקטוריון וסימולציות שאלות ותשובות",
        subtitle: "הפקת מצגות, סיכומי החלטות וניירות עמדה ממוקדים",
        description: "כיצד להפוך ערימה של דוחות כספיים של 100+ עמודים לסיכום מנהלים בן עמוד אחד, הכנת שאלות ותשובות לקראת ישיבת דירקטוריון וזיהוי נקודות תורפה מראש.",
        duration: "25 דק'",
        embedUrl: "https://drive.google.com/file/d/13_YJ_-QcyAqaKG0VLPeYfYoTC-4WR2F6/preview",
        fallbackUrl: "https://drive.google.com/file/d/13_YJ_-QcyAqaKG0VLPeYfYoTC-4WR2F6/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1evrL3AB7HnuDFDQqe2HJ8es1VBrl284e/preview",
        presentationUrl: "https://drive.google.com/file/d/13_YJ_-QcyAqaKG0VLPeYfYoTC-4WR2F6/view?usp=sharing",
        keyTakeaways: [
          "יצירת Briefing Doc אוטומטי לישיבת הנהלה ודירקטוריון",
          "סימולציית שאלות מאתגרות מחברי ועדת ביקורת",
          "בניית FAQ פיננסי מקיף למשקיעים",
        ],
        downloads: [
          {
            title: "מצגת שיעור 4 להורדה (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/13_YJ_-QcyAqaKG0VLPeYfYoTC-4WR2F6/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 4 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1evrL3AB7HnuDFDQqe2HJ8es1VBrl284e/view?usp=sharing",
          },
          {
            title: "מדריך דירקטוריון ודוחות כספיים (באתר)",
            type: "link",
            url: "/guides/board-meeting-prep",
          },
        ],
      },
      {
        id: 5,
        slug: "lesson-5-due-diligence",
        title: "שיעור 5: בדיקת נאותות (Due Diligence) ומחקר עומק",
        subtitle: "הצלבת הסכמים מסחריים, חוות דעת מקצועיות ודוחות שוק",
        description: "תהליך עבודה מובנה (Workflow) לביצוע בדיקות נאותות מהירות ברכישות, מיזוגים או בחינת ספקים ולקוחות אסטרטגיים באמצעות חיבור עשרות מסמכים למחברת אחת.",
        duration: "24 דק'",
        embedUrl: "https://drive.google.com/file/d/13n4UYyEOiOWcdPAdIItM1x0egj7UKjLK/preview",
        fallbackUrl: "https://drive.google.com/file/d/13n4UYyEOiOWcdPAdIItM1x0egj7UKjLK/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1DptPiLMIkuGAKPv2cn5ey0RyvaBevPXJ/preview",
        presentationUrl: "https://drive.google.com/file/d/13n4UYyEOiOWcdPAdIItM1x0egj7UKjLK/view?usp=sharing",
        keyTakeaways: [
          "בניית מחברת ייעודית לתהליך Due Diligence",
          "חילוץ התחייבויות תלויות, שיעבודים וקובננטים",
          "בניית מטריצת סיכונים פיננסיים ומשפטיים",
        ],
        downloads: [
          {
            title: "AI Due Diligence Workflow Guide (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/13n4UYyEOiOWcdPAdIItM1x0egj7UKjLK/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 5 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1DptPiLMIkuGAKPv2cn5ey0RyvaBevPXJ/view?usp=sharing",
          },
        ],
      },
      {
        id: 6,
        slug: "lesson-6-investment-package-studio",
        title: "שיעור 6: בניית חבילות השקעה ומצגות עם Studio",
        subtitle: "מנתונים גולמיים לחבילת משקיעים (Pitch Deck & Data Room)",
        description: "כיצד לרתום את יכולות ה-Studio והניתוח של כלי AI ליצירת חבילות השקעה, תקצירי מנהלים למשקיעים וניירות עמדה כלכליים ברמה בינלאומית.",
        duration: "22 דק'",
        embedUrl: "https://drive.google.com/file/d/1E1bp30zDLgmR71CpPaIqHgOVrwh8BMHC/preview",
        fallbackUrl: "https://drive.google.com/file/d/1E1bp30zDLgmR71CpPaIqHgOVrwh8BMHC/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1pta5tG6KX-CIc3qrYYWWA1Xd-gew_A5d/preview",
        presentationUrl: "https://drive.google.com/file/d/1E1bp30zDLgmR71CpPaIqHgOVrwh8BMHC/view?usp=sharing",
        keyTakeaways: [
          "הפקת Investment Package מובנה ומקצועי",
          "תרגום יתרונות עסקיים למספרים ומודלים ברורים",
          "שימוש ב-Studio ליצירת תוצרים ויזואליים",
        ],
        downloads: [
          {
            title: "AI Investment Package Creation Guide (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1E1bp30zDLgmR71CpPaIqHgOVrwh8BMHC/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 6 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1pta5tG6KX-CIc3qrYYWWA1Xd-gew_A5d/view?usp=sharing",
          },
        ],
      },
      {
        id: 7,
        slug: "lesson-7-regulatory-knowledge-automation",
        title: "שיעור 7: אוטומציה רגולטורית וציות (Regulatory Knowledge Automation)",
        subtitle: "סריקת תקנות מס, חוקי עבודה, תקני IFRS ונהלי חברה",
        description: "העלאת חוזרים מקצועיים, פסיקות מס ותקני דיווח למחברת אחת לקבלת מענה מיידי לכל סוגיית ציות, מניעת קנסות וסיווג מדויק של עסקאות.",
        duration: "20 דק'",
        embedUrl: "https://drive.google.com/file/d/14WrVckFvjG7iFa9lFF8yQ6bS5KcJ1y4e/preview",
        fallbackUrl: "https://drive.google.com/file/d/14WrVckFvjG7iFa9lFF8yQ6bS5KcJ1y4e/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1hzaTZBK_QrD4t3a9FG9h2x7I4TmsHbJ7/preview",
        presentationUrl: "https://drive.google.com/file/d/14WrVckFvjG7iFa9lFF8yQ6bS5KcJ1y4e/view?usp=sharing",
        keyTakeaways: [
          "יצירת מאגר רגולטורי מתעדכן למחלקת הכספים",
          "שאילתות על תקני מס והוראות ביצוע של רשות המסים",
          "בקרת ציות אוטומטית בהסכמים מול ספקים ועובדים",
        ],
        downloads: [
          {
            title: "Regulatory Knowledge Automation Guide (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/14WrVckFvjG7iFa9lFF8yQ6bS5KcJ1y4e/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 7 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1hzaTZBK_QrD4t3a9FG9h2x7I4TmsHbJ7/view?usp=sharing",
          },
        ],
      },
      {
        id: 8,
        slug: "lesson-8-enterprise-knowledge-base",
        title: "שיעור 8: המוח הארגוני – ממבוך נתונים לזיכרון דיגיטלי",
        subtitle: "בניית מאגר ידע ארגוני חכם, מרכזי ומאובטח לכל צוות הכספים",
        description: "איך להפוך את הידע המבוזר במחלקת הכספים (מיילים, נהלים, חוזים היסטוריים וחוות דעת) למרכז ידע ארגוני נגיש המאפשר Onboarding מהיר ומניעת אובדן ידע קריטי.",
        duration: "21 דק'",
        embedUrl: "https://drive.google.com/file/d/1dkFgoDXZYPZKQ9V5AMqb7Py5Ciwg6Jx4/preview",
        fallbackUrl: "https://drive.google.com/file/d/1dkFgoDXZYPZKQ9V5AMqb7Py5Ciwg6Jx4/view?usp=sharing",
        videoUrl: "https://drive.google.com/file/d/1Carccsc0bAlTBhwBmYHpUT5ZtMlDLlC0/preview",
        presentationUrl: "https://drive.google.com/file/d/1dkFgoDXZYPZKQ9V5AMqb7Py5Ciwg6Jx4/view?usp=sharing",
        keyTakeaways: [
          "ארכיטקטורת תיקיות ומחברות לפי תחומי אחריות",
          "שמירה על סודיות, הרשאות ואבטחת נתונים",
          "סיכום הקורס ותוכנית הטמעה מומלצת בארגון",
        ],
        downloads: [
          {
            title: "המוח הארגוני: מדריך פרויקט (PDF)",
            type: "pdf",
            url: "https://drive.google.com/file/d/1dkFgoDXZYPZKQ9V5AMqb7Py5Ciwg6Jx4/view?usp=sharing",
          },
          {
            title: "צפייה בשיעור 8 המלא בוידאו (MP4)",
            type: "link",
            url: "https://drive.google.com/file/d/1Carccsc0bAlTBhwBmYHpUT5ZtMlDLlC0/view?usp=sharing",
          },
          {
            title: "ספריית המדריכים המלאה באתר",
            type: "link",
            url: "/guides",
          },
        ],
      },
    ],
  },
};

export function getPlayerCourse(slug: string): PlayerCourse | undefined {
  return PLAYER_COURSES[slug];
}

export function getAllPlayerCourses(): PlayerCourse[] {
  return Object.values(PLAYER_COURSES);
}
