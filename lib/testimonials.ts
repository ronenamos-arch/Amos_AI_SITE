export interface Testimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  /** Headshot in /public/Testimonials. Omit to fall back to an initials avatar. */
  image?: string;
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Keren Shoresh",
    title: "CEO",
    company: "Shoresh Finance",
    text: "ההדרכה של רונן שינתה לחלוטין את הדרך שבה אנחנו ניגשים לניתוח נתונים וסגירת חודש, הכלים שקיבלנו חסכו לנו עשרות שעות עבודה",
    image: "/Testimonials/recommendation - KS.png",
  },
  {
    name: "שלומי ביז",
    title: "מנהל כספים",
    company: "",
    text: "הטכניקות שלמדתי בקורס שיפרו משמעותית את היעילות שלי בהכנת דוחות וניתוחים. ההשקעה החזירה את עצמה תוך שבועיים.",
    image: "/Testimonials/recommendation - SB.png",
  },
  {
    name: "Rachel Klein",
    title: "רו״ח עצמאית",
    company: "",
    text: "כרו״ח עצמאית, הקורס פתח לי עולם חדש. עכשיו אני יכולה לספק ללקוחות שלי תובנות מתקדמות ולחסוך זמן רב בעבודות שגרתיות.",
    image: "/Testimonials/recommendation - RK.png",
  },
];
