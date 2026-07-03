export interface Testimonial {
  name: string;
  title: string;
  company: string;
  text: string;
  placeholder?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    name: "Keren Shoresh",
    title: "CEO",
    company: "Shoresh Finance",
    text: "ההדרכה של רונן שינתה לחלוטין את הדרך שבה אנחנו ניגשים לניתוח נתונים וסגירת חודש, הכלים שקיבלנו חסכו לנו עשרות שעות עבודה",
  },
  {
    name: "Waiting for your recommendations",
    title: "",
    company: "",
    text: "שתף את ההשפעה של ההדרכה על הארגון שלך",
    placeholder: true,
  },
  {
    name: "Waiting for your recommendations",
    title: "",
    company: "",
    text: "ספר לנו איך רונן עזר לצוות הכספים שלך להיות יותר יעיל",
    placeholder: true,
  },
];
